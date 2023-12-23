import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { TVideoSubRowType } from '@interfaces/types'
import { EVideoDetail } from '@interfaces/enums'
import { openMediaSubDrawer } from '@store/reducers/drawer/reducers'
import RowApproval from '@components/multi-media/common/approval-item'
import { useTranslate } from '../../../locales'
import { Box } from '@mui/system'


// Define the table row component outside of the VideoSubtable to prevent unnecessary re-renders

const CustomizedTableRow = ({ children, onClick, keyValue }) => (
  <TableRow key={keyValue}>
    <TableCell onClick={onClick} />
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
    <TableCell onClick={onClick} />
  </TableRow>
)


const VideoSubtable = (props: {
  rows: TVideoSubRowType[],
  rowIndex: number
}) => {

  // const [checked, setChecked] = React.useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslate()

  // Handler, opening of a specific scene's details
  const openScene = ({ rowIndex, subRowIndex }) => () => {
    dispatch(
      openMediaSubDrawer({
        open: true,
        type: 'video',
        rowIndex: rowIndex,
        subRowIndex: subRowIndex
      })
    )
  }

  // Handler of the state of the checkbox
  // const handleChange = (e: any) => {
  //   setChecked(e.target.checked)
  // }


  // Return early if there are no rows to render
  if (!props.rows || props.rows.length === 0) {
    return null
  }

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
          height: '45px',
          padding: '0px !important'
        }
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
              color: '#333',
              fontSize: '.8rem',
              height: '50px'
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
          <TableCell sx={{ width: '7%' }} />
          {Object.values(EVideoDetail).map((item, index) => {
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
          <TableCell sx={{ width: '20%' }} />
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
        {props.rows.map((row, index) => {
            const classificationValues = row.violationType.toLowerCase().split(', ')
            const displayClassification = classificationValues.map((val, index) => {
              if (index === classificationValues.length - 1) return t(`rowClassification.${val}`)
              return (t(`rowClassification.${val}`) + ', ')
            })
            return (
              <CustomizedTableRow key={index} keyValue={index}
                                  onClick={openScene({ rowIndex: props.rowIndex, subRowIndex: index })}>
                {/* <Checkbox /> */}
                <Typography className='text-capitalize'>{`${t('scene')} #${index + 1}`}</Typography>
                <Box className={'flex justify-inherit'}>
                  <RowApproval approval={row.moderatorStatus} />
                </Box>
                <Typography className='text-capitalize'>{displayClassification}</Typography>
                <Typography whiteSpace='nowrap'
                            className='text-capitalize'>{t(`rowApproval.${row.status.toLowerCase()}`)}</Typography>
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
            )
          }
        )}
      </TableBody>
    </Table>
  )
}

export default VideoSubtable
