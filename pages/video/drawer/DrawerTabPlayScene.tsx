import { Box } from '@mui/material'
import { TimeIndicator } from 'react-all-player'

function ReactAllPlayer(props: { components: { Controls: () => JSX.Element } }) {
  return null
}

export default function DrawerTabPlayScene(){

  return(
    <Box
      sx={{
        display:'flex',
        flexDirection:'column'
      }}
    >

      <div className='player-wrapper'>
        <ReactAllPlayer
          sources={[
            {
              file: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
              label: '1080p',
            },
            {
              file: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
              label: '720p',
            },
          ]}
          subtitles={[
            {
              lang: 'en',
              language: 'English',
              file: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
            },
            {
              lang: 'fr',
              language: 'French',
              file: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
            },
          ]}
        />
      </div>

    </Box>
  )

}
