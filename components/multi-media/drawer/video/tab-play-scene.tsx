import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import 'video-react/dist/video-react.css'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { apiGetVideoAnalysesStreamUrl } from '@interfaces/apis/videos'
import { openSnackbarError } from '@store/reducers/snackbar/reducers'
import LoadingIcons from 'react-loading-icons'
import { AzurePlayer } from '@components/azure-player/azure-player'
import { TResVideo } from '@interfaces/apis/api.types'


const timeToSeconds = (time:string) => {
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


  const [beginTime, setBeginTime] = useState<number>(0)
  const [playerUrl, setPlayerUrl] = useState<string>('')
  const [token, setToken] = useState<string>('')


  /* eslint-disable */
  useEffect(() => {
    (async () => {
      try {
        const resStreamUrl = await apiGetVideoAnalysesStreamUrl(data[rowIndex].Id)
        setToken(resStreamUrl.data.jwt)
        const videoRow = data[rowIndex] as TResVideo.TVideoContent
        let startTime = videoRow.VideoSummary.SceneSummaries[subRowIndex]?.SceneStart
        if (startTime != undefined || startTime != '') {
          let seconds = timeToSeconds(startTime)
          setBeginTime(seconds)
        }
        setPlayerUrl(`${resStreamUrl.data.url}?token=Bearer ${token}`)
      } catch (e) {
        dispatch(openSnackbarError('Get error,while get streaming url'))
      }
    })()
  }, [dispatch])
  /* eslint-enable */

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#3d3d3d',
        p: 2,
        margin: '0rem 2rem',
        borderRadius: '.5rem',
        '& >div': {
          position: 'relative',
          borderRadius: '.3rem',
          paddingBottom: '56.25%',
          '& >button': {
            top: '40% !important',
            left: '45% !important'
          },
          '& #vid-1': {
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
        '& .vjs-loading-spinner': {
          background: 'url(/assets/images/buffering-rainbow-bg.png) !important'
        },
        '& .vjs-loading-spinner::before': {
          content: 'url(/assets/images/buffering-rainbow.gif) !important'
        }
      }}
    >
      {
        playerUrl != '' ?
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
                    if (elemLoading) {
                      elemLoading.style.visibility = 'hidden'
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
              position: 'absolute',
              top: '40%'
            }}>
              <LoadingIcons.Puff height={80} width={80} strokeWidth={3} />
            </Box>
          </Box>
      }
    </Box>
  )
}
