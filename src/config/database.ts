import mongoose from "mongoose";   
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        if ( err instanceof Error ){
            console.error(`Error: ${err.message}`);
        } else {
            console.error(`Unknown error connecting to MongoDB`);
        }
        process.exit(1);
    }
}

export default connectDB;