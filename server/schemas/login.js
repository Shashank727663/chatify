// designing a schema for the login page
const mongoose = require('mongoose');
var Obj = require('mongodb').ObjectId;

//designing a schema for the backend of the login page 
const LoginSchema=mongoose.Schema({
    _id:Obj,
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


module.exports = mongoose.model("login + message",LoginSchema);
