import { TResDocument, TResVideo } from '@interfaces/apis/api.types'
import { EClassificationType, EMediaType, ESeverity, EViolationType } from '@interfaces/enums'
import { TDocumentRowType, TDocumentSubRowType, TVideoRowType, TVideoSubRowType } from '@interfaces/types'
import { format, parseISO } from 'date-fns'

export const resToDocumentRowAdapter = (resData) => {

  let apiData=resData as TResDocument.TDocumentContent[]

  let result: TDocumentRowType[] = []
  if (apiData.length > 0) {

    result = apiData.map(documentContent => {
      let docmentRow: TDocumentRowType = {}

      docmentRow.name = documentContent.Name
      docmentRow.type = EMediaType.document
      docmentRow.language = documentContent.Language
      docmentRow.moderator_approval = documentContent.ModeratorApprovalStatus
      docmentRow.ai_approval = documentContent.AiApproval
      docmentRow.processingStatus =documentContent.TotalProcessingStatus
      docmentRow.submissionDate = ''
      if (documentContent.UploadedOnUtc != null && documentContent.UploadedOnUtc != '')
        docmentRow.submissionDate = format(parseISO(documentContent.UploadedOnUtc), 'MM/dd/yyyy hh:mm:ss a')


      return docmentRow
    })

  }
  return result
}


export const resToDocumentSubRowAdapter = (resData) => {

  let result: TDocumentSubRowType[] = []

  let apiData=resData as TResDocument.TDocumentContentDetail
  const GptResponse = apiData.GptResponse
  if (GptResponse.length>0){
    result = GptResponse.map((response, index)=>{
      let tempRow:TDocumentSubRowType = {  }
      tempRow.topic=response.Topic.Name
      tempRow.aiApproval=response.AiApproval
      return tempRow
    })
  }

  return result
}
