import { Grid } from '@mui/material'
import SideYear from '@sections/dashboard/year'
import SideAverage from '@sections/dashboard/average'
import SideStatistics from '@sections/dashboard/statistics'
import AnalyticsVideos from '@sections/dashboard/videos'

export default function DashboardSection() {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item md={8} xs={12} alignItems="stretch">
        <SideYear></SideYear>
      </Grid>

      <Grid item md={4} xs={12} alignItems="stretch">
        <SideAverage></SideAverage>
      </Grid>

      <Grid item md={4} xs={12} alignItems="stretch">
        <SideStatistics></SideStatistics>
      </Grid>

      <Grid item md={8} xs={12} alignItems="stretch">
        <AnalyticsVideos></AnalyticsVideos>
      </Grid>
    </Grid>
  )
}
