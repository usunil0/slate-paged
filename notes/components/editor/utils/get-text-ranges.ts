import { Editor, Text, Range, Path } from 'slate'
import { ReactEditor } from 'slate-react'

export const getEditorTextRanges = (editor: ReactEditor, search: string) => {
  const ranges = []
  for (const [node, path] of Editor.nodes(editor, {
    at: [],
    match: Text.isText
  })) {
    if (search && Text.isText(node)) {
      ranges.push(...getTextRanges(node, path, search))
    }
  }
  return ranges
}

export const getTextRanges = (node: Text, path: Path, search: string) => {
  const ranges: Range[] = []
  const { text } = node

  const parts: string[] = text.split(search)

  let offset = 0
  parts.forEach((part, index) => {
    if (index !== 0) {
      ranges.push({
        anchor: { path, offset: offset - search.length },
        focus: { path, offset }
      })
    }

    offset = offset + part.length + search.length
  })

  return ranges
}
