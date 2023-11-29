import * as React from 'react'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { EClassificationType, EMediaType, EVideoColumn } from '@interfaces/enums'
import { apiGetMediaContents } from '@interfaces/apis/videos'
import { TResVideo } from '@interfaces/apis/videos.types'
import VideoRow from '@sections/videos/videoRow/VideoRow'

const mappingResToRow = (res: TResVideo.getMediaContents) => {
  let rows: TVideoRowType[] = []

  if (res != null) {
    const videoContents = res.Content?.filter(
      (val) => val.MediaType === EMediaType.video
    )
    rows = videoContents?.map((videoContent) => {
      let tempRow: TVideoRowType = {}
      tempRow.name = videoContent.Name
      tempRow.type = videoContent.MediaType
      tempRow.status = videoContent.Videos[0]?.Status
      tempRow.rating = videoContent.Videos[0]?.VideoSummaries[0]?.Rating
      tempRow.classification
      tempRow.submissionDate = videoContent.Videos[0]?.UploadedOnUtc
      tempRow.moderator_approval =
        videoContent.Videos[0]?.VideoSummaries[0]?.ModeratorApprovalStatus
      tempRow.ai_approval =
        videoContent.Videos[0]?.VideoSummaries[0]?.AutomaticApprovalStatus
      tempRow.flaggedScenes =
        videoContent.Videos[0]?.VideoSummaries[0]?.NumberOfFragments

      let classifications: EClassificationType[] = []
      if (
        videoContent.Videos[0]?.VideoSummaries[0]?.SexualSeverity == 'Extreme'
      )
        classifications.push(EClassificationType.sexual)
      if (
        videoContent.Videos[0]?.VideoSummaries[0]?.SelfHarmSeverity == 'Extreme'
      )
        classifications.push(EClassificationType.selfHarm)
      if (videoContent.Videos[0]?.VideoSummaries[0]?.HateServerity == 'Extreme')
        classifications.push(EClassificationType.hate)
      if (
        videoContent.Videos[0]?.VideoSummaries[0]?.ViolenceSeverity == 'Extreme'
      )
        classifications.push(EClassificationType.violance)

      tempRow.classification = classifications

      // TODO I can't map from video scenes to row
      let videoSummeries: TVideoSubRowType[] = []

      tempRow.subRows = videoSummeries
      return tempRow
    })
  }

  rows = rows.sort((a, b) => {
    let x = a.submissionDate.toLowerCase()
    let y = b.submissionDate.toLowerCase()
    if (x < y) {
      return 1
    }
    if (x > y) {
      return -1
    }
    return 0
  })
  return rows
}

export default function VideoTable() {
  const [vState, setState] = useState<{
    mediaContents: TResVideo.getMediaContents
    rows: TVideoRowType[]
  }>({
    mediaContents: {},
    rows: []
  })

  useEffect(() => {
    ;(async () => {
      const tempContents: any = await apiGetMediaContents()
      if (tempContents != undefined) {
        // console.log(tempContents)
        let tempRows = mappingResToRow(tempContents)
        const videoContents = tempContents.Content?.filter(
          (val) => val.MediaType === EMediaType.video
        )
        setState({ ...vState, mediaContents: videoContents, rows: tempRows })
      }
    })()
  }, [])

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '15px', px: 2, boxShadow: 'none' }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          },
          borderSpacing: '0 0.3rem',
          borderCollapse: 'separate'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(EVideoColumn).map((item, index) => (
              <TableCell
                key={index}
                sx={{
                  whiteSpace: 'wrap',
                  fontSize: '12px',
                  color: '#888',
                  maxWidth: '70px'
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vState.rows.map((row, index) => (
            <VideoRow
              key={index}
              row={row}
              videoContent={vState.mediaContents[index]}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
