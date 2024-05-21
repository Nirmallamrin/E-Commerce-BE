import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


const connect  = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}

export default connect;