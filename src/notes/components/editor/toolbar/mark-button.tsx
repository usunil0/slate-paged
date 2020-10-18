import React, { ComponentProps } from 'react'

import { Button,ButtonProps } from 'theme-ui'
import { useSlate } from 'slate-react'

import toggleMark, { isMarkActive } from '../utils/toggle-mark'

interface MarkButtonProps extends JSX.IntrinsicAttributes {
  type: string
  icon: React.ReactElement
}

const MarkButton = ({ type, icon }:MarkButtonProps) => {
  const editor = useSlate()

  return (
    <Button
      className={`d-inline m-1`}
      onMouseDown={(event: any) => {
        event.preventDefault()
        toggleMark(editor, type)
      }}>
      <div>{icon}</div>
    </Button>
  )
}

export default MarkButton
