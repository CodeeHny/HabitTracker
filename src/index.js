import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
const app = express();

dotenv.config({path: './.env'});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000);
    console.log("App running on port :", process.env.PORT );
})
.catch((err)=>{
    console.log("Failed to connect database || ERROR : ", err)
})

export default connectDB