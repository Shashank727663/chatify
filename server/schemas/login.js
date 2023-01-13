// designing a schema for the login page
import { ObjectID } from './../node_modules/mongodb/src/index';
const mongoose=require('mongoose');
//designing a schema for the backend of the login page 
const LoginSchema=mongoose.Schema({
    _id:ObjectID,
    user_name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:true
    }
},
    {  timestamps: {
        createdAt: true,
        updatedAt: false
      }
    //along with the fields we are also saving the creation time of every mesaage 
})


export default mongoose.model("login + message",LoginSchema)