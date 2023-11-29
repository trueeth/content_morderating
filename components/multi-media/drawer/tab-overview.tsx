import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'

import overview1 from '/public/assets/images/overview/overview-01.png'
import overview2 from '/public/assets/images/overview/overview-02.png'
import overview3 from '/public/assets/images/overview/overview-03.png'
import overview4 from '/public/assets/images/overview/overview-04.png'
import overview5 from '/public/assets/images/overview/overview-05.png'
import overview6 from '/public/assets/images/overview/overview-06.png'
import overview7 from '/public/assets/images/overview/overview-07.png'
import overview8 from '/public/assets/images/overview/overview-08.png'
import overview9 from '/public/assets/images/overview/overview-09.png'
import overview10 from '/public/assets/images/overview/overview-10.png'

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
      {appState.drawer.type === 'video' ? (
        <>
          <Typography>Most Interest Frames</Typography>
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
          </Box>
          <Typography>AI Description</Typography>

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
            The period begins with Abdul Aziz bin Muhammad coming to power in
            1203 AH / 1789 AD, leaving him a strong and cohesive state. Then
            Imam Saud bin Abdul Aziz takes power and continues to unify the
            country and expand the state's influence. After him, Imam Abdullah
            bin Saud assumes power, but he faces difficulties and loses to
            Muhammad Ali Pasha’s campaign to eliminate the state. Events then
            unfold with King Abdul Aziz regaining Riyadh and the continued
            expansion of the second Saudi state. Later, Muhammad bin Abdulaziz
            is appointed Crown Prince and assumes many tasks and
            responsibilities in the government. Mohammed bin Nayef is then
            appointed Crown Prince and Deputy Prime Minister, but he is
            dismissed in 2017 and Mohammed bin Salman is appointed Crown Prince
            and continues to hold multiple positions in the government.
          </Typography>
        </>
      ) : (
        <>
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
            The period begins with Abdul Aziz bin Muhammad coming to power in
            1203 AH / 1789 AD, leaving him a strong and cohesive state. Then
            Imam Saud bin Abdul Aziz takes power and continues to unify the
            country and expand the state's influence. After him, Imam Abdullah
            bin Saud assumes power, but he faces difficulties and loses to
            Muhammad Ali Pasha’s campaign to eliminate the state. Events then
            unfold with King Abdul Aziz regaining Riyadh and the continued
            expansion of the second Saudi state. Later, Muhammad bin Abdulaziz
            is appointed Crown Prince and assumes many tasks and
            responsibilities in the government. Mohammed bin Nayef is then
            appointed Crown Prince and Deputy Prime Minister, but he is
            dismissed in 2017 and Mohammed bin Salman is appointed Crown Prince
            and continues to hold multiple positions in the government.
          </Typography>
        </>
      )}
    </Box>
  )
}
