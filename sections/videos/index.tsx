'use client'

import * as React from 'react'
import MediaWrapper from '@components/multi-media/wrapper'
import Content from '@sections/videos/Content'
import MediaSectionHeader from '@components/multi-media/section-header/Header'

const VideoSection = () => {

  const WrapperHeader=()=> {
    const groupByValue=["New Video","Rejected Video"]
    return <MediaSectionHeader title={"Video"} groupByValue={groupByValue}/>
  }

  return (
   <MediaWrapper wrapperHeader={<WrapperHeader/>} wrapperContent={<Content/>}></MediaWrapper>
  )
}

export default VideoSection
