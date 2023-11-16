import { Box, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { FilterList, GetApp } from '@mui/icons-material'
import * as React from 'react'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { PrimaryButton } from 'components/styled/StyledButton'
import SearchInput from 'components/styled/SearchInput'
import useMounted from '../../hooks/useMounted'
import useMediaQuery from '@mui/material/useMediaQuery'

const VideoTableHeader = () => {
  const [vState, setState] = React.useState({ groupBy: 0 })

  const handleGroupByChange = (event: any) => {
    setState({ groupBy: event.target.value })
  }


  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        color: 'black'
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
            alignItems: 'center'
          }
        }}
      >
        <Grid item>
          <Typography>Videos</Typography>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              ml: 2,
              textTransform: 'none',
              fontSize: '.8rem',
              color: 'black',
              borderColor: '#ccc'
            }}
          >
            Filters
          </Button>
        </Grid>

        <Grid item container spacing={2} sx={{ width: 'fit-content' }}>
          <Grid item>
            <Typography whiteSpace="nowrap">Group by:</Typography>
            <Select
              value={vState.groupBy}
              onChange={handleGroupByChange}
              sx={{
                ml: 2,
                height: '36px',
                width: '8rem'
              }}
            >
              <MenuItem value={0}>New Videos</MenuItem>
              <MenuItem value={1}> Videos</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <SearchInput />
          </Grid>
          <Grid item>
            <PrimaryButton>
              <GetApp sx={{ color: 'white' }} />
              Export
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default VideoTableHeader
