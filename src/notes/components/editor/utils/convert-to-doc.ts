import { ReactEditor } from "slate-react"
import { Document, Packer, Paragraph, TextRun } from "docx";


const toText=(doc:any,text:any)=>{
  return  new TextRun({
        text: text.text|| text,
        ...text
    })
}

const toParagraph=(doc:any,para:any)=>{
  return  new Paragraph({
        children:  para.children.map((paragraph:any)=>{
            return toText(doc,paragraph)
        })
    })
}

const toPage=(doc:any,page:any)=>{
    doc.addSection({
        properties: {},
        children: page.children.map((paragraph:any)=>{
            return toParagraph(doc,paragraph)
        })
    });
}

// Used to export the file into a .docx file

const convertToDoc=async (editor:ReactEditor)=>{
   
    const children=editor.children;
    const doc = new Document();
    
    children.forEach(child=>{
        toPage(doc,child)
    })
    
    const docBuffer = await Packer.toBlob(doc)
    //   saveAs(blob, "example.docx");
   return docBuffer

}
export default convertToDoc