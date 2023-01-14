var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config();



const connect=async()=>{
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
}
module.exports=connect
