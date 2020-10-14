import React from 'react'
import { RenderElementProps } from 'slate-react'
import { Paragraph } from '../blocks'
import blocks, { ToolbarBlockProps } from '../constants/block-list'

const renderElement = ({ element, ...props }: RenderElementProps) => {
  const block = blocks.find(
    (block: ToolbarBlockProps) => block.type == element.type
  )
  if (block) {
    return block.renderBlock({ element, ...props })
  } else {
    return <Paragraph element={element} {...props} />
  }
}

export default renderElement
