//now setting up the server and checking how the socket.io interacts with our modules 
//import the essential modules 
import socketIO from "socket.io";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
//importing the directories.
import LoginSchema from './schemas/login';
import ImageUpload from './controller/files';
import connect from 'connection.js';
import { next } from './node_modules/mongodb/src/cursor/abstract_cursor';

const io = socketIO(process.env.SOCKET_PORT);
const app=express();

app.use((req,res,next)=>{
    //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods','POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  //allow request to continue and be handled by routes
  next();
})

app.use(bodyParser.json());

/*
now dealing with the uploaded files
set up Multer to save incoming files in the request in memory as a 
buffer before uploading to Cloudinary CDN. 
This way, Cloudinary can read the buffer as a stream of data, and pass the output
*/

const storage=multer.memoryStorage()
const upload=multer({storage});


app.post('/api/upload',upload.single('avatar'),ImageUpload);
