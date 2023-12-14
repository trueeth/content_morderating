import {
  Box,
  ToggleButtonGroup,
  TextField,
  Typography,
  ToggleButton,
  Button
} from '@mui/material'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import { Slideshow } from '@mui/icons-material'
import { useState } from 'react'
import { CSceneState, EModeratorApprovalStatus } from '@interfaces/index'
import { DrawerHistories } from '@interfaces/apis/_mock'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { apiUpdateVideoSceneSummary } from '@interfaces/apis/videos'
import { openSnackbarError, openSnackbarSuccess } from '@store/reducers/snackbar/reducers'
import { useRouter } from 'next/router'


interface IHistoryRow {
  writerName: string
  writeDate: string
  description: string
}

const HistoryDescription = styled('div')({
  backgroundColor: '#eee',
  padding: '7px 14px',
  borderRadius: '5px',
  fontSize: '0.7rem'
})

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#eee'
    },
    '&:hover fieldset': {
      borderColor: '#eee'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--Primary1)'
    }
  }
})

const HistoryRow = (props: IHistoryRow) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #E8E8E8'
      }}
    >
      <IconButton
        sx={{
          p: 1,
          backgroundColor: '#eee',
          mr: 2,
          color: '#75598D',
          ':hover': {
            backgroundColor: '#eee'
          }
        }}
      >
        <Slideshow fontSize={'small'} />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: '14px', color: '#1A2057', fontWeight: 600 }}
          >
            {props.writerName}
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#888' }}>
            {props.writeDate}
          </Typography>
        </Box>

        <HistoryDescription>{props.description}</HistoryDescription>
      </Box>
    </Box>
  )
}

export default function DrawerTabActivities() {
  // const [vState, setState] = useState({ moderatorStatus: 'Processing', notes: '' })

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}
    >


        {/*------------History--------*/}
      <Box>
        <Typography ml={3} sx={{textAlign:'center', marginLeft:'0'}}>History</Typography>
        <Box>
          {DrawerHistories.length>0?
            DrawerHistories.map((item, index) => (
            <HistoryRow
              key={index}
              writerName={item.writerName}
              writeDate={item.writeDate}
              description={item.description}
            />
          )):
          <Typography sx={{textAlign:'center', paddingTop:'2rem'}}>No History yet</Typography>
          }
        </Box>
      </Box>
    </Box>
  )
}
