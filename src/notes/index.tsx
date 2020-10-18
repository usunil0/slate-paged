import React from 'react'

import dynamic from 'next/dynamic'

const TextEditor = dynamic(
  () => import('./components/editor/text-editor') as any,
  {
    ssr: false
  }
)

const Notes = () => {
  return (
    <div>
      <TextEditor />
    </div>
  )
}

export default Notes
