import React from 'react'

import { RenderElementProps } from 'slate-react'

const H3 = (props: RenderElementProps) => {
  return <h3 {...props.attributes}>{props.children}</h3>
}

export default H3
