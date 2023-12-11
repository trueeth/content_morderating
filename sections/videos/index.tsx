'use client'

import * as React from 'react'
import MediaSectionHeader from '@components/multi-media/header'
import {
  MediaActionwrapper,
  MediaWrapper
} from '@components/multi-media/wrapper'

const VideoSection = () => {
  const WrapperHeader = () => {
    const groupByValue = ['New Video', 'Rejected Video']
    return <MediaSectionHeader title={'Videos'} groupByValue={groupByValue} />
  }

  return (
    <MediaWrapper
      header={<WrapperHeader />}
      content={<MediaActionwrapper type="video" />}
    />
  )
}

export default VideoSection
