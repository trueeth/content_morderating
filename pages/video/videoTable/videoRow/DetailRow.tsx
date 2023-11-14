import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import * as React from 'react'
import { Checkbox } from '@mui/material'
import { EVideoDetail, TVideoSubRowType } from '../../../../interfaces'
import RowAction from './RowAction'
import { useDispatch } from 'react-redux'
import { openVideoSubDrawer } from '../../../../store/reducers/drawer.reducers'

const VideoSubTable = (props: { value: TVideoSubRowType[] }) => {
  const [checked, setChecked] = React.useState(false)

  const dispatch = useDispatch()
  const handleDetail = () => {
    dispatch(openVideoSubDrawer({ open: true }))
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const rows = props.value

  if (rows === undefined || rows?.length === 0) {
    return null
  }

  return (
    <Table
      size="small"
      sx={{
        cursor: 'pointer',
      }}
      onClick={handleDetail}
    >
      <TableHead>
        <TableRow
          sx={{
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
              color: '#333',
              fontSize: '12px',
            },
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
            return <TableCell key={index}>{item}</TableCell>
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell>{'Scene #' + row.sceneNumber}</TableCell>
              <TableCell>{row.violationType}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <RowAction></RowAction>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default VideoSubTable
