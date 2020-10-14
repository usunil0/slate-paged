import React from 'react'

import { Button } from 'antd'
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
      type={isBlockActive(editor, type) ? 'primary' : 'default'}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, type)
      }}>
      <div>{icon}</div>
    </Button>
  )
}

export default BlockButton
