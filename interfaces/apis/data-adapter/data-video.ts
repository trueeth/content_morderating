import { TResVideo } from '@interfaces/apis/api.types'
import { EClassificationType, EMediaType, ESeverity } from '@interfaces/enums'
import { TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { format, parseISO } from 'date-fns'

export const resToVideoRowAdapter = (resData:any) => {

  let apiData = resData as TResVideo.TVideoContent[]

  let result: TVideoRowType[] = []
  if (apiData.length > 0) {

    result = apiData.map(videoContent => {
      let videoRow: TVideoRowType = {}

      videoRow.name = videoContent.Name
      videoRow.type = EMediaType.video
      videoRow.status = videoContent.Status
      videoRow.rating = videoContent.VideoSummary?.Rating

      videoRow.submissionDate = ''
      if (videoContent.UploadedOnUtc != null && videoContent.UploadedOnUtc != '')
        videoRow.submissionDate = format(parseISO(videoContent.UploadedOnUtc), 'MMM, dd,  yyyy hh:mm a')

      videoRow.moderator_approval = videoContent.ModeratorApprovalStatus
      if (!!videoContent?.VideoSummary?.ModeratorApprovalStatus)
      videoRow.moderator_approval = videoContent?.VideoSummary?.ModeratorApprovalStatus

      if (!!videoContent.VideoSummary?.AutomaticApprovalStatus)
        videoRow.ai_approval = videoContent.VideoSummary.AutomaticApprovalStatus
      videoRow.flaggedScenes = videoContent.VideoSummary?.NumberOfFragments


      let classifications: EClassificationType[] = []
      let classificationsString: string[] = []
      if (videoContent.VideoSummary?.SexualSeverity == 'Extreme') {
        classifications.push(EClassificationType.sexual)
        classificationsString.push('sexual')
      }
      if (videoContent.VideoSummary?.SelfHarmSeverity == 'Extreme') {
        classifications.push(EClassificationType.selfHarm)
        classificationsString.push('self-harm')
      }
      if (videoContent.VideoSummary?.HateSeverity == 'Extreme') {
        classifications.push(EClassificationType.hate)
        classificationsString.push('hate')
      }
      if (videoContent.VideoSummary?.ViolenceSeverity == 'Extreme') {
          classifications.push(EClassificationType.violance)
        classificationsString.push('violence')
      }

      let videoSubRows: TVideoSubRowType[] = []

      if (videoContent.VideoSummary?.SceneSummaries.length > 0) {
        videoSubRows = videoContent.VideoSummary?.SceneSummaries.map((sceneSummary, index) => {
          let videoSubRow: TVideoSubRowType = {}

          videoSubRow.status = sceneSummary.AutomaticApprovalStatus
          videoSubRow.description = videoContent.Description
          videoSubRow.moderatorStatus=sceneSummary.ModeratorApprovalStatus
          if (!videoContent.Description)
            videoSubRow.description='Not Assigned'


          let violationType=[]
          if (sceneSummary.SexualSeverity!==ESeverity.none)
            violationType.push('Sexual')

          if (sceneSummary.ViolenceSeverity!==ESeverity.none)
            violationType.push('Violence')

          if (sceneSummary.SelfHarmSeverity!==ESeverity.none)
            violationType.push('SelfHarm')

          if (sceneSummary.HateSeverity!==ESeverity.none)
            violationType.push('Hate')

          if (violationType.length>0){
            videoSubRow.violationType = violationType.join(", ")
          } else {
            videoSubRow.violationType = 'Not Assigned'
          }

          videoSubRow.sceneNumber = index + 1

          return videoSubRow
        })
      }

      videoRow.subRows = videoSubRows

      videoRow.classification = classifications
      videoRow.classificationString=classificationsString
      return videoRow
    })

  }
  return result
}
