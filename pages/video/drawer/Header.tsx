import { Box, Typography } from '@mui/material'
import RowAction from '../videoTable/videoRow/RowAction'
import { EVideoColumns } from '../../../interfaces'

export default function DrawerHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
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
        {Object.values(EVideoColumns).map((item, index) => {
          return (
            <Box key={index} className="flex mr-5">
              <Typography>{item + ':'}</Typography>
              <Typography>{index}</Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
