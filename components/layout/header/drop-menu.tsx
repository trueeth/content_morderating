import * as React from 'react'
import { useRouter } from 'next/router'
import { TopButton } from '@components/common/styled-button'
import SvgColor from '@components/common/svg-color'
import { ClickAwayListener, Grow, MenuList, Popper, SvgIcon, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import { useTranslate } from '../../../locales'

const DropMenu = () => {
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const { t } = useTranslate();
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
    router.push({ pathname: '../' + type.toLowerCase(), query: null })
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
      <TopButton
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        main={true}
        active={
          router.pathname.indexOf(`/videos`)>-1 || router.pathname.indexOf(`/documents`) >-1
        }
      >
        <SvgColor
          src={'/assets/images/icon/slide.svg'}
          sx={{
            width: 20,
            height: 20,
            flexShrink: 0
          }}
        />
        <Typography ml={0.5} className='menu-title text-capitalize'>{t('multimedia')}</Typography>
        <SvgIcon component={ExpandMore} className='ml-5' />
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
                  <MenuItem className='menu-title text-capitalize' onClick={(e) => handleMenuClose(e, 'videos')}>
                    {t('videos')}
                  </MenuItem>
                  <MenuItem className='menu-title text-capitalize' onClick={(e) => handleMenuClose(e, 'documents')}>
                    {t('documents')}
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

export default DropMenu