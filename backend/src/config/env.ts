import dotenv from 'dotenv';

dotenv.config({quiet:true});

export const ENV = {
  port: process.env.PORT ,
  dbUrl: process.env.DB_URL ,
  nodeEnv: process.env.NODE_ENV ,
  frontendUrl: process.env.FRONTEND_URL,
  clerk_publishable_key: process.env.CLERK_PUBLISHABLE_KEY,
  clerk_secret_key: process.env.CLERK_SECRET_KEY,
};