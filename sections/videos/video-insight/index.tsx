import Box from '@mui/material/Box'
import { apiGetVideoAnalysesWidgetInsight, apiGetVideoAnalysesWidgetPlayer } from '@interfaces/apis/videos'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setApiLoading } from '@store/reducers/api/reducers'
import { openSnackbarError } from '@store/reducers/snackbar/reducers'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'

const VideoInsightSection = () => {

  const [vState, setState] = useState({ playerUrl: '', insightsUrl: '' })
  const dispatch = useDispatch()
  const router = useRouter()
  const videoId = router.query.id as string

  const fetchData = async () => {
    dispatch(setApiLoading(true))
    try {
      const [resDataPlayer, resDataInsights] = await Promise.all([
        apiGetVideoAnalysesWidgetPlayer(videoId),
        apiGetVideoAnalysesWidgetInsight(videoId)
      ])

      setState({
        playerUrl: resDataPlayer.data.Url,
        insightsUrl: resDataInsights.data.Url
      })
    } catch (e) {
      console.error(e)
      dispatch(openSnackbarError('Get WidgetPlayer Error'))
    } finally {
      dispatch(setApiLoading(false))
    }
  }

  useEffect(() => {
    if (!videoId) return
    fetchData()
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, dispatch])


  return videoId ? (
    <Grid container spacing={2} alignItems='stretch'>

      <Grid item md={6} xs={12}>
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 0px 25px 0px #F3F3F3;',
            borderRadius: '.4rem',
            border: '1px solid var(--Stroke, #E8E8E8)',
            padding: '2rem',
            '> div': {
              borderRadius: '.2rem'
            }
          }}
        >
          <iframe className='embed-responsive-item'
                  width='100%'
                  height='780'
                  src={vState.insightsUrl}
                  frameBorder='0' allowFullScreen></iframe>
        </Box>
      </Grid>

      <Grid item md={6} xs={12}>
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 0px 25px 0px #F3F3F3;',
            borderRadius: '.4rem',
            border: '1px solid var(--Stroke, #E8E8E8)',
            padding: '2rem',
            '> iframe': {
              borderRadius: '.2rem'
            }
          }}>
          <iframe
            width='100%'
            height='400'
            src={vState.playerUrl}
            frameBorder='0' allowFullScreen></iframe>
        </Box>
      </Grid>
    </Grid>
  ) : null
}

export default VideoInsightSection
