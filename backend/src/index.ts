import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';
import { ENV } from './config/env.js';

dotenv.config();

const app=express()

app.use(clerkMiddleware())
app.use(cors({origin:ENV.frontendUrl}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT=process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to Productify Backend",
        endpoints:{
            users:"/api/users",
            products:"/api/products",
            comments:"/api/comments"
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})