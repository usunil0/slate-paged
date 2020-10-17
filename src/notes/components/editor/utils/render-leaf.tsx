import React, { CSSProperties } from 'react'

import { RenderLeafProps } from 'slate-react'

import toolbarMarks, { IToolbarMark } from '../constants/mark-list'

/**
 * Leaf is the lowest form of text in the editor.
 * access text from leaf.text and type from other than that all other keys in leaf are either for styling or information passing keys even leaf.type
 *
 * this is common rendering component for a leaf. To define a custom leaf check mark-list.tsx
 */

const renderLeaf = ({ attributes, leaf, ...props }: RenderLeafProps) => {
  let styles: CSSProperties = {}
  let children = props.children
  const leafKeys = Object.keys(leaf)

  toolbarMarks.forEach((toolbarMark: IToolbarMark) => {
    if (leafKeys.includes(toolbarMark.type)) {
      if (toolbarMark.renderChildren) {
        children = toolbarMark.renderChildren(children, leaf)
      }
      styles = { ...styles, ...toolbarMark.styles }
    }
  })

  return (
    <span {...attributes} style={{ ...styles }}>
      {children}
    </span>
  )
}

export default renderLeaf
