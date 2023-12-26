import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import { TResDocument } from '@interfaces/apis/api.types'
import { EDocDetail } from '@interfaces/enums'
import RowApproval from '@components/multi-media/common/approval-item'
import { useTranslate } from '../../../locales'
import { resToDocumentSubRowAdapter } from '@interfaces/apis/data-adapter/data-document'

// DocumentSubrow component definition
const DocumentSubrow = (props: {
  rowDetails: TResDocument.TDocumentContentDetail;
  rowIndex: number;
}) => {
  const { rowDetails } = props
  const dispatch = useDispatch()
  const { t } = useTranslate()

  // Function to open the media sub-drawer
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

  // If rowDetails is undefined or null, return null
  if (!rowDetails) {
    return null
  }

  // Convert rowDetails to TDocumentSubRowType using an adapter function
  const memoRows = (() => {
    return resToDocumentSubRowAdapter(rowDetails)
  })()

  // CustomizedTableRow component definition
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
        {/* Table header row */}
        <TableRow
          sx={{
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
              color: '#333',
              fontSize: '12px',
              height: '50px',
              paddingRight: '8px !important'
            }
          }}
        >
          <TableCell sx={{ width: '7%' }} />
          {/* Iterate over EDocDetail values to create header cells */}
          {Object.values(EDocDetail).map((item, index) => (
            <TableCell key={index} sx={{ width: index === 0 ? '15%' : '20%' }}>
              <Typography sx={{ fontSize: '13px', color: '#000' }} className='text-uppercase'>
                {t(`column.${item.toLowerCase()}`)}
              </Typography>
            </TableCell>
          ))}
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
        {/* Render rows based on memoRows */}
        {memoRows.length > 0
          ? memoRows.map((row, index) =>
            <CustomizedTableRow key={index} keyValue={index} onClick={openScene(index)}>
              <Typography className='text-capitalize'>{t('topic')} # {(index + 1)}</Typography>
              <Typography>{row.topic}</Typography>
              <Box className={'item-left approval'}>
                <RowApproval approval={row.aiApproval} />
              </Box>
            </CustomizedTableRow>
          )
          : null}
      </TableBody>
    </Table>
  )
}

export default DocumentSubrow
