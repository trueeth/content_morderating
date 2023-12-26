import { Box, Typography } from '@mui/material'

export default function DrawerTabOverview() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1.5
      }}
    >
          <Typography>AI Finding</Typography>

          <Typography
            sx={{
              my: 1,
              p: 2,
              border: '1px solid #ccc',
              borderRadius: '10px',
              fontSize: '0.8rem',
              color: '#808080'
            }}
          >
            The period begins with Abdul Aziz bin Muhammad coming to power in
            1203 AH / 1789 AD, leaving him a strong and cohesive state. Then
            Imam Saud bin Abdul Aziz takes power and continues to unify the
            country and expand the state&apos;s influence. After him, Imam
            Abdullah bin Saud assumes power, but he faces difficulties and loses
            to Muhammad Ali Pasha&apos;s campaign to eliminate the state. Events
            then unfold with King Abdul Aziz regaining Riyadh and the continued
            expansion of the second Saudi state. Later, Muhammad bin Abdulaziz
            is appointed Crown Prince and assumes many tasks and
            responsibilities in the government. Mohammed bin Nayef is then
            appointed Crown Prince and Deputy Prime Minister, but he is
            dismissed in 2017 and Mohammed bin Salman is appointed Crown Prince
            and continues to hold multiple positions in the government.
          </Typography>
    </Box>
  )
}
