import { log } from "console";
import { configKeys } from "../config/configKey";
import User from "../model/schema";
import  jwt, { JwtPayload }  from "jsonwebtoken";




//check the user is exist or not
export const isuserExist = async(email:string)=>{
    try {
        const response = await User.findOne({email:email})
        console.log("llllllllllllllllllllll",response);
        
        return response
    } catch (error) {
       console.log("error in helpers",error);
        
    }
}
//signup user
export const signup = async(name:string,email:string,password:string)=>{
    try {
        const user ={
            name,
            email,
            password
        }
        const newUser =  await new User(user)
        return await newUser.save()
        
    } catch (error) {
       console.log(error);
        
    }
}


//Generates a JWT token for the provided user ID
export const generateToken = async (userId: object) => {
    try {
        // Check if the JWT token key is defined in your configuration
        if (configKeys.jwtTokenKey) {
            // Sign the token with the user ID and the JWT token key
            const token = jwt.sign({ userId }, configKeys.jwtTokenKey, {
                expiresIn: '5d', // Token expiration time (5 days in this example)
            });

            // Return the generated token
            return token;
        } else {
            // Throw an error if the JWT_TOKEN_KEY is not defined
            throw new Error('JWT_TOKEN_KEY is undefined');
        }
    } catch (error) {
        // Handle any errors that occur during token generation
        console.error('Error generating token:', error);
        throw error; 
    }
};

//User Login 
export const existingUser = async(email:string)=>{
    try {
       const response = await User.findOne({email:email})
       return response;
    } catch (error) {
       console.log(error);
       throw error; 

    }
}
//verify token
export const verifyToken = (token:string) =>{
    try {
        if(configKeys.jwtTokenKey){
            const verification = jwt.verify(token,configKeys.jwtTokenKey) as JwtPayload
            if(verification.exp != undefined){
                const CurrentTime = Math.floor(Date.now()/1000)
                if(verification.exp >= CurrentTime){
                    return true
                }else{
                    return false
                }
            } else{
                return undefined
            }
        }
    } catch (error) {
        
    }
}
