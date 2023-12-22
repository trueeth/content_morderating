import * as React from 'react'
import { TopButton } from '@components/common/styled-button'
import { ClickAwayListener, Grow, MenuList, Popper, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { useTranslate } from '../../../locales'

const LanguagePopover = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)


  const { onChangeLang } = useTranslate()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  const handleMenuClose = (
    event: Event | React.SyntheticEvent,
    type: string
  ) => {
    onChangeLang(type)
    handleClose(event)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])
  return (
    <React.Fragment>
      <TopButton
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        main={true}
        sx={{
          padding: 0, minWidth: 0
        }}
      >
        <Box
          component='img'
          src='/assets/images/icon/language.svg'
          sx={{
            width: 24,
            height: 24,
            color:'#3ec0d8'
          }}
        />
      </TopButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper
              sx={{
                marginLeft: 2
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem className='menu-title' onClick={(e) => handleMenuClose(e, 'en')}>

                    <Box
                      component='img'
                      src='/assets/images/icon/flag-gb.svg'
                      sx={{
                        width: 24,
                        height: 24
                      }}
                    />
                    <Typography ml={0.5} className='menu-title'>English</Typography>
                  </MenuItem>
                  <MenuItem className='menu-title' onClick={(e) => handleMenuClose(e, 'ar')}>

                    <Box
                      component='img'
                      src='/assets/images/icon/flag-sa.svg'
                      sx={{
                        width: 24,
                        height: 24
                      }}
                    />
                    <Typography ml={0.5} className='menu-title'>Arabic</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

export default LanguagePopover