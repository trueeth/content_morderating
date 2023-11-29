'use client'

import * as React from 'react'
import MediaWrapper from '@components/multi-media/wrapper'
import MediaSectionHeader from '@components/multi-media/header'
import MediaTablewrapper from '@components/multi-media/table-wrapper'

const DocumentSection = () => {
  const WrapperHeader = () => {
    const groupByValue = ['New Document', 'Rejected Document']
    return (
      <MediaSectionHeader title={'Documents'} groupByValue={groupByValue} />
    )
  }

  return (
    <MediaWrapper
      wrapperHeader={<WrapperHeader />}
      wrapperContent={<MediaTablewrapper type="document" />}
    />
  )
}

export default DocumentSection
