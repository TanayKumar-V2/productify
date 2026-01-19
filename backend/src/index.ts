import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors';
import { ENV } from './config/env.js';

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

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

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})