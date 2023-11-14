
import React, { useState } from 'react'

import { Select, SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const options: ApexOptions = {
  chart: {
    type: "pie",
  },
  colors: ["#75598d", "#80CAEE"],
  labels: ["Remote", "Hybrid" ],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "0%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};




export default function() {

  const [vState, setState]=useState({ year:'2023', series:[40,60] })

  const handleSelect = (event:SelectChangeEvent) => {
    if (event.target.value!==null)
    setState({...vState, year: event.target.value})
  }

  return(
    <div className='bg-white border-radius-5'>
      <Select
        value={vState.year}
        onChange={handleSelect}
        fullWidth
        sx={{
          height: '40px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--Primary1)',
          },
        }}
      >
        <MenuItem value={2023}>2023</MenuItem>
        <MenuItem value={2022}>2022</MenuItem>
        <MenuItem value={2021}>2021</MenuItem>
      </Select>
      <div>
        <ReactApexChart
          options={options}
          series={vState.series}
          type="donut"
        />
      </div>
    </div>
  )
}
