import { ReactEditor } from "slate-react"

function withCustomNormalize(editor:ReactEditor){
    // can include custom normalisations--- for now returning the same the editor
    return editor
}

export default withCustomNormalize