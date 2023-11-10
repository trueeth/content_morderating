import {
  Box,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  Paper,
  SelectChangeEvent,
} from '@mui/material'
import Button from '@mui/material/Button'
import { FilterList, GetApp, Search } from '@mui/icons-material'
import * as React from 'react'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'



const ExportButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: '#203349',
  border: '1px solid #454f5b',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

const VideoTableHeader=()=>{

  const [VState, setState] = React.useState({groupBy:0});

  const handleGroupByChange = (event: any) => {
    setState({ groupBy:event.target.value });
  };


  return(

    <Box sx={{ display: 'flex', width: '100%', color:'var(--Secondry)', fontWeight:700}}>
      <Grid container sx={{display:'flex',justifyContent:'space-between', backgroundColor:'#FAFAFA', p:2}}>
        <Grid item sx={{
          display:'flex',
          alignItems:'center'
        }}>

          <div style={{
            fontSize:'1.25rem',
            fontWeight:700,
            marginRight:'2rem'
          }
          }>
            Videos
          </div>
          <Button  variant='outlined' startIcon={<FilterList/>} sx={{textTransform:'none', fontSize:'.8rem'}}>
            Filters
          </Button>

        </Grid>

        <Grid item sx={{
          display:'flex',
          alignItems:'center'
        }}>
          <div>
            Group by:
          </div>
          <Select
            value={VState.groupBy}
            onChange={handleGroupByChange}
            sx={{
              width:'8rem'
            }}
          >
            <MenuItem value={0}>New Videos</MenuItem>
            <MenuItem value={1}> Videos</MenuItem>
          </Select>

          <Paper
            component='form'
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>

          <ExportButton>
            <GetApp></GetApp>
            Export
          </ExportButton>

        </Grid>
      </Grid>
    </Box>
  )
}


export  default VideoTableHeader