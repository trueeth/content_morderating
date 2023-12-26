'use client'

import React from 'react'
import MediaSectionHeader from '@components/multi-media/header'
import { MediaActionwrapper, MediaWrapper } from '@components/multi-media/wrapper'


const DocumentSection = () => {

  const WrapperHeader = () => {
    const groupByValue = ['New Document', 'Rejected Document']
    return <MediaSectionHeader title={'Documents'} groupByValue={groupByValue} />
  }

  return (
    <MediaWrapper
      header={<WrapperHeader />}
      content={<MediaActionwrapper type='document' />}
    />
  )
}

export default DocumentSection
