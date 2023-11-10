import { Box, Grid, InputBase, Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { FilterList, GetApp, Search } from '@mui/icons-material'
import * as React from 'react'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import StyledButton from 'components/styled/StyledButton'

const VideoTableHeader = () => {
  const [VState, setState] = React.useState({ groupBy: 0 })

  const handleGroupByChange = (event: any) => {
    setState({ groupBy: event.target.value })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        color: 'black',
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Videos</Typography>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              ml: 2,
              textTransform: 'none',
              fontSize: '.8rem',
              color: 'black',
              borderColor: '#ccc',
            }}
          >
            Filters
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Group by:</Typography>
          <Select
            value={VState.groupBy}
            onChange={handleGroupByChange}
            sx={{
              ml: 2,
              height: '36px',
              width: '8rem',
            }}
          >
            <MenuItem value={0}>New Videos</MenuItem>
            <MenuItem value={1}> Videos</MenuItem>
          </Select>

          <Paper
            sx={{
              ml: 2,
              height: '36px',
              boxShadow: 0,
              display: 'flex',
              alignItems: 'center',
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
          <StyledButton>
            <GetApp sx={{ color: 'white' }} />
            Export
          </StyledButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default VideoTableHeader
