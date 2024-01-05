// import React, { useState } from "react";
import {

  Button,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import { useState } from "react";
import { viewPdf } from "../../API/apiConnection/connection";
// import { Document, Page, pdfjs } from "react-pdf";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FileList(props: any) {
    const [open, setOpen] = useState(false);

      const [file, setPdfFile] = useState<number | null>(null);
     const handleOpen = ()=>setOpen(!open);

  //   const [pageNumber, setPageNumber] = useState(1);

  //   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  //     setNumPages(numPages);
  //   }
  //view selected pdf
  const handleViewPDF =async(uploads:string)=>{
 const response = await viewPdf(uploads)
 console.log(response);
 
 const { data, metadata } = response.data;

        const decodedData = atob(data);

        const uint8Array = new Uint8Array(decodedData.split('').map((char) => char.charCodeAt(0)));

        const pdfFile = new File([uint8Array], metadata.name, { type: metadata.type });
    
    setPdfFile(pdfFile)
    handleOpen();

  }
  return (
    <div className="flex">
      <ListItem
        ripple={false}
        key={props.uploads}
        className="py-1 pr-1 pl-4 flex flex-wrap"
      >
        {props.uploads}

        <ListItemSuffix className="flex flex-row gap-4">
          <Button
           onClick={()=>handleViewPDF(props.uploads)}
          >
            Select Page
          </Button>
          <Button
            color="red"
            //  onClick={()=>deletePDF(uploads)}
          >
            Delete
          </Button>
        </ListItemSuffix>
      </ListItem>
    </div>
  );
}

export default FileList;
