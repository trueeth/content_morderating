import dynamic from 'next/dynamic'

const PowerBIEmbed = dynamic(
  () => import('powerbi-client-react').then(mod => mod.PowerBIEmbed),
  { ssr: false } // This line disables server-side rendering for this component.
);
import { models } from 'powerbi-client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { apiGetBiWorkSpaceConfig } from '@interfaces/apis/dashboard'

export default function Powerbi() {

  const { i18n } = useTranslation();
  const [vState, setState]=useState({setting:{embedUrl:'', accessToken:'', id:''}, display:false})



  useEffect(() => {
    (async ()=>{
      const initConfig={
        workspaceId: '18466484-a961-4172-9909-3037615beef1',
        id: '94f034c3-77b1-45d9-82b9-7da414bbbb3b'
      }
      const response = await apiGetBiWorkSpaceConfig(initConfig)
      const responseSetings={
        id:response.data.EmbedReport[0].ReportId,
        embedUrl: response.data.EmbedReport[0].EmbedUrl,
        accessToken: response.data.EmbedToken.Token
      }
      setState(prevState => ({...prevState, setting:responseSetings, display: true }))
    })()
  }, [i18n.language])


    return (
      <>
        {vState.display && <PowerBIEmbed
          embedConfig={{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            embedUrl: vState.setting.embedUrl,
            accessToken: vState.setting.accessToken,
            id: vState.setting.id,
            tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
            permissions: models.Permissions.All,
            settings: {
              localeSettings: {
                language: i18n.language
              },
              panes: {
                filters: {
                  expanded: true,
                  visible: true
                }
              },
              background: models.BackgroundType.Transparent,
              filterPaneEnabled: true,
              navContentPaneEnabled: true
            }
          }}
        />
        }
      </>
    )
}
