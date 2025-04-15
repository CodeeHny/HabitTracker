import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/db/db.js';
import app from './src/app.js';

dotenv.config({path: './.env'});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000);
    console.log("App running on port :", process.env.PORT );
})
.catch((err)=>{
    console.log("Failed to connect database || ERROR : ", err)
})

