import { Box, Typography } from '@mui/material'
import RowAction from '@/components/multi-media/RowAction'

export default function DrawerHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}
    >
      <header className="flex justify-between">
        <Typography>Test Video for the project, Scene #5</Typography>
        <RowAction />
      </header>
      <Typography>
        This is simply dummy text of the printing and typesetting industry. Here
        is simply dummy text of the best ipsum has been the industry&apos;s
        standard printing and typesetting industry.
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '& .MuiBox-root': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiTypography-root:first-of-type': {
              color: 'grey',
              fontSize: '14px'
            }
          }
        }}
      >
        <Box>
          <Typography>STATUS : &nbsp;</Typography>
          <Typography color="var(--Secondary)"> NEW</Typography>
        </Box>
        <Box>
          <Typography>RATING : &nbsp;</Typography>
          <Typography> R18</Typography>
        </Box>
        <Box>
          <Typography>CLASSIFICATION : &nbsp; </Typography>
          <Typography> H,SH,S</Typography>
        </Box>
        <Box>
          <Typography>SUBMISSION DATE : &nbsp;</Typography>
          <Typography> SETP,26,2023 07:55PM</Typography>
        </Box>
        <Box>
          <Typography>APPROVAL : &nbsp; </Typography>
          <Typography className="approve"> Approved</Typography>
        </Box>
      </Box>
    </Box>
  )
}
