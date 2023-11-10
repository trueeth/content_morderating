import { Box, ButtonGroup, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { styled } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import { Slideshow } from '@mui/icons-material'


const historys: IHistoryRow[] = [
  { writerName: 'Mark Mohammad', writeDate: '07:55PM SEP, 29, 2923', description: 'Scene Added' },
  {
    writerName: 'Carolina 5',
    writeDate: '12:10PM SEP, 28, 2923',
    description: 'Change status to Unapproved with note:This is good',
  },
  { writerName: 'John L', writeDate: '09:10PM SEP, 27, 2923', description: 'Change Status to Approved' },
  {
    writerName: 'Carolina S',
    writeDate: '07:55PM SEP, 29, 2923',
    description: 'Change Status to Processing with note:Done',
  },
]

interface IHistoryRow {
  writerName: string,
  writeDate: string,
  description: string
}

const HistoryDescription = styled('div')({})

const HistoryRow = (props: IHistoryRow) => {
  return (
    <Box
      sx={{
        display:'flex',
        padding:'1rem',
        borderBottom:'1px solid #E8E8E8'
      }}
    >


      <div>
        <IconButton>
          <Slideshow></Slideshow>
        </IconButton>
      </div>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width:'100%'
      }}
    >


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          {props.writerName}
        </div>
        <div>
          {props.writeDate}
        </div>
      </Box>

      <HistoryDescription>
        {props.description}
      </HistoryDescription>
    </Box>
    </Box>
  )
}

export default function DrawerTabActivities() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding:0
      }}
    >
      <div style={{padding:'1rem'}}>
        Update Scene Status
      </div>

      {/*---------Button group---------*/}
      <Box sx={{
        paddingLeft:'1rem'
      }}>
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          <Button>Processing</Button>
          <Button>Approved</Button>
          <Button>Unapproved</Button>
        </ButtonGroup>
      </Box>

      {/*  -----------update-----------*/}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding:'1rem',
        }}
      >
        <div style={{ width: '100%', paddingRight: '5rem' }}>
          <TextField fullWidth placeholder='Write your note'></TextField>
        </div>
        <Button variant='contained'>Update</Button>
      </Box>

      {/*  ------------History--------*/}
      <Box>
        <div>
          History
        </div>
        <div>
          {historys.map((item, index) =>
            <HistoryRow
              key={index}
              writerName={item.writerName}
              writeDate={item.writeDate}                                                     
              description={item.description} />)}
        </div>
      </Box>
    </Box>
  )

}
