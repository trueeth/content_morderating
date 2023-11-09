import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { StyledTextField } from 'components/styled/CustomTextField'
import { OrderType } from 'interfaces'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { IActionSlice } from 'store/slices/action'
import { IReduxState } from 'store/store'
import { trim } from 'utils/trim'

const LoanDetail = ({ orderType }: { orderType: OrderType }) => {
  const actionState = useSelector<IReduxState, IActionSlice>(
    (state) => state.action
  )
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [fee, setFee] = useState(actionState.supply.lenderFee)

  const anchorRef = useRef<HTMLImageElement>(null)

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

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <Box
      sx={{
        '& .MuiBox-root': {
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '& .MuiTypography-root': {
          fontSize: '15px',
        },
      }}
    >
      <Box>
        <Typography>Loan Amount</Typography>
        <Typography>0</Typography>
      </Box>
      <Box>
        <Typography>Collateral Amount</Typography>
        <Typography>0</Typography>
      </Box>

      <Box>
        <Typography>Lender Fee</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{actionState.supply.lenderFee} % </Typography>
          <Image
            src="https://twopaws.app/static/media/edit.91a05fa3ed28fcfa16476bf11192ea45.svg"
            alt="edit"
            width={20}
            height={20}
            style={{
              marginTop: '-3px',
              cursor: 'pointer',
              margin: '3px',
            }}
            ref={anchorRef}
            onClick={handleToggle}
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="top-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper
                  sx={{ bgcolor: '#1f304a', border: '1px solid #666' }}
                  elevation={0}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1,
                        px: 2,
                      }}
                    >
                      <StyledTextField
                        type="number"
                        defaultValue={actionState.supply.lenderFee}
                        onChange={(e) => {
                          let val = Number(e.target.value)
                          if (val >= 0 && val <= 30) {
                            setFee(val)
                          }
                        }}
                      />
                      <Button
                        sx={{ height: '30px' }}
                        onClick={(e) => {
                          handleClose(e)
                        }}
                      >
                        O K
                      </Button>
                    </Box>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Box>
      <Box>
        <Typography>You will Get</Typography>
        <Typography>0</Typography>
      </Box>
    </Box>
  )
}
export default LoanDetail
