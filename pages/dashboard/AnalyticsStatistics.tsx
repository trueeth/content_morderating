import IconButton from '@mui/material/IconButton'
import React from 'react'
import {
  Block,
  Check,
  HourglassEmptyOutlined,
  InsertDriveFileOutlined,
  Slideshow,
  StarBorder
} from '@mui/icons-material'

type TStatisticsItem = {
  children: React.ReactElement
  downloads: number
  title: string
}

const StatisticsItem = (props: TStatisticsItem) => {
  const ItemIcon = props.children
  return (
    <div>
      <IconButton>{ItemIcon}</IconButton>

      <div>
        <div>{props.downloads}</div>
        <div>{props.title}</div>
      </div>
    </div>
  )
}
export default function () {
  return (
    <div className="bg-white border-radius-5 h-full p-15 text-black">
      <StatisticsItem downloads={856} title={'Submited Videos'}>
        <Slideshow></Slideshow>
      </StatisticsItem>
      <StatisticsItem downloads={428} title={'Submited Documents'}>
        <InsertDriveFileOutlined></InsertDriveFileOutlined>
      </StatisticsItem>
      <StatisticsItem downloads={85} title={'In Review'}>
        <StarBorder></StarBorder>
      </StatisticsItem>
      <StatisticsItem downloads={265} title={'Approved'}>
        <Check></Check>
      </StatisticsItem>
      <StatisticsItem downloads={23} title={'Rejected'}>
        <Block></Block>
      </StatisticsItem>
      <StatisticsItem downloads={136} title={'Pending'}>
        <HourglassEmptyOutlined></HourglassEmptyOutlined>
      </StatisticsItem>
    </div>
  )
}
