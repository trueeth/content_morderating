import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import { useTranslate } from '../../locales';

// Dynamic import for Powerbi component with client-side rendering
const Powerbi = dynamic(() => import('./powerbi'), { ssr: false });

/**
 * Functional component representing the Dashboard section.
 */
export default function DashboardSection() {
  // Get the current date
  const currentDate = new Date();
  const { t } = useTranslate();

  return (
    <Box>
      {/* Container for Powerbi component */}
      <Box sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 25px 0px #F3F3F3;',
        borderRadius: '.4rem',
        border: '1px solid var(--Stroke, #E8E8E8)',
        overflow: 'hidden',
        mt: 5,
        '& >div': {
          height: '600px !important'
        }
      }} height={600}>
        {/* Powerbi component */}
        <Powerbi />
      </Box>

      {/* Footer section */}
      <Box className='flex justify-between mt-30'>
        {/* Copyright information */}
        <Box>
          <Typography sx={{ color: '#8f8f8f', fontSize: '.9rem' }}>
            {currentDate.getFullYear()} © MicroBeaver - microbeaver.com - Version 2023.2.0.0
          </Typography>
        </Box>

        {/* Contact Us link */}
        <Box>
          <a style={{ color: '#8f8f8f', textDecoration: 'unset' }} href='mailto:support@microbeaver.com'>
            {t('Contact Us')}
          </a>
        </Box>
      </Box>
    </Box>
  );
}
