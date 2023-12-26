import React, { Suspense, useState } from 'react'

import {
  Box,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { PrimaryButton } from '@components/common/styled-button'
import { ExpandMoreOutlined, GetApp } from '@mui/icons-material'
import { Months } from '@interfaces/constant'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const options: ApexOptions = {
  chart: {
    type: 'pie'
  },
  colors: ['#75598d', '#80CAEE'],
  labels: ['Videos', 'Documents'],
  legend: {
    show: true,
    position: 'right',
    offsetY: 60,
    markers: {
      radius: 0,
      offsetX: -10,
      offsetY: 2
    }
  },

  plotOptions: {
    pie: {
      donut: {
        size: '0%',
        background: 'transparent'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -50,
    formatter: (val: any) => val + '%'
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380
        }
      }
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200
        }
      }
    }
  ]
}

export default function SideAverage() {
  const [vState, setState] = useState({ month: 'JAN', series: [40, 60] })

  const handleSelect = (event: SelectChangeEvent) => {
    if (event.target.value !== null)
      setState({ ...vState, month: event.target.value })
  }

  const isMobile = useMediaQuery('(max-width: 1200px)')

  return (
    <Box className='bg-white border-radius-5 h-full p-15 text-black'>
      <Box className='flex justify-between'>
        <Typography>Analytics Average</Typography>
        <Select
          value={vState.month}
          onChange={handleSelect}
          sx={{
            height: '30px',
            width: '80px',
            fontSize: '0.75rem',
            backgroundColor: '#F9F9FF',
            '& div': {
              color: '#474747'
            },
            '& fieldset': {
              border: 'none'
            }
          }}
          IconComponent={ExpandMoreOutlined}
          MenuProps={{ sx: { height: '300px', fontSize: '0.75rem' } }}
        >
          {Months.map((item, index) => (
            <MenuItem
              value={item}
              key={index}
              sx={{
                color: '#474747',
                fontSize: '0.75rem'
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90%'
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ReactApexChart
            options={
              isMobile
                ? { ...options, legend: { position: 'bottom', show: true } }
                : options
            }
            series={vState.series}
            type='donut'
          />
        </Suspense>
        <Box>
          <Box className='flex justify-center mt-15'>
            <PrimaryButton>
              <GetApp sx={{ color: 'white' }} />
              &nbsp;&nbsp;Download Report
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
