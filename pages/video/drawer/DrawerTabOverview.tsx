import { Box } from '@mui/material'
import { styled } from '@mui/styles'
import Image from 'next/image'

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
import overview11 from '/assets/images/overview/overview-11.png'
import overview12 from '/assets/images/overview/overview-12.png'



const itemData = [
  {
    img: overview1,
    title: 'overview',
  },
  {
    img: overview2,
    title: 'overview',
  },
  {
    img: overview3,
    title: 'overview',
  },
  {
    img: overview4,
    title: 'overview',
  },
  {
    img: overview5,
    title: 'overview',
  },
  {
    img: overview6,
    title: 'overview',
  },
  {
    img: overview7,
    title: 'overview',
  },
  {
    img: overview8,
    title: 'overview',
  },
  {
    img: overview9,
    title: 'overview',
  },
  {
    img: overview10,
    title: 'overview',
  },
  {
    img: overview11,
    title: 'overview',
  },
  {
    img: overview12,
    title: 'overview',
  },
];


const ImageItemStyle={
  margin:'.3rem',
  borderRadius:'.3rem',
  width:'10rem',
  height:'7.5rem',
}

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
          {itemData.map((item,index)=>{
            return(
              <Image
                key={index}
                src={item.img}
                alt={item.title}
                style={ImageItemStyle}
                width={80}
                height={50}
              />
            )
          })}
        </div>
      <div>AI Description</div>

      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  Ipsum is simply dummy text of the best ipsum has been the top offer industry's standard printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  Ipsum is simply dummy text of the best ipsum has been the top industry's standard printing and type setting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  Ipsum is simply dummy text of the best ipsum has been the top offer industry's standard printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>
    </Box>
  )

}