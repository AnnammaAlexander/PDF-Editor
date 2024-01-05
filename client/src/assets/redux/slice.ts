import { createSlice } from "@reduxjs/toolkit";







const getToken=()=>{
    const token = localStorage.getItem('token')
    if(token){
        return token
    }
}

const getUserName=()=>{
    const name= localStorage.getItem('name')
    if(name){
        return name
    }
}

const getUserEmail=()=>{
    const email= localStorage.getItem('email')
    if(email){
        return email
    }
}


const initialState={
    token:getToken(),
    name:getUserName(),
    email:getUserEmail()

}
const userSlice =createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload,
            localStorage.setItem('token',action.payload)
        },
        setName:(state,action)=>{
            state.name=action.payload,
            localStorage.setItem('name',action.payload)
        },
       
        setEmail:(state,action)=>{
            state.email=action.payload,
            localStorage.setItem('email',action.payload)
        },

        setLogOut:(state)=>{
            state.token='',
            state.email='',
            localStorage.removeItem('token'),
            localStorage.removeItem('email')

        }
    
    }
})

export default userSlice.reducer
export const {setToken,setName,setEmail,setLogOut} = userSlice.actions