import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import 'video-react/dist/video-react.css'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { apiGetVideoAnalysesStreamUrl } from '@interfaces/apis/videos'
import { openSnackbarError } from '@store/reducers/snackbar/reducers'
import LoadingIcons from 'react-loading-icons'
import { AzurePlayer } from '@components/azure-player/azure-player'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
}

const maxWidth = 800

type PDFFile = string | File | null

const timeToSeconds = (time) => {
  const parts = time.split(':')
  const hours = parseInt(parts[0], 10) || 0
  const minutes = parseInt(parts[1], 10) || 0
  const seconds = parseFloat(parts[2]) || 0

  return hours * 3600 + minutes * 60 + seconds
}

export default function DrawerTabPlayScene() {



  const dispatch = useDispatch()

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  const rowIndex = appState.drawer.rowIndex
  const subRowIndex = appState.drawer.subRowIndex
  const data = appState.api.data


  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [beginTime, setBeginTime] = useState<number>(0)
  const [playerUrl, setPlayerUrl] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [file, setFile] = useState<PDFFile>('./test.pdf')
  // const [containerWidth, setContainerWidth] = useState<number>()


  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const pageElement = container.querySelector(
        `[data-page-number="${pageNumber}"]`
      )
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [pageNumber])

  function onDocumentLoadSuccess({ numPages: nextNumPages }): void {
    setNumPages(nextNumPages)
  }

  setTimeout(() => {
    // setPageNumber(appState.drawer.pageIndex + 1)
  }, 1000)

  useEffect(() => {
    (async () => {
      try {
        const resStreamUrl = await apiGetVideoAnalysesStreamUrl(data[rowIndex].Id)
        setToken(resStreamUrl.data.jwt)
        let startTime = data[rowIndex].VideoSummary?.SceneSummaries[subRowIndex]?.SceneStart
        if (startTime!=undefined||startTime!=''){
          let seconds=timeToSeconds(startTime)
          setBeginTime(seconds)
        }
        setPlayerUrl(`${resStreamUrl.data.url}?token=Bearer ${token}`)
      } catch (e) {
        dispatch(openSnackbarError('Get error,while get streaming url'))
      }
    })()
  }, [dispatch])


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#3d3d3d',
        p: 2,
        '& >div': {
          position: 'relative',
          borderRadius: '.3rem',
          paddingBottom: '56.25%',
          '& >button': {
            top: '40% !important',
            left: '45% !important'
          },
          '& #vid-1': {
            // position:'relative',
            marginTop: '0',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            '& >div': {
              width: '100%',
              height: '100%'
            }
          }
        },
        "& .vjs-loading-spinner":{
          background: 'url(/assets/images/buffering-rainbow-bg.png) !important'
        },
        "& .vjs-loading-spinner::before":{
          content: 'url(/assets/images/buffering-rainbow.gif) !important'
        }
      }}
    >
      {appState.drawer.type === 'video' ? (
        playerUrl!='' ?
          <AzurePlayer
            compId='vid-1'
            events={[
              {
                domEvent: 'play',
                listeners: [
                  () => {
                    let elem = document.getElementById('text-1')
                    let elemLoading = document.getElementById('loading-1')
                    if (elem) {
                      elem.style.visibility = 'hidden'
                    }
                    if (elemLoading){
                      elemLoading.style.visibility='hidden'
                    }
                    return beginTime
                  }
                ]
              },
              {
                domEvent: 'ended',
                listeners: [
                  () => {
                    let elem = document.getElementById('text-2')
                    if (elem) {
                      elem.style.visibility = ''
                    }
                  }
                ]
              }
            ]}
            visibility=''
            source={{
              src: playerUrl,
              type: 'application/dash+xml',
              protectionInfo: [{
                type: 'AES',
                authenticationToken: `Bearer ${token}`
              }],
              fullscreen: true,
              volumeControl: true
            }}
            position={{
              top: 200,
              left: 200,
              width: 500,
              height: 400
            }}
            control={{
              autoPlay: false,
              controlBar: true,
              hidePlayButton: false
            }}
            ampLoadTimeout={0}
          />
          : <Box sx={{
            '& g': {
              stroke: 'var(--Primary1)'
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--Primary1)',
            flexDirection: 'column',
            paddingBottom: '56.25%',
            backgroundColor: 'black'
          }}>
            <Box sx={{
              position: 'fixed',
              top: '47%'
            }}>
              <LoadingIcons.Puff height={80} width={80} strokeWidth={3} />
            </Box>
          </Box>
      ) : (
        <>
          <div
            ref={containerRef}
            style={{ overflowY: 'auto', height: '600px' }}
          >
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={maxWidth}
                />
              ))}
            </Document>
          </div>
          <Typography>
            Page {pageNumber} of {numPages}
          </Typography>
        </>
      )}
    </Box>
  )
}
