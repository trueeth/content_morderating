import { Box, Typography } from '@mui/material'
import React, { useRef} from 'react'
import 'video-react/dist/video-react.css'
import {  useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { TResDocument } from '@interfaces/apis/api.types'

interface IProps {
  pageNum?: number
  questionIndex?: number
}

export default function DrawerTabPreviewPage(props: IProps) {


  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)


  const containerRef = useRef<HTMLDivElement>(null)

  let pageInfo: TResDocument.TGptAnswerPageNumber = {}
  if (props.pageNum > 0)
    pageInfo = appState.drawer.drawerData?.GptResponse[appState.drawer.subRowIndex].answers[props.questionIndex].pageNumbers.filter(val => val.pageNumber == props.pageNum)

  return (
    <>
      {props.pageNum !== 0 ?
        <Box sx={{
          padding: '1rem 3rem'
        }}>
          <Box>
            <Typography>
              Ai Opinion&nbsp;:
            </Typography>
            <Typography sx={{ paddingLeft: '2rem' }}>
              {pageInfo[0].opinion}
            </Typography>
          </Box>
          <Box>
            <Typography>
              Snippet&nbsp;:
            </Typography>
            <Typography sx={{ paddingLeft: '2rem' }}>
              {pageInfo[0].snippet}
            </Typography>
          </Box>
        </Box> :
        null
      }
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
        <div
          ref={containerRef}
          style={{
            height: '600px'
          }}
        >
          <iframe id='pdfid' width='100%' style={{ height: 'inherit' }}
                  src={`${appState.drawer.drawerData?.PdfUrl}#page=${props.pageNum}`}
                  scrolling='no'></iframe>
        </div>
      </Box>
    </>
  )
}
