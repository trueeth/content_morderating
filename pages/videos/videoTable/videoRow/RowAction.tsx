import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MoreHoriz } from '@mui/icons-material'
import { Box } from '@mui/material'

export default function RowAction() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
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
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose} sx={{
          fontSize:'0.8rem'
        }}>Classifications</MenuItem>
        <MenuItem onClick={handleClose} sx={{
          fontSize:'0.8rem'
        }}>Report</MenuItem>
        <MenuItem onClick={handleClose} sx={{
          fontSize:'0.8rem'
        }}>Insights</MenuItem>
      </Menu>
    </Box>
  )
}
