import {
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  BoldOutlined,
  HighlightOutlined
} from '@ant-design/icons'
import { CSSProperties } from 'react'
import highlightColors from './highlight-colors'
import { Styled } from 'theme-ui'

export interface IToolbarMark {
  type: string
  title: string
  icon: React.ReactElement
  styles?: CSSProperties
  modkey?: string
  renderChildren?: (children: any, leaf?: any) => React.ReactElement
}

/**toolbarMarks
 * @description toolbarmarks for editor.
 *
 *  type: this is the entry point of leaf. leaf will be defined by this. checkout render-leaf.tsx to know more about leaf.
 *
 *  renderChildren: while using renderChildren be careful to not return a div or a block element which can break the editor flow
 *
 *  styles:  by using styles key you can return styles that can be applied when the mark type is present,
 *  be careful that these styles can be overriden by next type.
 *    for example : the styles you define on 0 index of the array is { fontWeight:bold } and on the 1st element(i.e index 1 of the array) it is {fontWeight:normal} and the leaf has both the types, then the index 1 will ovveride 0
 *  if you want to define styles that cannot be ovveriden then define it in renderChildren as <span style={{fontWeight:bold}}>{chilren}</span>
 *  or use html tag which corresponds to the style such as <strong/>
 *
 *  icon: icon for display
 *
 *TODO: modkey: use this as shortcut for applying this type on the leaf
 */
const toolbarMarks: IToolbarMark[] = [
  {
    type: 'bold',
    title: 'BOLD',
    icon: <BoldOutlined />,
    renderChildren: (children: any) => <Styled.strong>{children}</Styled.strong>
  },
  {
    type: 'italics',
    title: 'Italics',
    icon: <ItalicOutlined />,
    renderChildren: (children: any) => <em>{children}</em>
  },
  {
    type: 'strike',
    title: 'Stike Through',
    icon: <StrikethroughOutlined />,
    renderChildren: (children: any) => <del>{children}</del>
  },
  {
    type: 'underlined',
    title: 'UnderLine',
    icon: <UnderlineOutlined />,
    renderChildren: (children: any) => <u>{children}</u>
  },
  {
    type: 'highlight',
    title: 'highlight',
    icon: <HighlightOutlined />,
    renderChildren: (children: any, leaf: any) => (
      <Styled.strong
        style={{
          backgroundColor: leaf?.highlightColor
            ? leaf.highlightColor
            : highlightColors.searchHighlightColor
        }}>
        {children}
      </Styled.strong>
    )
  }
]

export default toolbarMarks
