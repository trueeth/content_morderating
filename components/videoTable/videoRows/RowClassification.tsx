import { EClassification } from '../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'

const RowClassification = (props: { classifications?: EClassification[] }) => {
  return (
    <React.Fragment>
      {props.classifications.map((item, index) => {
        return (
          <Box key={index} className={'classification-item'}>
            {item}
          </Box>
        )
      })}
    </React.Fragment>
  )
}

export default RowClassification
