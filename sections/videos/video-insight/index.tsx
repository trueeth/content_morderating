import Box from '@mui/material/Box';
import { apiGetVideoAnalysesWidgetInsight, apiGetVideoAnalysesWidgetPlayer } from '@interfaces/apis/videos';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setApiLoading } from '@store/reducers/api/reducers';
import { openSnackbarError } from '@store/reducers/snackbar/reducers';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

// Component to display video insights and player based on the video ID from the URL
const VideoInsightSection = () => {

  const [vState, setState] = useState({ playerUrl: '', insightsUrl: '' });
  
  const dispatch = useDispatch();
  
  const router = useRouter();

  // Extract videoId from the URL query parameters 
  const videoId = router.query.id as string;

  // Fetch data when component mounts or videoId changes
  useEffect(() => {

    if (!videoId) return;

    // Function to fetch data from insights, palyer Url
    const fetchData = async () => {

      dispatch(setApiLoading(true)); // Show loading indicator
      try {
        
        const [resDataPlayer, resDataInsights] = await Promise.all([
          apiGetVideoAnalysesWidgetPlayer(videoId),
          apiGetVideoAnalysesWidgetInsight(videoId),
        ]);
       
        setState({
          playerUrl: resDataPlayer.data.Url,
          insightsUrl: resDataInsights.data.Url,
        });
      } catch (e) {
        console.error(e); 
        dispatch(openSnackbarError('Get WidgetPlayer Error'));
      } finally {
        dispatch(setApiLoading(false)); // Hide loading indicator
      }
    };

    fetchData();
  }, [videoId, dispatch]); 

  
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
              borderRadius: '.2rem',
            },
          }}
        >
          {/* iFrame for video insights */}
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
              borderRadius: '.2rem',
            },
          }}>
          {/* iFrame for the video player */}
          <iframe
            width='100%'
            height='400'
            src={vState.playerUrl}
            frameBorder='0' allowFullScreen></iframe>
        </Box>
      </Grid>
    </Grid>
  ) : null;
};

export default VideoInsightSection;
