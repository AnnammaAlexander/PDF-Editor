import axios from "axios";
import { Base_URL } from "./baseURL";

const baseURL = axios.create({
    baseURL: Base_URL,
});

baseURL.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        console.log("Token:", token);
        console.log("Email:", email);
        if(token){
            config.headers["Authorization"]=`Bearer ${token}`
            config.headers["x-user"]=email
        }else{
            delete config.headers["Authorization"]
        }
        return config
    },
    (error)=>{
        console.log("Interceptor encounted an error");
        return Promise.reject(error)
        
    }
)

export default baseURL
