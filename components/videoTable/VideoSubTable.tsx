import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import * as React from 'react'
import { Checkbox } from '@mui/material'
import { EVideoSubColumns, TVideoSubRowType } from '../../interfaces'

const VideoSubTable=(props:{value:TVideoSubRowType[]})=>{
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const rows=props.value;
  if ((rows===undefined)||(rows?.length===0)){
    return null
  }
  return(
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
          {Object.values(EVideoSubColumns).map((item,index)=>{
            return(
              <TableCell key={index}>{item}</TableCell>
            )
          })}

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row,index)=>{
          return (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell>
                {'Scene #'+row.sceneNumber}
              </TableCell>
              <TableCell>
                {row.violationType}
              </TableCell>
              <TableCell>
                {row.category}
              </TableCell>
              <TableCell>
                {row.description}
              </TableCell>
            </TableRow>
          )
        })}
        {/*{row.subRows.map((historyRow) => (*/}
        {/*  <TableRow key={historyRow.date}>*/}
        {/*    <TableCell component="th" scope="row">*/}
        {/*      {historyRow.date}*/}
        {/*    </TableCell>*/}
        {/*    <TableCell>{historyRow.customerId}</TableCell>*/}
        {/*    <TableCell align="right">{historyRow.amount}</TableCell>*/}
        {/*    <TableCell align="right">*/}
        {/*      {Math.round(historyRow.amount * row.price * 100) / 100}*/}
        {/*    </TableCell>*/}
        {/*  </TableRow>*/}
        {/*))}*/}
      </TableBody>
    </Table>
  )
}

export default VideoSubTable