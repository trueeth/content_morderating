import { Grid } from '@mui/material'
import AnalyticsYear from '@sections/dashboard/AnalyticsYear'
import AnalyticsAverage from '@sections/dashboard/AnalyticsAverage'
import AnalyticsStatistics from '@sections/dashboard/AnalyticsStatistics'
import AnalyticsVideos from '@sections/dashboard/AnalyticsVideos'

export default function DashboardSection() {
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
