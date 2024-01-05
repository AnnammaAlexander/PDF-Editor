import { log } from "console";
import { Request, Response } from "express";
import { getAllPdf, pdfUpload } from "../helper/pdfHelper";
import fs, { promises as fsPromises } from "fs"

const controller = {
  //upload pdf file
  uploadpdf: async (req: Request, res: Response) => {
    try {
      // console.log("Uploaded file:", req.file);
      // console.log("Other form data:", req.body.email);
      const fileName = req.file?.filename;
      const email = req.body.email;
      const response = await pdfUpload(email, fileName);

      if (response) {
        res.json({ status: "success" });
      }

      // Rest of your code
    } catch (error) {
      // Handle error
      console.log("Error in controllers", error);
    }
  },

//get all document
getAllpdfDocument:async(req:Request,res:Response)=>{
    try {
        const email = req.params.email
        const response = await getAllPdf(email)
        
        res.json(response)
    } catch (error) {
        console.log("Error in controllers", error); 
    }
},
//view pdf
viewPdf : async(req:Request,res:Response) =>{
    try {
      const pdfName = req.params.uploads  
      const filePath = `./pdf_upload/${pdfName}`;

      const stats = await fsPromises.stat(filePath);
  
      res.setHeader('Content-Disposition', `inline; filename=${pdfName}`);
      res.setHeader('Content-Type', 'application/json');
  
      res.setHeader('File-Name', pdfName);
      res.setHeader('File-Size', stats.size.toString());
      res.setHeader('File-Last-Modified', stats.mtime.toISOString());
  
      const fileBuffer = await fsPromises.readFile(filePath);
  
      const base64Data = fileBuffer.toString('base64');
      const responseObj = {
        metadata: {
          name: pdfName,
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
          type: 'application/pdf',
        },
        data: base64Data,
      };
  
      res.json(responseObj);
    
    } catch (error) {
        console.log("Error in controllers", error); 

    }

}







};
export default controller;
