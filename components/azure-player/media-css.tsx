import styled from "styled-components";
interface CSSMedia {
  videoType?: boolean;
  hidePlayButton?: boolean;
  volumeControl?: boolean;
}



export const CSSMediaWrapper = styled.div<CSSMedia>`
  .vjs-fullscreen-control.vjs-control.vjs-button.outline-enabled-control {
    display: ${props => (props.videoType ? "" : "none")};
  }
  .vjs-big-play-button {
    display: ${props => (props.hidePlayButton ? "none" : "")};
  }
  /* to remove the spinner */
  .vjs-loading-spinner {
    background: none;
  }

  .vjs-volume-control{
    display: ${props => (props.volumeControl !== undefined && props.volumeControl === false)? 'none' : null} ;
  }
  .vjs-loading-spinner:before {
    background: none !important;
    content: "";
  }
  .vjs-loading-spinner:after {
    background: none !important;
    content: "";
  }
  .vjs-loading-spinner .c-progress > span:after {
    background: white;
  }
  
  background-color: black;
`;
