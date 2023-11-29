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
import { CSceneState } from '@interfaces/index'

const historys: IHistoryRow[] = [
  {
    writerName: 'Mark Mohammad',
    writeDate: '07:55PM SEP, 29, 2923',
    description: 'Scene Added'
  },
  {
    writerName: 'Carolina 5',
    writeDate: '12:10PM SEP, 28, 2923',
    description: 'Change status to Unapproved with note, This is good'
  },
  {
    writerName: 'John L',
    writeDate: '09:10PM SEP, 27, 2923',
    description: 'Change Status to Approved'
  },
  {
    writerName: 'Carolina S',
    writeDate: '07:55PM SEP, 29, 2923',
    description: 'Change Status to Processing with note Done'
  }
]

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
  const [vState, setState] = useState({ scene: 'Processing' })
  const handleScenceState = (
    event: React.MouseEvent<HTMLElement>,
    newState: string | null
  ) => {
    setState({ scene: newState })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}
    >
      <Typography sx={{ padding: '1rem' }}>Update Scene Status</Typography>

      {/*---------Button group---------*/}
      <Box
        sx={{
          pl: '1rem'
        }}
      >
        <ToggleButtonGroup
          value={vState.scene}
          exclusive
          aria-label="text alignment"
          onChange={handleScenceState}
        >
          {CSceneState.map((item, index) => (
            <ToggleButton
              value={item}
              key={index}
              sx={{
                width: '130px',
                height: '33px'
              }}
            >
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/*  -----------update-----------*/}
      <Box
        sx={{
          m: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}
      >
        <CssTextField
          fullWidth
          placeholder="Write your note"
          sx={{ mr: 2 }}
          InputProps={{ sx: { height: '33px', fontSize: '0.8rem' } }}
        ></CssTextField>

        <Button
          variant="contained"
          sx={{
            backgroundColor: 'var(--Primary1)',
            width: '130px',
            height: '33px',
            '&:hover': { backgroundColor: 'var(--Primary1)' }
          }}
        >
          Update
        </Button>
      </Box>

      {/*  ------------History--------*/}
      <Box>
        <Typography ml={3}>History</Typography>
        <Box>
          {historys.map((item, index) => (
            <HistoryRow
              key={index}
              writerName={item.writerName}
              writeDate={item.writeDate}
              description={item.description}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
