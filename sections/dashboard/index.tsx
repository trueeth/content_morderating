import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'
const Powerbi = dynamic(
  () => {
    return import('./powerbi')
  },
  { ssr: false } // This line disables server-side rendering for this component.
)

export default function DashboardSection() {


  return (
    <Box sx={{
      backgroundColor: 'white',
      boxShadow: '0px 0px 25px 0px #F3F3F3;',
      borderRadius: '.4rem',
      border: '1px solid var(--Stroke, #E8E8E8)',
      overflow: 'hidden',
      mt: 5,
      '& >div':{
        height:'600px !important'
      }
    }} height={600}>
        <Powerbi/>
    </Box>
  )
}
