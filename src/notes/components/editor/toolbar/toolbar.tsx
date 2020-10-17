import React, { useEffect, useState } from 'react'

import toolbarMarks, { IToolbarMark } from '../constants/mark-list'
import blocks, { ToolbarBlockProps } from '../constants/block-list'
import MarkButton from './mark-button'
import BlockButton from './block-button'
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons'
import { ReactEditor, useSlate } from 'slate-react'
import { Range, Transforms} from 'slate'
import indexOf from '../utils/index-of-range'
import {
  getNextClosestRange,
  getPreviousClosestRange
} from '../utils/get-closest-range'
import defaultSelection from '../utils/default-selection'
import { Button } from 'antd'
import { getEditorTextRanges } from '../utils/get-text-ranges'

interface ToolbarProps {
  search: string
  setSearch: (e: string) => void
  lastBlurSelection: Range | null
}
const Toolbar = ({ setSearch, search, lastBlurSelection }: ToolbarProps) => {
  const editor = useSlate()
  const [Ranges, setRanges] = useState<Range[]>([])
  const [isPreviousActive, setIsPreviousActive] = useState<boolean>(false)
  const [isNextActive, setisNextActive] = useState<boolean>(false)
  const [isSaveActive, setSaveActive] = useState<boolean>(false)

  useEffect(() => {
    if (search) {
      const textRanges = getEditorTextRanges(editor, search)
     
      if (textRanges) {
        setRanges(textRanges)
      } else {
        setRanges([])
      }
    }
  }, [search, editor])

  useEffect(() => {
    let { selection } = editor
    if (selection == null) selection = lastBlurSelection
    if (search) {
      if (getPreviousClosestRange(Ranges, selection) !== null) {
        setIsPreviousActive(true)
      } else {
        setIsPreviousActive(false)
      }
      if (getNextClosestRange(Ranges, selection) !== null) {
        setisNextActive(true)
      } else {
        setisNextActive(false)
      }
    }
  }, [search, Ranges, editor.selection])

  const goToPrevious = () => {
    if (!Ranges) return

    if (!isPreviousActive) {
      // Transforms.select(editor, lastBlurSelection || defaultSelection)
      return
    }

    const { selection } = editor
    if (selection == null) {
      Transforms.select(editor, Ranges[0])
    } else {
      Transforms.deselect(editor)

      const indexofRange = indexOf(Ranges, selection)

      if (indexofRange && indexofRange != -1) {
        Transforms.select(editor, Ranges[indexofRange - 1])
      } else {
        Transforms.select(
          editor,
          getPreviousClosestRange(Ranges, selection) || defaultSelection
        )
      }
    }

    ReactEditor.focus(editor)
  }

  const goToNext = () => {
    if (!Ranges) return
    if (!isNextActive) {
      Transforms.select(editor, lastBlurSelection || defaultSelection)
      return
    }

    const { selection } = editor
    if (selection == null) {
      Transforms.select(editor, Ranges[0])
    } else {
      Transforms.deselect(editor)

      const l: Range = Ranges[0]

      const indexofRange = indexOf(Ranges, selection || l)

      if (indexofRange && indexofRange != -1) {
        Transforms.select(editor, Ranges[indexofRange + 1] || l)
      } else {
        Transforms.select(editor, getNextClosestRange(Ranges, selection) || l)
      }
    }

    ReactEditor.focus(editor)
  }

  useEffect(() => {
    let { selection } = editor
    if (selection == null) selection = lastBlurSelection
    if (search) {
      if (getPreviousClosestRange(Ranges, selection) !== null) {
        setIsPreviousActive(true)
      } else {
        setIsPreviousActive(false)
      }
      if (getNextClosestRange(Ranges, selection) !== null) {
        setisNextActive(true)
      } else {
        setisNextActive(false)
      }
    }

  }, [search, Ranges, editor.selection])

  useEffect(() => {
    const textRanges = getEditorTextRanges(editor, '___')
    if (textRanges.length > 0) {
      setSaveActive(false)
    } else {
      setSaveActive(true)
    }
  }, [editor.selection, editor.children])
  return (
    <div>
      {toolbarMarks.map((mark: IToolbarMark) => {
        return <MarkButton type={mark.type} icon={mark.icon} />
      })}
      {blocks.map((block: ToolbarBlockProps) => {
        if (block.isHiddenInToolbar) return
        return <BlockButton type={block.type} icon={block.icon} />
      })}
      <div className="d-inline-flex border">
        <SearchOutlined className="p-2 align-self-center" />
        <input
          type="search"
          placeholder="Search the text..."
          onChange={e => setSearch(e.target.value)}
          className="d-inline-block border-0"
        />
        <div>
          <Button
            disabled={!isPreviousActive}
            onMouseDown={e => {
              e.preventDefault()
              goToPrevious()
            }}>
            <UpOutlined />
          </Button>
          <Button
            disabled={!isNextActive}
            onMouseDown={e => {
              e.preventDefault()
              goToNext()
            }}>
            <DownOutlined />
          </Button>
        </div>
        <Button disabled={!isSaveActive}>save</Button>
      </div>
    </div>
  )
}

export default Toolbar
