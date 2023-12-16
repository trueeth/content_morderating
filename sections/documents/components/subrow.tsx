import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import * as React from 'react'
import { Checkbox, Typography } from '@mui/material'
import { TDocumentSubRowType, TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { EDocDetail, EDocumentApprovalDlg } from '@interfaces/enums'
import { useDispatch } from 'react-redux'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import Button from '@mui/material/Button'
import { MoreHoriz } from '@mui/icons-material'
import { TResDocument } from '@interfaces/apis/api.types'
import { useMemo } from 'react'
import { resToDocumentSubRowAdapter } from '@interfaces/apis/data-adapter/data-document'
import RowAction from '@components/multi-media/common/action-item'
import { openDocumentApproval } from '@store/reducers/dialog/reducers'
import RowApproval from '@components/multi-media/common/approval-item'

const DocumentSubrow = (props: {
  rowDetails:TResDocument.TDocumentContentDetail
  rowIndex:number
}) => {


  const { rowDetails } = props
  const dispatch = useDispatch()

  const openScene = (index:number) => () => {
    dispatch(
      openMediaSubDrawer({
        open:true,
        type: 'document',
        rowIndex: props.rowIndex,
        subRowIndex:index,
        drawerData:props.rowDetails
      })
    )
  }


  if (rowDetails === undefined || rowDetails === null) {
    return null
  }

  const memoRows = useMemo(()=>{
    let rows:TDocumentSubRowType[] = []
    rows = resToDocumentSubRowAdapter(rowDetails)
    return rows
  },[rowDetails])

  const CustomizedTableRow = ({ children, onClick, keyValue }) => (
    <TableRow key={keyValue}>
      <TableCell />
      {children.map((item, idx) => {
        if (idx<2)
          return (
            <TableCell onClick={onClick} key={idx}>
              {item}
            </TableCell>
          )
        return (
          <TableCell  key={idx}>
            {item}
          </TableCell>
        )
      })}
    </TableRow>
  )

  return (
    <Table
      size="small"
      sx={{
        cursor: 'pointer',
        borderCollapse: 'collapse',
        mt: -0.5,
        mb: 0.5,
        '& .MuiTableCell-root': {
          borderTop: 'none !important',
          maxWidth: '400px',
          height: '60px',
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
              height: '60px',
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
          <TableCell sx={{width:'10%'}} />
          {Object.values(EDocDetail).map((item, index) => {
            return (
              <TableCell key={index}>
                <Typography sx={{ fontSize: '13px', color: '#000' }}>
                  {item}
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody
        sx={{
          '& .MuiTypography-root': {
            color: '#6f6f6f !important',
            fontSize:'.8rem'
          }
        }}
      >
        {memoRows.length>0?
          memoRows.map((row, index) => {
          if (index==null)
            return null
          return (
            <CustomizedTableRow key={index} keyValue={index} onClick={openScene(index)}>
              {/*<Checkbox />*/}
              {/*<Typography>{'Topic #' + (index + 1)}</Typography>*/}
              <Typography>{row.topic}</Typography>
              <Typography whiteSpace="nowrap">
                <RowApproval approval={row.aiApproval}/>
              </Typography>
                <RowAction actions={[
                  // { title: 'Classification' },
                  // { title: 'Reports' },
                  {
                    title: 'Reports' ,
                    action:()=>dispatch(openDocumentApproval({
                      type:EDocumentApprovalDlg.topic,
                      docIndex:props.rowIndex,
                      topicIndex:index
                    })),
                  }
                ]} />
            </CustomizedTableRow>
          )
        }):
          null
        }
      </TableBody>
    </Table>
  )
}

export default DocumentSubrow
