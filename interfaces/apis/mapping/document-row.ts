import { TResVideo } from '@interfaces/apis/videos.types'
import { TDocumentRowType, TDocumentSubRowType, TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { EApporval, EClassificationType, EMediaType, EViolationType } from '@interfaces/enums'

const mappingResToDocumentRow = (res: TResVideo.getMediaContents) => {

  let rows: TDocumentRowType[] = []

  if (res != null) {
    const document = res.Content?.filter(
      (val) => val.MediaType === EMediaType.document
    )

    rows = document?.map((videoContent) => {

      let tempRow: TDocumentRowType = {}
      tempRow.name = videoContent.Name
      tempRow.type = videoContent.MediaType
      tempRow.submittedBy="Mickle Moonico"
      tempRow.moderator_approval =  videoContent.ModeratorApprovalStatus

      let vioRand = Math.floor(Math.random() * 5) + 1
      if (vioRand > 2) tempRow.ai_approval = EApporval.approve
      else tempRow.ai_approval = EApporval.reject

      // tempRow.ai_approval =  videoContent.Videos[0]?.VideoSummaries[0]?.AutomaticApprovalStatus
      tempRow.submissionDate = videoContent.Documents[0]?.UploadedOnUtc

      // TODO I can't map from video scenes to row
      let documentSummeries: TDocumentSubRowType[] = []

      tempRow.subRows = documentSummeries
      return tempRow
    })
  }

  rows = rows.sort((a, b) => {
    let x = a.submissionDate?.toLowerCase()
    let y = b.submissionDate?.toLowerCase()
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  })
  return rows

}

export default mappingResToDocumentRow
