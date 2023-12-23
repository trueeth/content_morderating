import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import * as React from 'react'
import { Box, Typography } from '@mui/material'
import { TDocumentSubRowType } from '@interfaces/types'
import { EDocDetail } from '@interfaces/enums'
import { useDispatch } from 'react-redux'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import { TResDocument } from '@interfaces/apis/api.types'
import { resToDocumentSubRowAdapter } from '@interfaces/apis/data-adapter/data-document'
import RowApproval from '@components/multi-media/common/approval-item'
import { useTranslate } from '../../../locales'

const DocumentSubrow = (props: {
  rowDetails: TResDocument.TDocumentContentDetail
  rowIndex: number
}) => {


  const { rowDetails } = props
  const dispatch = useDispatch()

  const { t } = useTranslate()

  const openScene = (index: number) => () => {
    dispatch(
      openMediaSubDrawer({
        open: true,
        type: 'document',
        rowIndex: props.rowIndex,
        subRowIndex: index,
        drawerData: props.rowDetails
      })
    )
  }


  if (rowDetails === undefined || rowDetails === null) {
    return null
  }

  const memoRows = (() => {
    let rows: TDocumentSubRowType[]
    rows = resToDocumentSubRowAdapter(rowDetails)
    return rows
  })()


  const rowActions = [
    // { title: 'Classification' },
    // { title: 'Reports' },
    {
      title: 'Approval'
      // action:()=>dispatch(openDocumentApproval({
      //   type:EDocumentApprovalDlg.topic,
      //   docIndex:props.rowIndex,
      //   topicIndex:index
      // })),
    }
  ]

  const CustomizedTableRow = ({ children, onClick, keyValue }) => (
    <TableRow key={keyValue}>
      <TableCell />
      {children.map((item, idx) => {
        if (idx < 5)
          return (
            <TableCell onClick={onClick} key={idx}>
              {item}
            </TableCell>
          )
        return (
          <TableCell key={idx}>
            {item}
          </TableCell>
        )
      })}
      <TableCell />
    </TableRow>
  )

  return (
    <Table
      size='small'
      sx={{
        cursor: 'pointer',
        borderCollapse: 'collapse',
        mt: -0.5,
        mb: 0.5,
        '& .MuiTableCell-root': {
          borderTop: 'none !important',
          maxWidth: '400px',
          height: '45px'
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
              height: '50px'
            }
          }}
        >
          {/*<TableCell>*/}
          {/*  <Checkbox*/}
          {/*    checked={checked}*/}
          {/*    onChange={handleChange}*/}
          {/*    inputProps={{ 'aria-label': 'controlled' }}*/}
          {/*  />*/}
          {/*</TableCell>*/}
          <TableCell sx={{ width: '7%' }} />
          {Object.values(EDocDetail).map((item, index) => {
            if (index === 0)
              return (
                <TableCell key={index} sx={{ width: '15%' }}>
                  <Typography sx={{ fontSize: '13px', color: '#000' }} className='text-uppercase'>
                    {t(`column.${item.toLowerCase()}`)}
                  </Typography>
                </TableCell>
              )
            return (
              <TableCell key={index} sx={{ width: '20%' }}>
                <Typography sx={{ fontSize: '13px', color: '#000' }} className='text-uppercase'>
                  {t(`column.${item.toLowerCase()}`)}
                </Typography>
              </TableCell>
            )
          })}
          <TableCell />
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
        {memoRows.length > 0 ?
          memoRows.map((row, index) => {
            if (index == null)
              return null
            return (
              <CustomizedTableRow key={index} keyValue={index} onClick={openScene(index)}>
                {/*<Checkbox />*/}
                <Typography className='text-capitalize'>{t('topic')} # {(index + 1)}</Typography>
                <Typography>{row.topic}</Typography>
                <Box className={'flex item-left approval'}>
                  <RowApproval approval={row.aiApproval} />
                </Box>
              </CustomizedTableRow>
            )
          }) :
          null
        }
      </TableBody>
    </Table>
  )
}

export default DocumentSubrow
