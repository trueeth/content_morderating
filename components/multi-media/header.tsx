import { Box, Grid, Tooltip, Typography } from '@mui/material'
import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info'
import { useTranslate } from '../../locales'

interface IProps {
  title: string;
  groupByValue: string[];
  handleExport?: () => void;
}

const MediaSectionHeader = (props: IProps) => {

  const {t}=useTranslate()

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        color: 'black',
        backgroundColor: '#00000008',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          '& .MuiGrid-item': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <Grid item>
          <Typography
            sx={{
            fontSize:'1.1rem',
            pl:'16px',
            pr:'8px',
            color: '#1A2057',
          }}
            className='text-capitalize'
          >{t(props.title.toLowerCase())}</Typography>
          <Tooltip title={props.title} sx={{padding:'0 0 7px 2px'}}>
            <InfoIcon sx={{ color: 'grey', width: '16px' }} />
          </Tooltip>

        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaSectionHeader;
