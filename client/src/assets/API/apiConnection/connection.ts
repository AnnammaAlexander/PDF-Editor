// import {toast} from "react-toastify"
// import { signupResponse } from "../../interface/authInterface";
import { LoginFormValues, RegisterFormValues } from "../../interface/authInterface";
import baseURL from "../axiosUser"


    
  
  export const register = async(values:RegisterFormValues)=>{
    try {
        
        
        const response = await baseURL.post("/register",values)
        console.log("response",response?.data);
        return response.data;
        
    } catch (error) {
        throw new Error('Registration failed.')
    }
  }
  //User Login
  export const UserLogin = async(values:LoginFormValues)=>{
    try {
      const response = await baseURL.post("/login",values)
      // console.log("bbbbbbbbbbbbbbbb",response.data);
      return response?.data

    } catch (error) {
      throw new Error('Login failed.')
    }
  }
  //uploadpdf
 export const uploadpdf = async(file:File|null,email:string)=>{
 try {
  
  if (!file) {
    
    throw new Error('No file provided');
  }
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('email', email);
  console.log("formData",formData);
  
  const response = await baseURL.post('/uploadpdf',formData)
  
  
  return response
 } catch (error) {
  console.log(error);
  
  throw new Error('upload failed.')
 }
  

  }
  //get all pdf files
  export const getPdfFiles =async(email:string)=>{
    try {
      
      const response = await baseURL.get(`/getAllPdf/${email}`)
      // console.log(response.data);
      return response?.data
      
      
    } catch (error) {
      console.log(error);
  
  throw new Error(' failed to get files.')
    }
  }
  //view downloaded pdf
  export const viewPdf =async(uploads:string)=>{
    try {
      const response = await baseURL.get(`/viewpdf/${uploads}`)
      console.log("yyyyyyyyyyyyyyyyyyy",response);
      
      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  }