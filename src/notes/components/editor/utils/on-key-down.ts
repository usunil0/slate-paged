import { ReactEditor } from 'slate-react'
import { Editor, Transforms, Text, Range, Point, Path } from 'slate'

import { isKeyHotkey } from 'is-hotkey'

import toggleMark from './toggle-mark'

const HOTKEYS: { [key: string]: string | string[] } = {
  bold: 'mod+b',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  moveBackward: 'left',
  moveForward: 'right',
  moveWordBackward: 'ctrl+left',
  moveWordForward: 'ctrl+right',
  deleteBackward: 'shift?+backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  extendForward: 'shift+right',
  italic: 'mod+i',
  splitBlock: 'shift?+enter',
  undo: 'mod+z',
  selectAll: 'mod+a'
}

const create = (key: string) => {
  const generic = HOTKEYS[key]
  const isGeneric = generic && isKeyHotkey(generic)

  return (event: KeyboardEvent) => {
    if (isGeneric && isGeneric(event)) return true
    return false
  }
}

const isHotKey = {
  isBold: create('bold'),
  isSplitBlock: create('splitBlock'),
  isSelectAll: create('selectAll')
}

//still very much to do here.
const onKeyDown = (editor: ReactEditor, event: KeyboardEvent) => {
  //TODO use isHotKey here
  if (isHotKey.isSelectAll(event)) {
    event.preventDefault()
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n)
    })

    if (!!match) {
      const anchor = Editor.start(editor, match[1])
      const focus = Editor.end(editor, match[1])
      const currentSelectedRange = { anchor, focus }

      if (editor.selection == null) {
        Transforms.select(editor, currentSelectedRange)
        return
      }

      if (Range.equals(editor.selection, currentSelectedRange)) {
        const EditorStartAnchor = Editor.start(editor, [])
        const EditorEndAnchor = Editor.end(editor, [])
        const EditorRange = {
          anchor: EditorStartAnchor,
          focus: EditorEndAnchor
        }

        Transforms.select(editor, EditorRange)

        return
      } else {
        Transforms.select(editor, currentSelectedRange)
        return
      }
    }
  }
  switch (event.key) {
    // When "`" is pressed, keep our existing code block logic.
    case '`': {
      event.preventDefault()
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'h1'
      })
      Transforms.setNodes(
        editor,
        { type: match ? 'paragraph' : 'h1' },
        { match: n => Editor.isBlock(editor, n) }
      )
      break
    }

    // When "B" is pressed, bold the text in the selection.
    case 'b': {
      event.preventDefault()
      return toggleMark(editor, 'bold')
      break
    }
  }
}

export default onKeyDown
