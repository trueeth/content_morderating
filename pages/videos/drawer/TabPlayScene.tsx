import { Box } from '@mui/material'
// import VideoPlayer from 'react-video-js-player';
import { useState } from 'react'
import 'video-react/dist/video-react.css'
import { Player } from 'video-react'
function ReactAllPlayer(props: {
  components: { Controls: () => JSX.Element }
}) {
  return null
}

export default function DrawerTabPlayScene() {
  const [vState, setState] = useState({
    video: {
      poster: '/assets/video/poster.png'
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--Secondary)',
        p: 2
      }}
    >
      <Player>
        <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
      </Player>
    </Box>
  )
}
