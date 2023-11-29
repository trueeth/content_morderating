import { Box } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import 'video-react/dist/video-react.css'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react'
import { useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};


const maxWidth = 800;

type PDFFile = string | File | null;



export default function DrawerTabPlayScene() {

  const [vState, setState] = useState<{
    video: { poster: string },
    numPages:number,
    pageNumber:number,
    file:PDFFile,
    containerWidth:number
  }>({
    video: {
      poster: 'https://media.w3.org/2010/05/sintel/poster.png'
    },
    numPages:0,
    pageNumber:0,
    file:'./test.pdf',
    containerWidth:0
  })

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)


  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<PDFFile>('./test.pdf');
  const [containerWidth, setContainerWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const pageElement = container.querySelector(`[data-page-number="${pageNumber}"]`);
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pageNumber]);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }): void {
    setNumPages(nextNumPages);
  }

  const page = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 1;

  setTimeout(() => {
    setPageNumber(1)
  }, 1000)



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--Secondary)',
        p: 2,
        '& >div': {
          position: 'relative',
          '& >button': {
            top: '40% !important',
            left: '45% !important'
          }
        }
      }}
    >
      {appState.drawer.type === 'video' ? <Player poster={vState.video.poster}>
          <source src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4' />
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
        : <>
          <div ref={containerRef} style={{ overflowY: 'auto', height: '600px' }}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
              ))}
            </Document>
          </div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </>}
    </Box>
  )
}
