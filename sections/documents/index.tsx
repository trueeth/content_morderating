'use client'

import * as React from 'react'
import MediaWrapper from '@components/multi-media/wrapper'
import MediaSectionHeader from '@components/multi-media/section-header/Header'
import Content from '@sections/documents/Content'

const DocumentSection = () => {

  const WrapperHeader=()=> {
    const groupByValue=["New Document","Rejected Document"]
    return <MediaSectionHeader title={"Documents"} groupByValue={groupByValue}/>
  }


  return (
   <MediaWrapper wrapperHeader={<WrapperHeader/>} wrapperContent={<Content/>}></MediaWrapper>
  )
}

export default DocumentSection
