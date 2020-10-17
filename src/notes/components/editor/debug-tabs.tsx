import React from 'react'
import { Tabs } from 'antd'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'

const DebugTabs = () => {
  const editor = useSlate()
  return (
    <Tabs defaultActiveKey="children" id="uncontrolled-tab-example">
      <Tabs.TabPane key="children" tab="Children">
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(editor.children, null, 4)}</code>
        </pre>
      </Tabs.TabPane>
      <Tabs.TabPane key="operations" tab="Operations">
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(editor.operations, null, 4)}</code>
        </pre>
      </Tabs.TabPane>
      <Tabs.TabPane key="selection" tab="Selection">
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(editor.selection, null, 4)}</code>
        </pre>
      </Tabs.TabPane>
      <Tabs.TabPane key="marks" tab="Marks">
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(Editor.marks(editor), null, 4)}</code>
        </pre>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default DebugTabs
