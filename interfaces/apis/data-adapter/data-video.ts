import { TResVideo } from '@interfaces/apis/api.types'
import { EClassificationType, EMediaType, EViolationType } from '@interfaces/enums'
import { TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { format, parseISO } from 'date-fns'

export const resToVideoRowAdapter = (apiData: TResVideo.TVideoContent[]) => {
  let result: TVideoRowType[] = []
  if (apiData.length > 0) {

    result = apiData.map(videoContent => {
      let videoRow: TVideoRowType = {}

      videoRow.name=videoContent.Name
      videoRow.type=EMediaType.video
      videoRow.status=videoContent.Status
      videoRow.rating=videoContent.VideoSummary?.Rating

      videoRow.submissionDate=''
      if (videoContent.UploadedOnUtc!=null && videoContent.UploadedOnUtc!='')
        videoRow.submissionDate=format(parseISO(videoContent.UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')
      videoRow.moderator_approval=videoContent.ModeratorApprovalStatus
      videoRow.ai_approval=videoContent.AIClassification
      videoRow.flaggedScenes=videoContent.VideoSummary?.NumberOfFragments


      let classifications: EClassificationType[] = []
      if (videoContent.VideoSummary?.SexualSeverity == 'Extreme')
        classifications.push(EClassificationType.sexual)
      if (videoContent.VideoSummary?.SelfHarmSeverity == 'Extreme')
        classifications.push(EClassificationType.selfHarm)
      if (videoContent.VideoSummary?.HateSeverity == 'Extreme')
        classifications.push(EClassificationType.hate)
      if (videoContent.VideoSummary?.ViolenceSeverity == 'Extreme')
        classifications.push(EClassificationType.violance)

      let videoSubRows:TVideoSubRowType[]=[]

      if (videoContent.VideoSummary?.SceneSummaries.length>0){
        videoSubRows=videoContent.VideoSummary?.SceneSummaries.map((sceneSummary, index)=>{
          let videoSubRow:TVideoSubRowType={}

          videoSubRow.category='Content Video'
          videoSubRow.description=videoContent.Description

          // @TODO random data
          let vioRand = Math.floor(Math.random() * 5) + 1
          if (vioRand > 2) videoSubRow.violationType = EViolationType.saudi
          else videoSubRow.violationType = EViolationType.religion

          videoSubRow.sceneNumber=index+1

          return videoSubRow
        })
      }

      videoRow.subRows=videoSubRows

      videoRow.classification = classifications
      return videoRow
    })

  }
  return result
}
