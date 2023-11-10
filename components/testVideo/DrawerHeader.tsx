import { Box } from '@mui/material'
import RowAction from '../videoTable/videoRows/RowAction'
import { EVideoColumns } from '../../interfaces'

export default function DrawerHeader(){

  return(
    <Box
      sx={{
        display:'flex',
        flexDirection:'column',

      }}
    >
      <header className='flex justify-between'>
        <div>
          Test Video for the project, Scene #5
        </div>
        <RowAction>

        </RowAction>
      </header>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the best ipsum has been the industry's standard printing and typesetting industry.
      </div>
      <Box
        sx={{
          display:'flex',
          flexWrap:'wrap',
        }}
              >
        {Object.values(EVideoColumns).map((item, index)=>{
          return (
            <div key={index} className='flex mr-5'>
              <div>
                {item+":"}
              </div>
              <div>
                {index}
              </div>
            </div>
          )
        })}
      </Box>
    </Box>
  )

}