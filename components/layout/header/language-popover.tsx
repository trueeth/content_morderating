import * as React from 'react'
import { ClickAwayListener, Grow, MenuList, Popper, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import { useLocales, useTranslate } from '../../../locales'
import IconButton from '@mui/material/IconButton'
import { setLang } from '@store/reducers/setting/reducers'
import { useDispatch } from 'react-redux'

const LanguagePopover = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)


  const { onChangeLang } = useTranslate()
  const { currentLang } = useLocales()
  const dispatch=useDispatch()

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
    dispatch(setLang(type))
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

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <React.Fragment>
      <Box
        sx={{
          display:"flex"
        }}
      >
        <IconButton
          ref={anchorRef}
          onClick={handleToggle}
        >
          <Box
            component='span'
            className='svg-color'
            sx={{
              width: 24,
              height: 24,
              display: 'inline-block',
              bgcolor: 'currentColor',
              mask: `url(/assets/images/icon/language.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/images/icon/language.svg) no-repeat center / contain`,
              color: open ? '#3ec0d8' : 'white',
              '&:hover': {
                color: '#3ec0d8'
              }
            }}
          />
        </IconButton>
      </Box>
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
                  <MenuItem
                    className='menu-title'
                    onClick={(e) => handleMenuClose(e, 'en')}
                  >

                    <Box
                      component='img'
                      src='/assets/images/icon/flag-gb.svg'
                      sx={{
                        width: 24,
                        height: 24
                      }}
                    />
                    <Typography
                      ml={0.5}
                      mr={0.5}
                      className='menu-title'
                      sx={{
                        color:currentLang.value=='en'?'#75598d':'inherit'
                      }}
                    >
                      English
                    </Typography>
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
                    <Typography
                      ml={0.5}
                      mr={0.5}
                      className='menu-title'
                      sx={{
                        color:currentLang.value=='ar'?'#75598d':'inherit'
                      }}
                    >
                      Arabic
                    </Typography>
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