import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { apiGetBiWorkSpaceConfig } from '@interfaces/apis/dashboard'
import { models } from 'powerbi-client'

// Dynamic import for PowerBIEmbed component with client-side rendering
const PowerBIEmbed = dynamic(() => import('powerbi-client-react').then((mod) => mod.PowerBIEmbed), {
  ssr: false // Disables server-side rendering for this component.
})

/**
 * Functional component representing the PowerBI integration.
 */
export default function Powerbi() {
  const { i18n } = useTranslation()
  const [vState, setState] = useState({ setting: { embedUrl: '', accessToken: '', id: '' }, display: false })

  useEffect(() => {
    // Fetch PowerBI workspace configuration based on language change
    (async () => {
      setState((prevState) => ({ ...prevState, display: false }))

      const initConfig = {
        workspaceId: '18466484-a961-4172-9909-3037615beef1',
        id: '94f034c3-77b1-45d9-82b9-7da414bbbb3b'
      }

      try {
        const response = await apiGetBiWorkSpaceConfig(initConfig)
        const responseSettings = {
          id: response.data.EmbedReport[0].ReportId,
          embedUrl: response.data.EmbedReport[0].EmbedUrl,
          accessToken: response.data.EmbedToken.Token
        }

        setState((prevState) => ({ ...prevState, setting: responseSettings, display: true }))
      } catch (error) {
        console.error('Error fetching PowerBI workspace configuration:', error)
      }
    })()
  }, [i18n.language])

  // Render PowerBIEmbed component if display is true
  return (
    <>
      {vState.display ? (
        <PowerBIEmbed
          embedConfig={{
            type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report, and create
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
                  expanded: false,
                  visible: true
                }
              },
              background: models.BackgroundType.Transparent,
              filterPaneEnabled: true,
              navContentPaneEnabled: true
            }
          }}
          eventHandlers={
            new Map([
              ['loaded', function() {
                console.log('Report loaded')
              }],
              ['rendered', function() {
                console.log('Report rendered')
              }],
              ['error', function(event) {
                console.log(event.detail)
              }],
              ['visualClicked', () => console.log('Visual clicked')],
              ['pageChanged', (event) => console.log(event)]
            ])
          }
        />
      ) : null}
    </>
  )
}
