import { Box, Typography } from '@mui/material'
import RowAction from '@components/multi-media/rows/RowAction'
import { useSelector } from 'react-redux'
import { IAppSlice } from '@store/reducers'
import { IReduxState } from '@store/index'
import { format, parseISO } from 'date-fns'

export default function DrawerHeader() {
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}
    >
      <header className="flex justify-between">
        {appState.drawer.type === 'video' ? (
          <>
            <Typography>
              Video for the{' '}
              <strong>{appState.drawer.videoContent?.name}</strong>, Page #
              {appState.drawer.summary?.IndexerSceneId}
            </Typography>
          </>
        ) : (
          <>
            <Typography>
              <strong>{appState.drawer.videoContent?.name}</strong> Book, Page #
              3
            </Typography>
          </>
        )}
      </header>
      {appState.drawer.type === 'video' ? (
        <>
          <Typography>
            Later, Muhammad bin Abdulaziz is appointed Crown Prince and assumes
            many tasks and responsibilities in the government. Mohammed bin
            Nayef is then appointed Crown Prince and Deputy Prime Minister, but
            he is dismissed in 2017 and Mohammed bin Salman
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              '& .MuiBox-root': {
                display: 'flex',
                alignItems: 'center',
                '& .MuiTypography-root:first-of-type': {
                  color: 'grey',
                  fontSize: '14px'
                }
              }
            }}
          >
            <Box>
              <Typography>STATUS : &nbsp;</Typography>
              <Typography color="var(--Secondary)"> NEW</Typography>
            </Box>
            <Box>
              <Typography>RATING : &nbsp;</Typography>
              <Typography> {appState.drawer.videoContent?.rating}</Typography>
            </Box>
            <Box>
              <Typography>CLASSIFICATION : &nbsp; </Typography>
              <Typography>
                {appState.drawer.videoContent?.classification?.join(',')}
              </Typography>
            </Box>
            <Box>
              <Typography>SUBMISSION DATE : &nbsp;</Typography>
              <Typography>
                {appState.drawer.videoContent != null
                  ? format(
                      parseISO(appState.drawer.videoContent?.submissionDate),
                      'MM/dd/yyyy hh:mm:ss a'
                    )
                  : ''}
              </Typography>
            </Box>
            <Box>
              <Typography>APPROVAL : &nbsp; </Typography>
              <Typography className="approve"> Approved</Typography>
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  )
}
