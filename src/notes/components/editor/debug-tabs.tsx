import React from 'react'
import { Editor } from 'slate'
import { useSlate } from 'slate-react'

const DebugTabs = () => {
  const editor = useSlate()

  const tabs = [
    {
      name: 'children',
      title: 'Children',
      elem: (
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(editor.children, null, 4)}</code>
        </pre>
      )
    },
    {
      name: 'operations',
      title: 'Operations',
      elem: (
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(editor.operations, null, 4)}</code>
        </pre>
      )
    },
    {
      name: 'selection',
      title: 'Selection',
      elem: (
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(editor.selection, null, 4)}</code>
        </pre>
      )
    },
    {
      name: 'marks',
      title: 'Marks',
      elem: (
        <pre className="bg-dark overflow-auto p-5 text-warning h-75">
          <code>{JSON.stringify(Editor.marks(editor), null, 4)}</code>
        </pre>
      )
    }
  ]
  return (
    <Tabs defaultActiveKey="children" id="uncontrolled-tab-example">
      <Nav variant="pills" className="flex-column">
        {tabs.map(tab => {
          return (
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          )
        })}
      </Nav>
      <Tab.Content>
      {tabs.map(tab => {
          return (
            <Tab.Pane eventKey="second">
         {
           tab.elem
         }
          </Tab.Pane>
          
          )
        })}
    
      </Tab.Content>
    </Tabs>
  )
}

export default DebugTabs
