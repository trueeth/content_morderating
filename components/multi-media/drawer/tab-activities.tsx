import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import { Slideshow } from '@mui/icons-material'
import { DrawerHistories } from '@interfaces/apis/_mock'
import { useTranslate } from '../../../locales'


interface IHistoryRow {
  writerName: string
  writeDate: string
  description: string
}

const HistoryDescription = styled('div')({
  backgroundColor: '#eee',
  padding: '7px 14px',
  borderRadius: '5px',
  fontSize: '0.7rem'
})


const HistoryRow = (props: IHistoryRow) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #E8E8E8'
      }}
    >
      <IconButton
        sx={{
          p: 1,
          backgroundColor: '#eee',
          mr: 2,
          color: '#75598D',
          ':hover': {
            backgroundColor: '#eee'
          }
        }}
      >
        <Slideshow fontSize={'small'} />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: '14px', color: '#1A2057', fontWeight: 600 }}
          >
            {props.writerName}
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#888' }}>
            {props.writeDate}
          </Typography>
        </Box>

        <HistoryDescription>{props.description}</HistoryDescription>
      </Box>
    </Box>
  )
}

export default function DrawerTabActivities() {

  const { t } = useTranslate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}
    >
      <Box
        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center'
        }}>
        <Typography ml={3} sx={{ textAlign: 'center', marginLeft: '0' }}>{t(`drawer.History`)}</Typography>
        <Box>
          {DrawerHistories.length > 0 ?
            DrawerHistories.map((item, index) => (
              <HistoryRow
                key={index}
                writerName={item.writerName}
                writeDate={item.writeDate}
                description={item.description}
              />
            )) :
            <Typography sx={{ textAlign: 'center', paddingTop: '2rem' }}>{t('drawer.No History yet')}</Typography>
          }
        </Box>
      </Box>
    </Box>
  )
}
