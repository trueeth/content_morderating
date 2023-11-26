import { Search } from '@mui/icons-material'
import { IconButton, InputBase, Paper } from '@mui/material'

export default function SearchInput() {
  return (
    <Paper
      sx={{
        height: '36px',
        boxShadow: 0,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <InputBase
        sx={{ ml: 1, height: 'inherit' }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  )
}
