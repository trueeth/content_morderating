import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MoreHoriz } from '@mui/icons-material'
import { Box } from '@mui/material'

interface IActionButton {
  title: string
  action?: (param?:any) => void
}

interface IProps {
  actions?: IActionButton[]
  sx?: any
  actionProps?: any
}

export default function RowAction(props: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (callback?: () => void) => () => {
    if (callback) {
      callback()
    }
    setAnchorEl(null)
  }

  return (
    <Box sx={props.sx}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz className={'action-more-horiz'}></MoreHoriz>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {props.actions?.map((val, index) => (
          <MenuItem
            key={index}
            onClick={val?.action ? handleClose(val.action) : handleClose()}
            sx={{
              fontSize: '0.8rem'
            }}
            className='text-capitalize'
          >
            {val.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
