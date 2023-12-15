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
import { useEffect, useState } from 'react'
import { CQuestionsColumns, CSceneState, EModeratorApprovalStatus } from '@interfaces/index'
import { DrawerHistories } from '@interfaces/apis/_mock'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { apiUpdateVideoSceneSummary } from '@interfaces/apis/videos'
import { openSnackbarError, openSnackbarSuccess } from '@store/reducers/snackbar/reducers'
import { useRouter } from 'next/router'
import TableCell from '@mui/material/TableCell'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import { TResDocument } from '@interfaces/apis/api.types'


interface IHistoryRow {
  writerName: string
  writeDate: string
  description: string
}


interface IProps {
  handlePageNum?: (val:number, index:number) => void
}

export default function DrawerTabQuestions(props: IProps) {
  const [vState, setState] = useState({ moderatorStatus: 'Processing', notes: '' })


  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const gptAnswers = appState.drawer.drawerData?.GptResponse[appState.drawer.subRowIndex].answers as TResDocument.TGptAnswer[]

  useEffect(() => {
    props.handlePageNum(0,0)
  }, [])

  if (!gptAnswers || gptAnswers.length == 0)
    return (
      <Typography>No answers</Typography>
    )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 2rem',
        marginTop: '-1rem',
        backgroundColor: '#ececec'
      }}
    >

      <Table
        size='small'
        sx={{
          cursor: 'pointer',
          borderCollapse: 'collapse',
          mt: -0.5,
          mb: 0.5,
          backgroundColor: 'white',
          borderRadius: '.3rem',
          '& .MuiTableCell-root': {
            borderTop: 'none !important',
            maxWidth: '400px',
            height: '50px',
            fontSize: '.8rem'
          }
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& .MuiTableCell-root': {
                whiteSpace: 'nowrap',
                color: '#333',
                fontSize: '12px',
                height: '40px'
              }
            }}
          >
            <TableCell>#</TableCell>
            {CQuestionsColumns.map((val, index) => {
                if (index === 3)
                  return <TableCell style={{ maxWidth: '80px', whiteSpace: 'pre-wrap' }} key={index}>{val}</TableCell>
                return <TableCell key={index}>{val}</TableCell>
              }
            )}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            '& .MuiTypography-root': {
              color: '#6f6f6f !important',
              fontSize: '.8rem'
            }
          }}
        >
          {gptAnswers.map((val, answerIndex) =>
            <TableRow key={answerIndex}>
              <TableCell>
                {answerIndex + 1}
              </TableCell>
              <TableCell>
                {val.question}
              </TableCell>
              <TableCell>
                {val.answerFound ? 'Answer found' : 'Answer not found'}
              </TableCell>
              <TableCell>
                {val.ModeratorAnswerFound ? 'Answer found' : 'Answer not found'}
              </TableCell>
              <TableCell>
                {val.ModeratorApprovalStatus}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '.5rem',
                    rowGap: '.3rem'
                  }}
                >
                  {val.pageNumbers.map((val, index) =>
                    <Button
                      sx={{
                        backgroundColor: '#4fc1d763',
                        padding: '3px 0px',
                        minWidth: '40px',
                        color: '#232323',
                        '&:hover': {
                          backgroundColor: '#4fc1d7'
                        }
                      }}
                      onClick={() => props.handlePageNum(val.pageNumber, answerIndex)}
                      key={index}
                    >
                      {val.pageNumber}
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}
