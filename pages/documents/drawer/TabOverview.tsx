import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { IAppSlice } from '@/store/reducers'
import { IReduxState } from '@/store/index'

import overview1 from '/assets/images/overview/overview-01.png'
import overview2 from '/assets/images/overview/overview-02.png'
import overview3 from '/assets/images/overview/overview-03.png'
import overview4 from '/assets/images/overview/overview-04.png'
import overview5 from '/assets/images/overview/overview-05.png'
import overview6 from '/assets/images/overview/overview-06.png'
import overview7 from '/assets/images/overview/overview-07.png'
import overview8 from '/assets/images/overview/overview-08.png'
import overview9 from '/assets/images/overview/overview-09.png'
import overview10 from '/assets/images/overview/overview-10.png'
import { log } from 'console'
const itemData = [
  {
    img: overview1,
    title: 'overview'
  },
  {
    img: overview2,
    title: 'overview'
  },
  {
    img: overview3,
    title: 'overview'
  },
  {
    img: overview4,
    title: 'overview'
  },
  {
    img: overview5,
    title: 'overview'
  },
  {
    img: overview6,
    title: 'overview'
  },
  {
    img: overview7,
    title: 'overview'
  },
  {
    img: overview8,
    title: 'overview'
  },
  {
    img: overview9,
    title: 'overview'
  },
  {
    img: overview10,
    title: 'overview'
  }
]

const ImageItemStyle = {
  margin: '.3rem',
  borderRadius: '.3rem',
  width: '7rem',
  height: '5rem'
}

export default function DrawerTabOverview() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1.5
      }}
    >
      {/* <Typography>Most Interest Frames</Typography>
      <Box className="flex flex-wrap" mb={5}>
        {itemData.map((item, index) => {
          return (
            <Image
              key={index}
              src={item.img}
              alt={item.title}
              style={ImageItemStyle}
              width={40}
              height={30}
            />
          )
        })}
      </Box> */}
      <Typography>AI Finding</Typography>

      <Typography
        sx={{
          my: 1,
          p: 2,
          border: '1px solid #ccc',
          borderRadius: '10px',
          fontSize: '0.8rem',
          color: '#808080'
        }}
      >
        handles are introduced in the next section and
        Figure 1. These prototypes were selected as they
        contribute to various areas of functional ability
        and present several technological possibilities. By
        testing different prototypes, the aim was to find
        similarities that positively affect user experience.
        Commercially available products were not used
        in the study as the feedback from the study would
        possess limited ability to improve the devices fur-
        ther. Instead, this study shall contribute towards
        the user-centered development/refinement of the
        prototypes, as part of the Interreg BaltSe@nioR
        2.0 project (Priedulena, Fabisiak & Hogeforster,
        2019). The designs are publicly available and ac-
        tively presented to enable commercializa
      </Typography>
    </Box>
  )
}
