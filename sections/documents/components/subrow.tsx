import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import * as React from 'react'
import { Checkbox, Typography } from '@mui/material'
import { TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { EVideoDetail } from '@interfaces/enums'
import { useDispatch } from 'react-redux'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import Button from '@mui/material/Button'
import { MoreHoriz } from '@mui/icons-material'

const DocumentSubrow = (props: {
  subRows: TVideoSubRowType[]
  row: TVideoRowType
}) => {
  const [checked, setChecked] = React.useState(false)

  const dispatch = useDispatch()

  const openScene = (index)=>() => {
    dispatch(
      openMediaSubDrawer({ open: true, row: props.row, type: 'document', pageIndex:index })
    )
  }

  const handleChange = (e: any) => {
    setChecked(e.target.checked)
  }

  const { subRows } = props

  if (subRows === undefined || subRows?.length === 0) {
    return null
  }

  const CustomizedTableRow = ({ children, onClick, key }) => (
    <TableRow key={key}>
      {children.map((item, idx) => {
        if (idx > 0 && idx < 5) {
          return (
            <TableCell onClick={onClick} key={idx}>
              {item}
            </TableCell>
          )
        }
        return <TableCell key={idx}>{item}</TableCell>
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
          maxWidth: '400px'
        }
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
              color: '#333',
              fontSize: '12px'
            }
          }}
        >
          <TableCell>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
          {Object.values(EVideoDetail).map((item, index) => {
            return (
              <TableCell key={index}>
                <Typography sx={{ fontSize: '13px', color: '#888' }}>
                  {item}
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody
        sx={{
          '& .MuiTypography-root': { color: '#555 !important' }
        }}
      >
        {subRows.map((row, index) => {
          return (
            <CustomizedTableRow key={index} onClick={openScene(index)}>
              <Checkbox />
              <Typography>{'Page #' + (index + 1)}</Typography>
              <Typography>{row.violationType}</Typography>
              <Typography whiteSpace="nowrap">{row.category}</Typography>
              <Typography>{row.description}</Typography>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <MoreHoriz className={'action-more-horiz'}></MoreHoriz>
              </Button>
            </CustomizedTableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default DocumentSubrow
