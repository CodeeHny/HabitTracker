import express from 'express';
import mongoose from 'mongoose';
const app = express();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("MongoDb connected successfully !!! || HOST :", connectionInstance.connection.host)
    } catch (error) {
        console.log("Failed to connect mongo db", error);
    }
}

export default connectDB

// codee195
// h7fYe3ldanHzt94Q 