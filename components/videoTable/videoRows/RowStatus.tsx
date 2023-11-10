import { EStatus } from '../../../interfaces'
import * as React from 'react'
import Box from '@mui/material/Box'



const RowStatus=(props: { status:number })=>{
  if(props.status===EStatus.new){
    return(
      <React.Fragment>
        <Box className={'status-new'}>
          new
        </Box>
      </React.Fragment>
    )
  } else if(props.status===EStatus.failed){
    return(
      <React.Fragment>
        <Box className={'status-failed'}>
          failed
        </Box>
      </React.Fragment>
    )
  } else if(props.status===EStatus.processed){
    return(
      <React.Fragment>
        <Box className={'status-processed'}>
          processed
        </Box>
      </React.Fragment>
    )
  }
}

export  default RowStatus