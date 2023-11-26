import { EClassificationType } from '../../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'

const RowClassification = (props: { classifications?: EClassificationType[] }) => {
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
