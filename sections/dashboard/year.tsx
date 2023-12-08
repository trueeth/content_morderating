import React, { Suspense, useState } from 'react'

import MenuItem from '@mui/material/MenuItem'
import { Box, Select, SelectChangeEvent, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { Months } from '@interfaces/constant'
import { ExpandMoreOutlined } from '@mui/icons-material'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const options: ApexOptions = {
  colors: ['#75598d', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    stacked: false,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 3,
            columnWidth: '25%'
          }
        }
      }
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 3,
      columnWidth: '25%'
    }
  },
  grid: {
    strokeDashArray: 2
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: Months,
    labels: {
      show: true,
      style: {
        fontSize: '.7rem'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    min: 0,
    max: 70,
    tickAmount: 7,
    labels: {
      formatter: (value: any) => String(Math.round(value))
    }
  },
  legend: {
    show: false
  },
  fill: {
    opacity: 1
  }
}

export const data = {
  labels: Months,
  datasets: [
    {
      data: Months.map(() => Math.random() * 70),
      backgroundColor: '#313773'
    },
    {
      data: Months.map(() => Math.random() * 70),
      backgroundColor: '#3ec0d8'
    }
  ]
}

export default function SideYear() {
  const [vState, setState] = useState({
    year: '2023',
    series: [
      {
        name: 'Videos',
        data: Months.map(() => Math.random() * 70)
      },
      {
        name: 'Documents',
        data: Months.map(() => Math.random() * 70)
      }
    ]
  })

  const handleSelect = (event: SelectChangeEvent) => {
    if (event.target.value !== null)
      setState({ ...vState, year: event.target.value })
  }

  return (
    <Box className='bg-white border-radius-5 h-full p-15 text-black'>
      <Box className='flex row justify-between'>
        <Typography>Analytics of Year</Typography>
        <Select
          value={vState.year}
          onChange={handleSelect}
          sx={{
            height: '30px',
            width: '110px',
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
          <MenuItem
            sx={{
              fontSize: '0.75rem'
            }}
            value={2023}
          >
            Year 2023
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: '0.75rem'
            }}
            value={2022}
          >
            Year 2022
          </MenuItem>
          <MenuItem
            sx={{
              fontSize: '0.75rem'
            }}
            value={2021}
          >
            Year 2021
          </MenuItem>
        </Select>
      </Box>

      <Box>
        <Suspense fallback={<div>Loading...</div>}>
          <ApexCharts
            options={options}
            series={vState.series}
            type='bar'
            height={350}
          />
        </Suspense>
      </Box>

      <Box className='flex justify-center'>
        <Box className='mr-15 flex item-center'>
          <Box className='flex chart-item-label bg-primary1 mr-3'></Box>
          <Typography>Documents</Typography>
        </Box>

        <Box className='mr-15 flex item-center'>
          <Box className='flex chart-item-label bg-primary2 mr-3'></Box>
          <Typography>Videos</Typography>
        </Box>
      </Box>
    </Box>
  )
}
