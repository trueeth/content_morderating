import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography'

const Powerbi = dynamic(
  () => {
    return import('./powerbi')
  },
  { ssr: false } // This line disables server-side rendering for this component.
)

export default function DashboardSection() {

  const currentDate = new Date()

  return (
    <Box>
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
        <Powerbi />

      </Box>
      <Box className='flex justify-between mt-60'>
        <Box>
          <Typography sx={{color:'#8f8f8f', fontSize:'.9rem'}}>
            {currentDate.getFullYear()} © MicroBeaver - microbeaver.com - Version 2023.2.0.0
          </Typography>
        </Box>
        <Box>
          <a style={{color:'#8f8f8f', textDecoration:'unset'}} href='mailto:support@microbeaver.com'>Contact Us</a>
        </Box>
      </Box>
    </Box>
  )
}
