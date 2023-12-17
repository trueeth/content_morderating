import {
  Box,
  Typography,
  Button
} from '@mui/material'
import { CQuestionsColumns, EDocumentApprovalDlg } from '@interfaces/index'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import TableCell from '@mui/material/TableCell'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import { TResDocument } from '@interfaces/apis/api.types'
import RowAction from '@components/multi-media/common/action-item'
import { openDocumentApproval } from '@store/reducers/dialog/reducers'
import RowApproval from '@components/multi-media/common/approval-item'


// interface IHistoryRow {
//   writerName: string
//   writeDate: string
//   description: string
// }


interface IProps {
  // handlePageNum?: (val:number, index:number) => void
}

export default function DrawerTabQuestions() {


  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const gptAnswers = appState.drawer.drawerData?.GptResponse[appState.drawer.subRowIndex].answers as TResDocument.TGptAnswer[]

  const dispatch = useDispatch()


  // useEffect(() => {
  //   props.handlePageNum(0,0)
  // }, [])

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
                whiteSpace: 'pre-wrap',
                color: '#333',
                fontSize: '.9rem',
                height: '40px',
                padding:'8px'
              }
            }}
          >
            <TableCell sx={{minWidth:'50px', textAlign:'center'}}>#</TableCell>
            {CQuestionsColumns.map((val, index) => {
                if (index === (2||3))
                  return <TableCell className='menu-title' style={{ maxWidth: '60px',  }} key={index}>{val}</TableCell>
                if (index === 4)
                  return <TableCell className='menu-title' style={{ maxWidth: '200px',minWidth:'150px' }} key={index}>{val}</TableCell>
                if (index === 0)
                  return <TableCell className='menu-title' style={{ maxWidth: '200px',minWidth:'50px' }} key={index}>{val}</TableCell>
                return <TableCell className='menu-title' key={index}>{val}</TableCell>
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
          {gptAnswers.map((val, questionIndex) =>
            <TableRow key={questionIndex}>
              <TableCell >
                <Typography sx={{textAlign:'center'}}>
                  {questionIndex + 1}
                </Typography>
              </TableCell>
              <TableCell>
                {val.question}
              </TableCell>
              <TableCell>
                <RowApproval approval={val.ModeratorApprovalStatus} />
              </TableCell>
              <TableCell>
                <RowApproval approval={val.AiApproval} />
              </TableCell>
              <TableCell>
                {val.answerFound ? 'Answer found' : 'Answer not found'}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '.5rem',
                    rowGap: '.3rem',
                    justifyContent: 'left'
                  }}
                >
                  {val.pageNumbers.length > 0 ?
                    val.pageNumbers.map((val, index) =>
                      <Button
                        sx={{
                          backgroundColor: '#4fc1d763',
                          padding: '3px 0px',
                          minWidth: '40px',
                          color: '#232323',
                          fontSize:'.7rem',
                          '&:hover': {
                            backgroundColor: '#4fc1d7'
                          }
                        }}
                        // onClick={() => props.handlePageNum(val.pageNumber, questionIndex)}
                        onClick={() => dispatch(openDocumentApproval({
                          type: EDocumentApprovalDlg.page,
                          docIndex: appState.drawer.rowIndex,
                          topicIndex: appState.drawer.subRowIndex,
                          questionIndex: questionIndex,
                          pageIndex: index
                        }))}
                        key={index}
                      >
                        {val.pageNumber}
                      </Button>
                    ) :
                    '-'}
                </Box>
              </TableCell>
              <TableCell>
               {/* <RowAction actions={[
                  // { title: 'Classification' },
                  // { title: 'Reports' },
                  {
                    title: 'Reports',
                    action: () => dispatch(openDocumentApproval({
                      type: EDocumentApprovalDlg.question,
                      docIndex: appState.drawer.rowIndex,
                      topicIndex: appState.drawer.subRowIndex,
                      questionIndex: questionIndex
                    }))
                  }
                ]} />*/}

                <Button
                  sx={{
                    backgroundColor: 'var(--Primary1)',
                    padding: '2px 10px',
                    minWidth: '40px',
                    color: '#fff',
                    fontSize:'.7rem',
                    '&:hover': {
                      backgroundColor: '#4fc1d7'
                    }
                  }}
                  // onClick={() => props.handlePageNum(val.pageNumber, questionIndex)}
                  onClick={ () => dispatch(openDocumentApproval({
                    type: EDocumentApprovalDlg.question,
                    docIndex: appState.drawer.rowIndex,
                    topicIndex: appState.drawer.subRowIndex,
                    questionIndex: questionIndex
                  }))}
                >
                  {'Reports'}
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}
