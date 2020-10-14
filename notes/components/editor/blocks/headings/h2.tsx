import React from 'react'

import { RenderElementProps } from 'slate-react'

const H2 = (props: RenderElementProps) => {
  return <h2 {...props.attributes}>{props.children}</h2>
}

export default H2
