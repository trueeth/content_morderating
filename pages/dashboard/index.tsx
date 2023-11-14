
import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import AnalyticsYear from './AnalyticsYear'
import AnalyticsAverage from './AnalyticsAverage'
import AnalyticsStatistics from './AnalyticsStatistics'
import AnalyticsVideos from './AnalyticsVideos'

export default function Report() {
  const [vState, setState] = useState({ tabIndex: 0 })

  return (
    <Grid container spacing={2} alignItems="stretch" >

      <Grid item xs={8}>
        <AnalyticsYear></AnalyticsYear>
      </Grid>

      <Grid item xs={4} >
        <AnalyticsAverage></AnalyticsAverage>
      </Grid>

      <Grid item xs={4} >
        <AnalyticsStatistics></AnalyticsStatistics>
      </Grid>

      <Grid  item xs={8}>
        <AnalyticsVideos></AnalyticsVideos>
      </Grid>


    </Grid>
  )
}
