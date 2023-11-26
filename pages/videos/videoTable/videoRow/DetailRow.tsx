import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import * as React from 'react'
import { Checkbox, Typography } from '@mui/material'
import { EVideoDetail, TVideoSubRowType } from '../../../../interfaces'
import { useDispatch } from 'react-redux'
import { openVideoSubDrawer } from '../../../../store/reducers/drawer.reducers'
import Button from '@mui/material/Button'
import { MoreHoriz } from '@mui/icons-material'

const VideoSubTable = (props: { value: TVideoSubRowType[] }) => {
  const [checked, setChecked] = React.useState(false)

  const dispatch = useDispatch()
  const openScene = () => {
    dispatch(openVideoSubDrawer({ open: true }))
  }
  const handleChange = (e: any) => {
    setChecked(e.target.checked)
  }

  const rows = props.value

  if (rows === undefined || rows?.length === 0) {
    return null
  }

  const CustomizedTableRow = ({ children, onClick, key }) => (
    <TableRow key={key}>
      {children.map((item, idx) => {
        if (idx > 0 && idx < 5) {
          return <TableCell onClick={onClick}>{item}</TableCell>
        }
        return <TableCell>{item}</TableCell>
      })}
    </TableRow>
  )

  return (
    <Table
      size="small"
      sx={{
        cursor: 'pointer',
        '& .MuiTableCell-root': {
          border: '#fff !important'
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
      <TableBody>
        {rows.map((row, index) => {
          return (
            <CustomizedTableRow key={index} onClick={openScene}>
              <Checkbox />
              <Typography>{'Scene #' + row.sceneNumber}</Typography>
              <Typography>{'Video'}</Typography>
              <Typography>{row.category}</Typography>
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

export default VideoSubTable
