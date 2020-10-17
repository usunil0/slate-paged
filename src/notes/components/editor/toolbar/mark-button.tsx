import React from 'react'

import { Button } from 'antd'
import { useSlate } from 'slate-react'

import toggleMark, { isMarkActive } from '../utils/toggle-mark'

interface MarkButtonProps {
  type: string
  icon: React.ReactElement
}

const MarkButton = ({ type, icon }: MarkButtonProps) => {
  const editor = useSlate()

  return (
    <Button
      className={`d-inline m-1`}
      type={isMarkActive(editor, type) ? 'primary' : 'default'}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, type)
      }}>
      <div>{icon}</div>
    </Button>
  )
}

export default MarkButton
