import { Schema,model } from "mongoose";

const userSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        uploads:{
            type:Array,
        }
        
    }
)

const User = model('User',userSchema,'users')

export default User