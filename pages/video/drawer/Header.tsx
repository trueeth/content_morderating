import { Box, Typography } from '@mui/material'
import RowAction from '../videoTable/videoRow/RowAction'
import { EVideoColumns } from '../../../interfaces'



export default function DrawerHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >

      </Box>
    </Box>
  )
}
