import User from "../model/schema"
import fs from "fs"
import {configKeys} from "../config/configKey"
import { log } from "console"
// import jwt, {jwtPayload } from 'jsonwebtoken'

export const pdfUpload = async(email?:string,fileName?:string)=>{
    try {
        const file = fs.createReadStream(`./pdf_upload/${fileName}`)
        const response = await User.updateOne({ email }, { $addToSet: { uploads: fileName } })
        if(response){
            return true;
        }
    } catch (error) {
        console.log(error);
        
    }
    
}
//get all pdf files
export const getAllPdf = async(email:string) =>{
    try {
      const response = await User.findOne({email})
      if(response){
        const allDocument = response?.uploads
        return allDocument
      }  
    } catch (error) {
        console.log(error);

    }
}