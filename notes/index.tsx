import React from 'react'

import dynamic from 'next/dynamic'

const TextEditor = dynamic(() => import('./components/editor/text-editor'), { ssr: false })

const Notes = () => {
  return (
    <div>
      Notes
      <TextEditor />
    </div>
  )
}

export default Notes
