import React from 'react'
import styled from 'styled-components'
import { CSSMediaWrapper } from './media-css'
import { PlayerDefaultProps, PlayerProps } from './models/azure-player-props'


// made a special visibility handling by moving it from property to style
const APContainer = styled.div<ICSS>`
  position: absolute;
  top: ${(props) =>
          props.position.top !== undefined ? `${props.position.top}px` : '0px'};
  left: ${(props) =>
          props.position.left !== undefined ? `${props.position.left}px` : '0px'};
  width: ${(props) =>
          props.position.width !== undefined ? `${props.position.width}px` : '384px'};
  height: ${(props) =>
          props.position.height !== undefined
                  ? `${props.position.height}px`
                  : '216px'};
  margin-top: 50px;
`
// made a special visibility handling by moving it from property to style
// const VideoComp = styled.video<ICSS>`
//   position: absolute;
//   width: ${(props) =>
//           props.position.width ? `${props.position.width}px` : '384px'};
//   height: ${(props) =>
//           props.position.height ? `${props.position.height}px` : '216px'};
// `

interface ICSS {
  position: { top: number; left: number; width: number; height: number };
  style: {};
}

const mediaPlayerEvents: string[] = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting'
]

export class AzurePlayer extends React.Component<PlayerProps> {
  static defaultProps: PlayerDefaultProps = {
    source: {
      src:
        '//postsms-usw22.streaming.media.azure.net/041be8b3-c50f-42c5-801c-ecefaca07c61/SWF-cartoon-intro_582x402_AACAudio_318.mp4',
      fullscreen: true,
      volumeControl: true
    },
    control: { autoPlay: false, controlBar: true, hidePlayButton: false },
    position: { top: 0, left: 0, width: 384, height: 216 },
    ampLoadTimeout: 300
  }
  videoPlayer: any =  React.createRef();
  videoRef: any

  componentDidMount() {
    this.waitForAmp()
      .then((amp) => {
        this.videoPlayer.current = this.createVideoPlayer(amp)
        this.videoPlayer.current.src([this.props.source])
      })
      .then(() => {
        if (
          this.props.compId &&
          this.props.events &&
          this.props.events.length > 0
        ) {
          this.props.events.forEach((event) => {
            if (mediaPlayerEvents.includes(event.domEvent)) {
              let elem = document.querySelector(
                `video[id*="${this.props.compId}"]`
              ) as HTMLVideoElement
              if (elem) {
                elem.addEventListener(event.domEvent, () => {
                  if (event.domEvent === 'play') {
                    let currentTime = event.listeners[0]()
                    this.videoPlayer.current.currentTime(currentTime)
                  }
                  event.listeners.forEach((listener) => {
                    listener()
                  })
                })
              }
            }
          })
        }
      })
      .catch((e) =>
        console.error('Could not found Azure Media Player plugin', e)
      )
  }

  componentWillUnmount() {
    if (
      this.props.compId &&
      this.props.events &&
      this.props.events.length > 0
    ) {
      this.props.events.forEach((event) => {
        if (mediaPlayerEvents.includes(event.domEvent)) {
          let elem = document.querySelector(
            `video[id*="${this.props.compId}"]`
          ) as HTMLVideoElement
          if (elem) {
            elem.removeEventListener(event.domEvent, () => {
              event.listeners.forEach((listener) => {
                listener()
              })
            })
          }
        }
      })
    }
    if (this.videoPlayer.current) {
      this.videoPlayer.current.dispose()
    }
    this.videoRef = null
  }

  createVideoPlayer = (amp: any) => {
    return amp(
      this.videoRef,
      {
        nativeControlsForTouch: false,
        autoplay: this.props.control.autoPlay,
        controls: this.props.control.controlBar,
        logo: { enabled: false },
        hotKeys: { enableFullscreen: this.props.source.fullscreen },
        inactivityTimeout: 0,
        width: this.props.position.width,
        height: this.props.position.height,
        techOrder: ['azureHtml5JS', 'html5FairPlayHLS', 'html5']
      },
      () => {
        document
          .getElementsByTagName('body')[0]
          .dispatchEvent(new Event(`${this.props.compId}-loaded`))
      }
    )
  }

  waitForAmp() {
    return new Promise((resolve, reject) => {
      let waited = 0
      const wait = (interval: any) => {
        setTimeout(() => {
          waited += interval
          const amp = (window as any)['amp']
          if (amp !== undefined) {
            return resolve(amp)
          }
          if (waited >= this.props.ampLoadTimeout * 100) {
            return reject()
          }
          wait(interval * 2)
          return null
        }, interval)
      }
      wait(10)
    })
  }

  render() {
    const {
      position,
      source: { fullscreen, volumeControl },
      control: { hidePlayButton },
      visibility,
      compId
    } = this.props

    let visibilityProperty = 'visible' as 'hidden' | 'visible'
    if (visibility) {
      visibilityProperty = visibility as 'hidden' | 'visible'
    }
    const style: React.CSSProperties = {
      visibility: visibilityProperty
    }


    return (
      <CSSMediaWrapper
        videoType={fullscreen}
        volumeControl={volumeControl}
        hidePlayButton={hidePlayButton}
      >
        <APContainer position={position} style={style} id={compId}>
          <video
            className='azuremediaplayer amp-default-skin amp-big-play-centered'
            id={compId + '-vid'}
            ref={(input) => {
              this.videoRef = input
            }}
            tabIndex={0}
            style={{ backgroundColor: 'transparent' }}
          />
        </APContainer>
      </CSSMediaWrapper>
    )
  }
}

export default AzurePlayer
