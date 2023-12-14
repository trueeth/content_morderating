import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';
import { TVideoSubRowType } from '@interfaces/types';
import { EVideoDetail } from '@interfaces/enums';
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers';


  // Define the table row component outside of the VideoSubtable to prevent unnecessary re-renders

  const CustomizedTableRow = ({ children, onClick, keyValue }) => (
    <TableRow key={keyValue}>
      <TableCell />
      {children.map((item, idx) => {
        if (idx >= 0 && idx < 5) {
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


const VideoSubtable = (props: {
  rows: TVideoSubRowType[],
  rowIndex:number
}) => {

  const [checked, setChecked] = React.useState(false)
  const dispatch = useDispatch()

  // Handler, opening of a specific scene's details
  const openScene = ({rowIndex, subRowIndex}) => () => {
    dispatch(
      openMediaSubDrawer({
        open: true,
        type: 'video',
        rowIndex:rowIndex,
        subRowIndex:subRowIndex,
      })
    )
  }

  // Handler of the state of the checkbox
  const handleChange = (e: any) => {
    setChecked(e.target.checked)
  }


  // Return early if there are no rows to render
  if (!props.rows || props.rows.length === 0) {
    return null;
  }

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
          {/* <TableCell>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell> */}
          <TableCell sx={{width:'10%'}} />
          {Object.values(EVideoDetail).map((item, index) => {
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
        {props.rows.map((row, index) => (
          <CustomizedTableRow key={index} keyValue={index} onClick={openScene({rowIndex:props.rowIndex, subRowIndex:index})}>
            {/* <Checkbox /> */}
            <Typography>{`Scene #${index + 1}`}</Typography>
            <Typography>{row.violationType}</Typography>
            <Typography whiteSpace="nowrap">{row.status}</Typography>
            {/* <Typography>{row.description}</Typography> */}
            {/* <Button
              id={`scene-button-${index}`}
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={false}
            > */}
              {/*<MoreHoriz className={'action-more-horiz'} />*/}
              {/* -
            </Button> */}
          </CustomizedTableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default VideoSubtable
