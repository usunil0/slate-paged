import { OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { CSSProperties } from 'react'
import { RenderElementProps } from 'slate-react'
import { H3, H2, H1 } from '../blocks'

export interface ToolbarBlockProps {
  type: string
  title: string
  icon: React.ReactElement
  styles?: CSSProperties
  modkey?: string
  renderBlock: (props: RenderElementProps) => React.ReactElement
  isHiddenInToolbar?: boolean
}

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const HEADING_TYPES = ['h1', 'h2', 'h3']

const blocks: ToolbarBlockProps[] = [
  {
    type: 'h1',
    title: 'Heading 1',
    icon: <strong>H1</strong>,
    renderBlock: (props: RenderElementProps) => <H1 {...props} />
  },
  {
    type: 'h2',
    title: 'Heading 2',
    icon: <strong>H2</strong>,
    renderBlock: (props: RenderElementProps) => <H2 {...props} />
  },
  {
    type: 'h3',
    title: 'Heading 1',
    icon: <strong>H3</strong>,
    renderBlock: (props: RenderElementProps) => <H3 {...props} />
  },
  {
    type: 'numbered-list',
    title: 'Heading 1',
    icon: <OrderedListOutlined />,
    renderBlock: (props: RenderElementProps) => (
      <ol {...props.attributes}>{props.children}</ol>
    )
  },
  {
    type: 'list-item',
    title: 'list Item',
    icon: <OrderedListOutlined />,
    isHiddenInToolbar: true,
    renderBlock: ({ attributes, children }: RenderElementProps) => (
      <li {...attributes}>{children}</li>
    )
  },
  {
    type: 'bulleted-list',
    title: 'Bullet List',
    icon: <UnorderedListOutlined />,
    renderBlock: (props: RenderElementProps) => (
      <ul {...props.attributes}>{props.children}</ul>
    )
  }
]

export default blocks
