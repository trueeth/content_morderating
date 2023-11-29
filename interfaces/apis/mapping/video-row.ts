import { TResVideo } from '@interfaces/apis/videos.types'
import { TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { EClassificationType, EMediaType } from '@interfaces/enums'

const mappingResToVideoRow = (res: TResVideo.getMediaContents) => {

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

export default mappingResToVideoRow
