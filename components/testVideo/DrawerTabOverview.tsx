import { Box } from '@mui/material'
import { styled } from '@mui/styles'


const itemData = [
  {
    img: 'images/overview/overview-01.png',
    title: 'overview',
  },
  {
    img: 'images/overview/overview-02.png',
    title: 'overview',
  },
  {
    img: 'images/overview/overview-03.png',
    title: 'overview',
  },
  {
    img: 'images/overview/overview-04.png',
    title: 'overview',
  },
  {
    img: 'images/overview/overview-05.png',
    title: 'overview',
  },
  {
    img: 'images/overview/overview-06.png',
    title: 'overview',
  },
  {
    img: 'images/overview/overview-07.png',
    title: 'overview',
  },
];


const ImageItem=styled('img')({
  padding:'2rem',
  borderRadius:'1rem'
})

export default function DrawerTabOverview(){

  return(
    <Box
      sx={{
        display:'flex',
        flexDirection:'column'
      }}
    >
        <div>
          Most Interest Frames
        </div>
        <div className='flex flex-wrap'>

        </div>
    </Box>
  )

}