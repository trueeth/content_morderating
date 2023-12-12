import { TResDocument, TResVideo } from '@interfaces/apis/api.types'
import { EClassificationType, EMediaType, ESeverity, EViolationType } from '@interfaces/enums'
import { TDocumentRowType, TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { format, parseISO } from 'date-fns'

export const resToDocumentRowAdapter = (resData) => {

  let apiData=resData as TResDocument.TDocumentContent[]

  let result: TDocumentRowType[] = []
  if (apiData.length > 0) {

    result = apiData.map(documentContent => {
      let docmentRow: TDocumentRowType = {}

      docmentRow.name = documentContent.Name
      docmentRow.type = EMediaType.document
      docmentRow.submittedBy = 'والأخلاق والثقافة'
      docmentRow.moderator_approval = documentContent.ModeratorApprovalStatus
      docmentRow.ai_approval = documentContent.AiApproval

      docmentRow.submissionDate = ''
      if (documentContent.UploadedOnUtc != null && documentContent.UploadedOnUtc != '')
        docmentRow.submissionDate = format(parseISO(documentContent.UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')


      return docmentRow
    })

  }
  return result
}
