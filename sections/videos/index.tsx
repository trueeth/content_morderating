'use client'

import * as React from 'react'
import MediaWrapper from '@components/multi-media/wrapper'
import MediaSectionHeader from '@components/multi-media/header'
import MediaTablewrapper from '@components/multi-media/table-wrapper'

const VideoSection = () => {
  const WrapperHeader = () => {
    const groupByValue = ['New Video', 'Rejected Video']
    return <MediaSectionHeader title={'Video'} groupByValue={groupByValue} />
  }

  return (
    <MediaWrapper
      wrapperHeader={<WrapperHeader />}
      wrapperContent={<MediaTablewrapper type="video" />}
    />
  )
}

export default VideoSection
