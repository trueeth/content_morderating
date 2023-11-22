import { Grid } from '@mui/material'
import AnalyticsYear from './AnalyticsYear'
import AnalyticsAverage from './AnalyticsAverage'
import AnalyticsStatistics from './AnalyticsStatistics'
import AnalyticsVideos from './AnalyticsVideos'

export default function Dashboard() {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item md={8} xs={12} alignItems="stretch">
        <AnalyticsYear></AnalyticsYear>
      </Grid>

      <Grid item md={4} xs={12} alignItems="stretch">
        <AnalyticsAverage></AnalyticsAverage>
      </Grid>

      <Grid item md={4} xs={12} alignItems="stretch">
        <AnalyticsStatistics></AnalyticsStatistics>
      </Grid>

      <Grid item md={8} xs={12} alignItems="stretch">
        <AnalyticsVideos></AnalyticsVideos>
      </Grid>
    </Grid>
  )
}
