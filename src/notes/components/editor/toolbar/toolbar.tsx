/** @jsx jsx */
import { jsx, Link } from 'theme-ui'

import React, { useEffect, useState } from 'react'
import {saveAs} from 'file-saver'
import { Button, Flex, Box } from 'theme-ui'
import { DownOutlined, FileWordOutlined, GithubOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons'
import { ReactEditor, useSlate } from 'slate-react'
import { Range, Transforms } from 'slate'

import toolbarMarks, { IToolbarMark } from '../constants/mark-list'
import blocks, { ToolbarBlockProps } from '../constants/block-list'
import MarkButton from './mark-button'
import BlockButton from './block-button'
import indexOf from '../utils/index-of-range'
import {
  getNextClosestRange,
  getPreviousClosestRange
} from '../utils/get-closest-range'
import defaultSelection from '../utils/default-selection'
import { getEditorTextRanges } from '../utils/get-text-ranges'
import convertToDoc from '../utils/convert-to-doc'

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

  const downloadAsDoc =async ()=>{
  const doc=await convertToDoc(editor)
   saveAs(doc,"YO THIS IS YOUR FILE.docx")
  }

  return (
    <Flex sx={{
      width:'100%',
      position:'sticky',
      top:0,
      zIndex:10,
      bg:'primary'
    }}>
      <Box
      sx={{
        flex:'1 1 auto'
      }}
      >
      {toolbarMarks.map((mark: IToolbarMark) => {
        return <MarkButton type={mark.type} icon={mark.icon} />
      })}
      {blocks.map((block: ToolbarBlockProps) => {
        if (block.isHiddenInToolbar) return
        return (
          <BlockButton key={block.type} type={block.type} icon={block.icon} />
        )
      })}
      </Box>
      <Box>
        <SearchOutlined className="p-2 align-self-center" />
        <input
          type="search"
          placeholder="Search the text..."
          onChange={e => setSearch(e.target.value)}
          className="d-inline-block border-0"
        />
        <Button
          disabled={!isPreviousActive}
          onMouseDown={e => {
            e.preventDefault()
            goToPrevious()
          }}>
          <UpOutlined />
        </Button>
        <Button
          variant="primary"
          disabled={!isNextActive}
          onMouseDown={e => {
            e.preventDefault()
            goToNext()
          }}>
          <DownOutlined />
        </Button>
        <Button variant="primary" onClick={downloadAsDoc}>
          <FileWordOutlined /> 
        {' '}
          <span style={{
                verticalAlign: 'text-top'
          }}>
          save as doc  
            </span>
        </Button>
      </Box>
      <Box>
      <a href="https://github.com/usunil0/slate-paged" target="_blank">
        <Button variant="primary" >
          <GithubOutlined/>
        </Button>
      </a>
      </Box>
    </Flex>
  )
}

export default Toolbar
