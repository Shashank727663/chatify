var cloudinary = require("cloudinary");
var dotenv = require('dotenv');

dotenv.config();
//for using the enviroment variables 
const ImageUpload=(req,res)=>{
    if(!req.file){
        res.status(204)
    }
    else{
        try{
            // configuring the cloudinary cloud system
            cloudinary.config({
                cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret:process.env.CLOUDINARY_API_SECRET
            });
            //successfully sending the request with a 201 status which means the 
            // request has succesfully created a resource......
            cloudinary.uploader.upload_stream((result)=>{
                res.status(201).json({user_avatar_url:result.secure_url})
            }).end(req.file.buffer)

            
        }
        catch(e){
            res.status(500).json({status:e})
        }
    }
}

module.exports = ImageUpload;

