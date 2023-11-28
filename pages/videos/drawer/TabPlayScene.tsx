import { Box } from '@mui/material'
// import VideoPlayer from 'react-video-js-player';
import { useState } from 'react'
import 'video-react/dist/video-react.css'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react'

export default function DrawerTabPlayScene() {
  const [vState, setState] = useState({
    video: {
      poster: "https://media.w3.org/2010/05/sintel/poster.png"
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--Secondary)',
        p: 2,
        '& >div': {
          position: 'relative',
          '& >button': {
            top: '40% !important',
            left: '45% !important'
          }
        }
      }}
    >
      <Player poster={vState.video.poster}>
        <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        <ControlBar>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton disabled />
        </ControlBar>
      </Player>
    </Box>
  )
}
