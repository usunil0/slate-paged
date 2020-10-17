import React from 'react'

import { RenderElementProps } from 'slate-react'

const H1 = (props: RenderElementProps) => {
  return <h1 {...props.attributes}>{props.children}</h1>
}
export default H1
