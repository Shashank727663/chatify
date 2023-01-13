import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const connect=async()=>{
    await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
}

export default connect;
