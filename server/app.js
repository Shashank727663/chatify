//now setting up the server and checking how the socket.io interacts with our modules 
//import the essential modules 
const socketIO = require("socket.io");
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var dotenv = require("dotenv");

dotenv.config();
//importing the directories.
var LoginSchema = require("./schemas/login");
var ImageUpload = require("./controller/files");
var connect = require("./connection.js");



const io = socketIO(process.env.SOCKET_PORT);
const app=express();
//setting up socket.io service 

/*
setting up and handling websocket connections and operations
When a user first logs in, they should be able to see the 10 last messages 
that were written from any user. For that, in index.js, add this function that loads 
them (the object parameter in sort() indicates not to return the field _id in our results)
*/
io.on("connection", (socket) =>{
  console.log("Connection established");


  getMostRecentMessages()
    .then(results => {
      socket.emit("mostRecentMessages", results.reverse());
    })
    .catch(error => {
      socket.emit("mostRecentMessages", []);
    });


  socket.on("newChatMessage",(data) => {
    //send event to every single connected socket
    try{
      const message = new Message(
        {
          user_name: data.user_name,
          user_avatar: data.user_avatar,
          message_text: data.message,
        }
      )
      message.save().then(()=>{
        io.emit("newChatMessage",{user_name: data.user_name, user_avatar: data.user_avatar, message_text: data.message});
      }).catch(error => console.log("error: "+error))
    }catch (e) {
      console.log("error: "+e);
    }
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });
});

/**
 * get 10 last messages
 * @returns {Promise<Model[]>}
 */

async function getMostRecentMessages(){
  return await LoginSchema
  .find()
  .sort({_id:-1})
  .limit(10)
}
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

/*
when we are calling it adding catch clauuse to log off any error
from file uploading db interaction and message brodcating
*/


const init=async()=>{
  try{
    await connect();
    console.log(`db connection established`)
    app.listen(process.env.HTTP_PORT,()=>{
      console.log(`app listening on port ${process.env.HTTP_PORT}`)
    })
  }
  catch(e){
    throw e;
  }
}


init().catch(err => console.log(`Error on startup! ${err}`));

