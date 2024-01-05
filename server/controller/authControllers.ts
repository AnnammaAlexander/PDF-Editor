import { Request, Response } from "express";
import { existingUser, generateToken, isuserExist, signup } from "../helper/helper";
import bcrypt from "bcryptjs";
const authControllers = {
  //user Signup
  signup: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExist = await isuserExist(email);
      if (isEmailExist === null) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const response = await signup(name, email, hashPassword);

        
       if(response){

           const jwtToken = generateToken(response._id);
           const userData = {
             status: "success",
             message: "Registration Successful",
             user: response,
             
           };
           res.json(userData)
       }else{
        throw new Error('Signup failed.');
       }
      }else{
         // Handle the case where isEmailExist is not null
        res.json({
            status: 'error',
            message: 'Email already exists',
        });
      }
    } catch (error) {
      console.log("error in contrllers",error);
    }
  },
  //user Login
  UserLogin : async(req:Request,res:Response)=>{
    try {
      const {  email, password } = req.body;
      const isEmailExist = await existingUser(email)
      if(isEmailExist !==null){
        const salt = await bcrypt.genSalt(10)
      
        const comparePassword = await bcrypt.compare(password,isEmailExist.password)
        if(comparePassword=== true){
          const jwtToken = await generateToken(isEmailExist._id)
          
          
          const userData = {
            status:'success',
            message:'Login successfull',
            user:isEmailExist,
            token:jwtToken,
          }
          // console.log("Login successfull",userData);
          
          res.json(userData)
        }else{
          
            const userData = {
              status: 'failed',
              message: 'Password Is Incorrect',
              user: {},
              token: ''
            }
            console.log('Password Is Incorrect',isEmailExist);
            res.json(userData)
        }
      }
    } catch (error) {
      console.log("Error in controllers", error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        user: {},
        token: ''
      });
    }
  }
};
export default authControllers;
