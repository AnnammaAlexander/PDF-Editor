import express from 'express';
import cors from 'cors';
import connectDB from './config/databaseConfig';
import router from './routes';

const app= express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB()
app.use(router)
// app.use("/*",(req,res)=>{
//     throw new AppError('No router found',400)
// })




export default app;