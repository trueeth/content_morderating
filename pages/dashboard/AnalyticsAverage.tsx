import React, { useState } from 'react'

import { Box, Select, SelectChangeEvent, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import { PrimaryButton } from '../../components/styled/StyledButton'
import { GetApp } from '@mui/icons-material'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const options: ApexOptions = {
  chart: {
    type: 'pie'
  },
  colors: ['#75598d', '#80CAEE'],
  labels: ['Videos', 'Documents'],
  legend: {
    show: true,
    position: 'bottom'
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
    formatter: (val: any) => val + '%',
    textAnchor: 'middle'
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

export default function AnalyticsAverage() {
  const [vState, setState] = useState({ year: '2023', series: [40, 60] })

  const handleSelect = (event: SelectChangeEvent) => {
    if (event.target.value !== null)
      setState({ ...vState, year: event.target.value })
  }

  return (
    <Box className="bg-white border-radius-5 h-full p-15 text-black">
      <Box className="flex justify-between">
        <Typography>Analytics Average</Typography>
        <Select
          value={vState.year}
          onChange={handleSelect}
          sx={{
            height: '30px',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--Primary1)'
            }
          }}
        >
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
        </Select>
      </Box>
      <Box>
        <ReactApexChart options={options} series={vState.series} type="donut" />
        <Box>
          <Box className="flex justify-center mt-15">
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
