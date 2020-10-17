import { Editor, Transforms,Node } from "slate";
import { ReactEditor } from "slate-react"
import { LIST_TYPES } from "../constants/block-list";
import toggleBlock from "./toggle-block";

const WithCustomDelete = (editor:ReactEditor) =>{
    const {deleteBackward}=editor;

 
    editor.deleteBackward= ()=>{
        ReactEditor.focus(editor)
        const {selection}=editor

        const [match] = Editor.nodes(editor, { match: (n) => LIST_TYPES.includes(n.type as string) });
    
        if(!!match && selection?.anchor.offset==0){
            toggleBlock(editor,'paragraph')
        }else{
            deleteBackward('character')
        }
      
    }

return editor
}
export default WithCustomDelete