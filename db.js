import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDb');
    } catch (error) {
        console.error('MongoDB Connection error:',error);
    }
}
export default connectDB