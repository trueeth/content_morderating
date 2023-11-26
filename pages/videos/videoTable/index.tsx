import * as React from 'react'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  EClassificationType,
  EMediaType,
  EModeratorApprovalStatus,
  EProcessingStatus,
  ERating,
  EVideoData,
  TVideoRowType, TVideoSubRowType
} from '../../../interfaces'
import VideoRow from './videoRow/VideoRow'
import { apiGetMediaContents, TResVideo } from '../../../interfaces/apis/videos'
import { AxiosResponse } from 'axios'

const rows: TVideoRowType[] = [
  {
    name: 'Content Moderation System UI/UX Design',
    type: EMediaType.video,
    status: EProcessingStatus.new,
    rating: ERating.r18,
    classification: [EClassificationType.hate, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.rejected,
    flaggedScenes: 40,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'SAW X Video for the design',
    type: EMediaType.video,
    status: EProcessingStatus.failed,
    rating: ERating.r18,
    classification: [EClassificationType.hate, EClassificationType.selfHarm, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.new,
    flaggedScenes: 80,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Test Video for the project',
    type: EMediaType.video,
    status: EProcessingStatus.failed,
    rating: ERating.missing,
    classification: [EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.inReview,
    flaggedScenes: 120,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Test Video for the project',
    type: EMediaType.video,
    status: EProcessingStatus.failed,
    rating: ERating.missing,
    classification: [EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.new ,
    flaggedScenes: 80,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'SAW X Video',
    type: EMediaType.video,
    status: EProcessingStatus.new,
    rating: ERating.missing,
    classification: [EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.rejected,
    flaggedScenes: 80,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EMediaType.video,
    status: EProcessingStatus.new,
    rating: ERating.r18,
    classification: [EClassificationType.selfHarm, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.approved,
    flaggedScenes: 120,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'SAW X Video',
    type: EMediaType.video,
    status: EProcessingStatus.new,
    rating: ERating.r18,
    classification: [EClassificationType.selfHarm, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.approved,
    flaggedScenes: 30,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EMediaType.video,
    status: EProcessingStatus.processed,
    rating: ERating.r18,
    classification: [EClassificationType.selfHarm, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.rejected,
    flaggedScenes: 170,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EMediaType.video,
    status: EProcessingStatus.processed,
    rating: ERating.r18,
    classification: [EClassificationType.hate, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.rejected,
    flaggedScenes: 170,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Test Video for the project',
    type: EMediaType.video,
    status: EProcessingStatus.processed,
    rating: ERating.r18,
    classification: [EClassificationType.hate],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.inReview,
    flaggedScenes: 120,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'SAW X Video for the design',
    type: EMediaType.video,
    status: EProcessingStatus.new,
    rating: ERating.missing,
    classification: [EClassificationType.hate],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.inReview,
    flaggedScenes: 120,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EMediaType.video,
    status: EProcessingStatus.new,
    rating: ERating.missing,
    classification: [EClassificationType.hate],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.approved,
    flaggedScenes: 60,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Test Video for the project',
    type: EMediaType.video,
    status: EProcessingStatus.failed,
    rating: ERating.missing,
    classification: [EClassificationType.hate],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.approved,
    flaggedScenes: 80,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  },
  {
    name: 'Content Moderation System UI/UX Design',
    type: EMediaType.video,
    status: EProcessingStatus.failed,
    rating: ERating.r18,
    classification: [EClassificationType.hate, EClassificationType.sexual],
    submissionDate: 'Sep, 26, 2023 07:55PM',
    approval: EModeratorApprovalStatus.new,
    flaggedScenes: 120,
    subRows: [
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 2,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'Here is simply dummy text of the printing and typesetting industry. here is simply dummy text best Ipsum has been the industry\'s standard'
      },
      {
        sceneNumber: 1,
        violationType: 'Nudity',
        category: 'Content Video',
        description:
          'This simply dummy text best Ipsum has been the industry\'s standard'
      }
    ]
  }
]

const mappingResToRow = (res:TResVideo.getMediaContents) => {

  let rows:TVideoRowType[]=[]
    console.log(res)

  if (res!=null){
    const videoContents=res.Content?.filter(val=>val.MediaType===EMediaType.video)
    rows=videoContents?.map((videoContent)=>{
      let tempRow:TVideoRowType={}
      tempRow.name=videoContent.Name
      tempRow.type=videoContent.MediaType
      tempRow.status=videoContent.Videos[0]?.Status
      tempRow.rating=videoContent.Videos[0]?.VideoSummaries[0]?.Rating
      tempRow.classification
      tempRow.submissionDate=videoContent.Videos[0]?.UploadedOnUtc
      tempRow.approval=videoContent.Videos[0]?.VideoSummaries[0]?.ModeratorApprovalStatus
      tempRow.flaggedScenes=videoContent.Videos[0]?.VideoSummaries[0]?.NumberOfFragments

      let classifications:EClassificationType[]=[]
      if (videoContent.Videos[0]?.VideoSummaries[0]?.SexualSeverity=="Extreme")
        classifications.push(EClassificationType.sexual)
      if (videoContent.Videos[0]?.VideoSummaries[0]?.SelfHarmSeverity=="Extreme")
        classifications.push(EClassificationType.selfHarm)
      if (videoContent.Videos[0]?.VideoSummaries[0]?.HateServerity=="Extreme")
        classifications.push(EClassificationType.hate)
      if (videoContent.Videos[0]?.VideoSummaries[0]?.ViolenceSeverity=="Extreme")
        classifications.push(EClassificationType.violance)

      tempRow.classification=classifications

      // TODO I can't map from video scenes to row
      let videoSummeries:TVideoSubRowType[]=[]

      tempRow.subRows=videoSummeries
      return tempRow
    })
  }
  return rows
}

export default function VideoTable() {

  const [vState, setState] = useState<{ mediaContents: TResVideo.getMediaContents, rows:TVideoRowType[] }>({
    mediaContents: {},rows:[]
  })

  useEffect(() => {
    (async ()=>{
      const tempContents:TResVideo.getMediaContents = await apiGetMediaContents()
      if (tempContents!=undefined){
        // console.log(tempContents)
        let tempRows=mappingResToRow(tempContents)
        setState({...vState,mediaContents:tempContents, rows:tempRows})
      }
    })()
  }, [])


  return (
    <TableContainer component={Paper} sx={{ borderRadius: '15px', px: 2, boxShadow: 'none' }}>
      <Table
        aria-label='collapsible table'
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          },
          borderSpacing: 0
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.values(EVideoData).map((item, index) => (
              <TableCell
                key={index}
                sx={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#888' }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vState.rows.map((row, index) => (
            <VideoRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
