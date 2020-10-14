import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { LIST_TYPES } from '../constants/block-list'

export const isBlockActive = (editor: ReactEditor, type: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === type
  })

  return !!match
}

const toggleBlock = (editor: ReactEditor, type: string) => {
  const isActive = isBlockActive(editor, type)
  const isList = LIST_TYPES.includes(type)

  Transforms.unwrapNodes(editor, {
    match: n => {
      return LIST_TYPES.includes(n.type as string)
    },
    split: true
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : type
  })

  if (!isActive && isList) {
    const block = { type: type, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
export default toggleBlock
