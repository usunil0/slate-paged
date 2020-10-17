import { Editor, Transforms,Node } from "slate";
import { ReactEditor } from "slate-react"
import { HEADING_TYPES } from "../constants/block-list";

const WithCustomInsertBreak = (editor:ReactEditor) =>{
    const {insertBreak}=editor;

    editor.insertBreak= ()=>{
        insertBreak()
        const [match] = Editor.nodes(editor, { match: (n) => HEADING_TYPES.includes(n.type as string) });
        if(!!match){
        Transforms.setNodes(editor,{type:'paragraph'},{ match: (n:Node)=> HEADING_TYPES.includes(n.type as string) })
        }
        console.log(match)
    }

return editor
}
export default WithCustomInsertBreak