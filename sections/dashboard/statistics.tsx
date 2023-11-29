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
import { Box, Grid, Typography } from '@mui/material'

type TStatisticsItem = {
  children: any
  downloads: number
  title: string
}

const StatisticsItem = (props: TStatisticsItem) => {
  const ItemIcon = props.children
  return (
    <Box className="flex">
      <IconButton>{ItemIcon}</IconButton>

      <Box className="flex flex-col ml-3">
        <Typography className="text-bold">{props.downloads}</Typography>
        <Typography className="text-8" color="grey">
          {props.title}
        </Typography>
      </Box>
    </Box>
  )
}
export default function SideStatistics() {
  return (
    <Box className="bg-white border-radius-5 h-full p-15 text-black">
      <Typography>Statistics</Typography>
      <Grid container sx={{ mt: 3 }} spacing={2}>
        <Grid item xs={6}>
          <StatisticsItem downloads={856} title={'Submited Videos'}>
            <Slideshow sx={{ color: 'var(--Primary1)' }}></Slideshow>
          </StatisticsItem>
        </Grid>
        <Grid item xs={6}>
          <StatisticsItem downloads={428} title={'Submited Documents'}>
            <InsertDriveFileOutlined
              sx={{ color: 'var(--Primary2)' }}
            ></InsertDriveFileOutlined>
          </StatisticsItem>
        </Grid>
        <Grid item xs={6}>
          <StatisticsItem downloads={85} title={'In Review'}>
            <StarBorder sx={{ color: '#FF9E45' }}></StarBorder>
          </StatisticsItem>
        </Grid>
        <Grid item xs={6}>
          <StatisticsItem downloads={265} title={'Approved'}>
            <Check sx={{ color: 'var(--Primary1)' }}></Check>
          </StatisticsItem>
        </Grid>
        <Grid item xs={6}>
          <StatisticsItem downloads={23} title={'Rejected'}>
            <Block sx={{ color: '#FF1313' }}></Block>
          </StatisticsItem>
        </Grid>
        <Grid item xs={6}>
          <StatisticsItem downloads={136} title={'Pending'}>
            <HourglassEmptyOutlined
              sx={{ color: 'var(--Primary2)' }}
            ></HourglassEmptyOutlined>
          </StatisticsItem>
        </Grid>
      </Grid>
    </Box>
  )
}
