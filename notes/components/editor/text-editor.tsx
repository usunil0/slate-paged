import React, { useMemo, useState, useCallback, useEffect } from 'react'

// Import the Slate editor factory.
import { createEditor, Node, Text, NodeEntry, Range } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  ReactEditor
} from 'slate-react'

import { BalloonToolbar, ToolbarMark } from 'slate-plugins-next' // TODO ; plan to remove this dependency and use own balloon toolbar

import DebugTabs from './debug-tabs'
import Toolbar from './toolbar'

import defaultSelection from './utils/default-selection'
import { getTextRanges } from './utils/get-text-ranges'
import onKeyDownCustom from './utils/on-key-down'
import renderElement from './utils/render-element'
import renderLeaf from './utils/render-leaf'
import toggleMark from './utils/toggle-mark'

import toolbarMarks, { IToolbarMark } from './constants/mark-list'
import intialState from './constants/initial-state'
import highlightColors from './constants/highlight-colors'
import { Col, Layout, Row } from 'antd'
import withCustomNormalize from './utils/with-custom-normalize'
import WithCustomInsertBreak from './utils/custom-insert-break'
import WithCustomDelete from './utils/custom-delete'

interface TextEditorState{
  value:Node[]
  search:string | undefined
  lastBlurSelection:Range | null
}

function TextEditor() {
  const editor = useMemo(() => WithCustomDelete(WithCustomInsertBreak(withCustomNormalize(withReact(createEditor())))), [])

  const [state,setState]=useState<TextEditorState>({
    value:[...intialState],
    search:'',
    lastBlurSelection:defaultSelection
  })

  const handleDecorate = ([node, path]: NodeEntry<Node>) => {
    const ranges: Range[] = []

    if (state.search && Text.isText(node)) {
      const currentRanges = getTextRanges(node, path, state.search)
      const rangesWithHighlights: Range[] = []
      currentRanges.forEach((text: Range) => {
        rangesWithHighlights.push({
          ...text,
          highlight: true,
          highlightColor: highlightColors.searchHighlightColor
        })
      })
      ranges.push(...rangesWithHighlights)
    }
    if (Text.isText(node)) {
      const currentRanges = getTextRanges(node, path, '___')
      const rangesWithHighlights: Range[] = []
      currentRanges.forEach((text: Range) => {
        rangesWithHighlights.push({
          ...text,
          highlight: true,
          highlightColor: highlightColors.mandatoryReplaceColor
        })
      })
      ranges.push(...rangesWithHighlights)
    }

    return ranges
  }

  const handleRenderLeaf: any = useCallback(
    (props: RenderLeafProps) => renderLeaf(props),
    [state.search]
  )

  const decorate = useCallback((entry: NodeEntry) => handleDecorate(entry), [
    state.search
  ])

  useEffect(() => {
    ReactEditor.focus(editor)
  }, [])
  
  return (
    <Layout >
      <Layout.Content>
      <Slate editor={editor} value={state.value} onChange={value => setState({...state,value})}>
        <BalloonToolbar>
          {toolbarMarks.map((mark: IToolbarMark) => {
            return (
              <ToolbarMark
                type={mark.type}
                icon={mark.icon}
                onMouseDown={e => {
                  e.preventDefault()
                  toggleMark(editor, mark.type)
                }}
              />
            )
          })}
        </BalloonToolbar>
        <Row>
          <Col span="12">
            <Toolbar
              setSearch={(value:string) => setState({...state,search:value})}
              search={state.search || ''}
              lastBlurSelection={state.lastBlurSelection}
            />
            <Editable
              decorate={decorate}
              onKeyDown={(event: any) => onKeyDownCustom(editor, event)}
              renderElement={renderElement}
              renderLeaf={handleRenderLeaf}
              onBlur={() => setState({...state,lastBlurSelection:editor.selection})}
            />
          </Col>
          <Col span="12">
            <DebugTabs />
          </Col>
       
          
        </Row>
      </Slate>
 
      </Layout.Content>
   </Layout>
  )
}

export default TextEditor
