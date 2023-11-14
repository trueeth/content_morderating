import React, { useState } from 'react'

import MenuItem from '@mui/material/MenuItem'
import { Select, SelectChangeEvent } from '@mui/material'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const labels = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

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
      // borderRadiusApplication: "end",
      // borderRadiusWhenStacked: "last",
    }
  },
  grid: {
    strokeDashArray: 2
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: labels,
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
  labels,
  datasets: [
    {
      data: labels.map(() => Math.random() * 70),
      backgroundColor: '#313773'
    },
    {
      data: labels.map(() => Math.random() * 70),
      backgroundColor: '#3ec0d8'
    }
  ]
}

export default function () {
  const [vState, setState] = useState({
    year: '2023',
    series: [
      {
        name: 'Videos',
        data: labels.map(() => Math.random() * 70)
      },
      {
        name: 'Documents',
        data: labels.map(() => Math.random() * 70)
      }
    ]
  })

  const handleSelect = (event: SelectChangeEvent) => {
    if (event.target.value !== null)
      setState({ ...vState, year: event.target.value })
  }

  return (
    <div className="bg-white border-radius-5 h-full p-15 text-black">
      <div className="flex row justify-between">
        <div>Analytics of Year</div>
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
          <MenuItem value={2023}>Year 2023</MenuItem>
          <MenuItem value={2022}>Year 2022</MenuItem>
          <MenuItem value={2021}>Year 2021</MenuItem>
        </Select>
      </div>

      <div>
        <ApexCharts
          options={options}
          series={vState.series}
          type="bar"
          height={350}
        />
      </div>

      <div className="flex justify-center">
        <div className="mr-15 flex item-center">
          <span className="flex chart-item-label bg-primary1 mr-3"></span>
          <div>Documents</div>
        </div>

        <div className="mr-15 flex item-center">
          <span className="flex chart-item-label bg-primary2 mr-3"></span>
          <div>Videos</div>
        </div>
      </div>
    </div>
  )
}
