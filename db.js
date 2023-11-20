import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery', false);
const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDb');
    } catch (error) {
        console.error('MongoDB Connection error:',error);
    }
}
export default connectDB