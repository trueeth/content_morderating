import { Box, Button, Tooltip, Typography } from '@mui/material'
import { CQuestionsColumns, EDocumentApprovalDlg, EModeratorApprovalStatus } from '@interfaces/index'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import TableCell from '@mui/material/TableCell'
import * as React from 'react'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import { TResDocument } from '@interfaces/apis/api.types'
import { openDocumentApproval } from '@store/reducers/dialog/reducers'
import RowApproval from '@components/multi-media/common/approval-item'
import { useTranslate } from '../../../../locales'


export default function DrawerTabQuestions() {

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)
  const {t}=useTranslate()

  const dispatch = useDispatch()

  const [vState, setState]=useState({memoValue:[]})

  /*eslint-disable*/
  useEffect(() => {
    const gptResponse =appState.drawer.drawerData?.GptResponse[appState.drawer.subRowIndex].answers as TResDocument.TGptAnswer[]
    setState(prevState => ({...prevState, memoValue: gptResponse}))
  }, [appState.drawer.drawerData])
  /*eslint-enable*/

  if (!vState.memoValue || vState.memoValue.length == 0)
    return (
      <Typography>{t('drawer.No answers')}</Typography>
    )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 2rem',
        marginTop: '-1rem'
      }}
    >
      <Table
        size='small'
        sx={{
          cursor: 'pointer',
          borderCollapse: 'collapse',
          mt: -0.5,
          mb: 0.5,
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
                padding: '8px'
              }
            }}
          >
            <TableCell sx={{ minWidth: '50px', textAlign: 'center' }}>#</TableCell>
            {CQuestionsColumns.map((val, index) => {
                if (index === 2)
                  return <TableCell className='menu-title text-capitalize' style={{ minWidth: '100px' }} key={index}>
                    {t(`column.${val.toLowerCase()}`)}
                </TableCell>
                if (index === 3)
                  return <TableCell className='menu-title text-capitalize' style={{ minWidth: '100px' }} key={index}>{t(`column.${val.toLowerCase()}`)}</TableCell>
                if (index === 4)
                  return <TableCell className='menu-title text-capitalize' style={{ maxWidth: '200px', minWidth: '150px' }}
                                    key={index}>{t(`column.${val.toLowerCase()}`)}</TableCell>
                if (index === 0)
                  return <TableCell className='menu-title text-capitalize' style={{ maxWidth: '200px', minWidth: '50px' }}
                                    key={index}>{t(`column.${val.toLowerCase()}`)}</TableCell>
                return <TableCell className='menu-title text-capitalize' style={{ minWidth: '80px' }} key={index}>{t(`column.${val.toLowerCase()}`)}</TableCell>
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
          {vState.memoValue.map((val, questionIndex) =>
            <TableRow key={questionIndex}>
              <TableCell>
                <Typography sx={{ textAlign: 'center' }}>
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
                {val.answerFound ? t('drawer.Answer found') : t('drawer.Answer not found')}
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
                      {

                        let buttonBackColor: string
                        let buttonHoverColor: string
                        switch (val.ModeratorApprovalStatus){
                          case EModeratorApprovalStatus.rejected:
                            buttonBackColor='rgba(244,0,0,0.51)';
                            buttonHoverColor='#f40000'
                            break
                          case EModeratorApprovalStatus.new:
                            buttonBackColor='rgba(250,224,159,0.39)';
                            buttonHoverColor='rgba(252,195,16,0.39)'
                            break
                          default:
                            buttonBackColor='#4fc1d763';
                            buttonHoverColor='#4fc1d7'
                        }
                        return (
                          <Tooltip title={`${val.ModeratorApprovalStatus}  by Moderator`} placement="top-start"
                                   key={index}>
                          <Button
                            sx={{
                              backgroundColor: buttonBackColor,
                              padding: '3px 0px',
                              minWidth: '40px',
                              color: '#232323',
                              fontSize: '.7rem',
                              '&:hover': {
                                backgroundColor: buttonHoverColor
                              }
                            }}
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
                        </Tooltip>)
                      }
                    ) :
                    '-'}
                </Box>
              </TableCell>
              <TableCell>
                <Button
                  sx={{
                    backgroundColor: 'var(--Primary1)',
                    padding: '2px 10px',
                    minWidth: '40px',
                    color: '#fff',
                    fontSize: '.6rem',
                    '&:hover': {
                      backgroundColor: '#4fc1d7'
                    }
                  }}
                  onClick={() => dispatch(openDocumentApproval({
                    type: EDocumentApprovalDlg.question,
                    docIndex: appState.drawer.rowIndex,
                    topicIndex: appState.drawer.subRowIndex,
                    questionIndex: questionIndex
                  }))}
                >
                  {t('updateApproval.Approval')}
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}
