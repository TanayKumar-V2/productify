import {drizzle} from 'drizzle-orm/node-postgres'
import {Pool} from 'pg'
import * as schema from './schema.js'
import { ENV } from '../config/env.js'

if(!ENV.dbUrl){
    throw new Error("Database URL is not defined in environment variables")
}

const pool=new Pool({
    connectionString:ENV.dbUrl
})

pool.on("connect",()=>{
    console.log("Connected to the database successfully")
})

pool.on("error",(err)=>{
    console.error("Unexpected error on idle client",err)
})

export const db=drizzle({client:pool,schema})