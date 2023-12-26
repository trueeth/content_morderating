import request from '@interfaces/apis/base-api/request'

type TResBiWorkspace={
  Type: string,
  EmbedReport: [
    {
      ReportId: string
      ReportName: string,
      EmbedUrl: string
    }
  ],
  EmbedToken: {
    Token: string,
    TokenId: string,
    Expiration: string
  }
}

export const apiGetBiWorkSpaceConfig = (urlConfig?: any) => {
  return request.get<TResBiWorkspace>(`reporting/power-bi/workspaces/${urlConfig.workspaceId}/reports/${urlConfig.id}`)
}