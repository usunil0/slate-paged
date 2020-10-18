import React from 'react'

import { Button } from 'theme-ui'
import { useSlate } from 'slate-react'

import toggleBlock, { isBlockActive } from '../utils/toggle-block'

interface BlockButtonProps {
  type: string
  icon: React.ReactElement
}

const BlockButton = ({ type, icon }: BlockButtonProps) => {
  const editor = useSlate()

  return (
    <Button
      className={`d-inline m-1`}
      variant={`${isBlockActive(editor, type) ? 'primary' : 'secondary'}`}
      onMouseDown={(event: any) => {
        event.preventDefault()
        toggleBlock(editor, type)
      }}>
      <div>{icon}</div>
    </Button>
  )
}

export default BlockButton
