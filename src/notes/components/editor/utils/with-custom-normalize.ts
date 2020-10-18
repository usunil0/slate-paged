import { Transforms,Element,Node, Editor ,Text} from 'slate'
import { ReactEditor } from 'slate-react'
import toggleBlock from './toggle-block'


const emptyPage ={type:'page',children:[{type:'paragraph',children:[{type:'text',text:''}]}]}

function withCustomNormalize(editor: ReactEditor) {
  // can include custom normalisations--- for now returning the same the editor
 const {normalizeNode}=editor
 editor.normalizeNode = entry => {

  const [node, path] = entry

  if(Text.isText(node)) return normalizeNode(entry)



  // if the node is Page
  if (Element.isElement(node) && node.type === 'page') {
    let PageNode;
    //afaik pageNode if inserted as new page is not available here as a dom node because it hasnt rendered yet
    try{
      PageNode= ReactEditor.toDOMNode(editor,node)
    }catch(e){
      return
    // return normalizeNode(entry)
    }

    const style = window.getComputedStyle(PageNode)
    const computedHeight = PageNode.offsetHeight
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)

    let pageHeight=computedHeight - padding 

    let CurrentpageHeight=0

    const children=Array.from( PageNode.children)
    
    children.forEach(child=>{
   
      const childStyles= window.getComputedStyle(child)
      const computedChildHeight = child.clientHeight
      const childMargin = parseFloat(childStyles.marginTop) + parseFloat(childStyles.marginBottom)
      const childPadding = parseFloat(childStyles.paddingBottom) + parseFloat(childStyles.paddingTop)
      const childBorder = parseFloat(childStyles.borderLeftWidth) + parseFloat(childStyles.borderRightWidth)+ parseFloat(childStyles.borderTopWidth) + parseFloat(childStyles.borderBottomWidth)
     
      const childHeight=computedChildHeight+childMargin+childPadding+childBorder
      
      CurrentpageHeight=CurrentpageHeight+childHeight
    
      if(CurrentpageHeight>pageHeight){
        Transforms.liftNodes(editor)
        Transforms.splitNodes(editor)
        Transforms.wrapNodes(editor,emptyPage)
    }
    })

  }
  

  // Fall back to the original `normalizeNode` to enforce other constraints.
  return normalizeNode(entry)
}
  return editor
}

export default withCustomNormalize
