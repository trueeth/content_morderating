import { EClassificationType } from '@interfaces/index'
import * as React from 'react'
import Box from '@mui/material/Box'

const RowClassification = (props: {
  classifications?: EClassificationType[]
}) => {
  return (
    <React.Fragment>
      {props.classifications.length>0 ?props.classifications.map((item, index) => {
        return (
          <Box key={index} className={'classification-item '}>
            {item}
          </Box>
        )
      }):<Box className={'not-assigned text-7'} >Not Assigned</Box>}
    </React.Fragment>
  )
}

export default RowClassification
