import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Table,
  tableCellClasses,
  Checkbox,
  Tooltip,
  Select
} from '@mui/material'
import { PrimaryButton } from '@components/common/styled-button'
import SearchInput from '@components/common/search-input'
import InfoIcon from '@mui/icons-material/Info'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import useTablePagination from '@hooks/use-table-pagination'

interface IProps {
  header: {
    title: string
    delete?: {
      visible?: boolean
      action?: () => void
    }
    sort?: {
      group: string[]
      action?: () => void
    }
    leftButton?: {
      visible?: boolean
      title?: string
      icon?: React.JSX.Element
      action?: () => void
    }
  }
  openDialog?: React.JSX.Element
  tableHeader: string[]
  children: React.ReactNode
}

export default function TableActionWrapper(
  props: React.PropsWithChildren<IProps>
) {
  const [vState, setState] = useState({ sortBy: 0, title: '' })
  const { CustomPagination } = useTablePagination()

  const handleLeftButton = () => {
    props.header.leftButton?.action()
  }

  const handleSortByChange = (event: any) => {
    setState({ ...vState, sortBy: event.target.value })
  }

  useEffect(() => {
    setState((prevState) => {
      return { ...prevState, title: props.header.title }
    })
  }, [props.header])

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 0px 25px 0px #F3F3F3;',
        borderRadius: '.4rem',
        border: '1px solid var(--Stroke, #E8E8E8)',
        overflow: 'hidden',
        mt: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          color: 'black',
          backgroundColor: '#00000008'
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 3,
            '& .MuiGrid-item': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          <Grid item>
            <Typography>{vState.title}</Typography>
            <Tooltip title="Reports History">
              <InfoIcon sx={{ color: 'grey', width: '16px', ml: 1, mt: -1 }} />
            </Tooltip>
            <Button
              sx={{
                ml: 2,
                bgcolor: '#ff1313a0',
                opacity: '0.6',
                color: 'white',
                '&:hover': { bgcolor: '#ff1313a0', opacity: '0.6' }
              }}
            >
              Delete
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              flexGrow: 1,
              justifyContent: { md: 'end', xs: 'left' },
              display: 'flex',
              flexWrap: 'wrap',
              flexDiretion: {
                xs: 'column'
              }
            }}
          >
            <Grid item sx={{ display: 'flex' }}>
              <Typography whiteSpace="nowrap" mr={1}>
                Sort by:
              </Typography>
              <Select
                value={vState.sortBy}
                onChange={handleSortByChange}
                sx={{
                  height: '36px',
                  width: '6rem',
                  mr: 2,
                  fontSize: '.8rem'
                }}
              >
                {props.header.sort?.group?.map((val, index) => (
                  <MenuItem
                    value={index}
                    key={index}
                    sx={{
                      fontSize: '0.8rem'
                    }}
                  >
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                paddingTop: {
                  sm: 0,
                  xs: 2
                }
              }}
            >
              <SearchInput />
            </Grid>
          </Grid>
          {props.header.leftButton?.visible === false ? null : (
            <Grid item>
              <PrimaryButton
                onClick={handleLeftButton}
                sx={{
                  whiteSpace: 'nowrap'
                }}
              >
                {props.header.leftButton?.icon}
                <Typography fontSize="14px">
                  {props.header.leftButton?.title}
                </Typography>
              </PrimaryButton>
              {props.openDialog}
            </Grid>
          )}
        </Grid>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '15px',
          px: 2,
          width: '100%',
          boxShadow: 'none',
          '& .MuiTableCell-root': {
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }
        }}
      >
        <Table
          aria-label="collapsible table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none'
            }
          }}
        >
          <TableHead>
            <TableRow>
              {props?.tableHeader.map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#888' }}
                >
                  <Checkbox
                    color="primary"
                    sx={{
                      display: index !== 0 ? 'none' : 'inline'
                    }}
                  />
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{props.children}</TableBody>
        </Table>
      </TableContainer>
      <CustomPagination />
    </Box>
  )
}
