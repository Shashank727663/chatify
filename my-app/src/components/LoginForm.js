import React, {useRef, useState} from "react";
import axios from "axios"

import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';

import PersonAddIcon from '@mui/icons-material/PersonAdd';



const LoginForm=({setUserDataForChat})=>{
    //setting the stautes 
    const [loading, setLoading] = useState(false);
    const userNameInput = useRef("");
    const imageInput = useRef("");
    //use-ref is a hook in react that allows us to create ref to the dom element

    const enterChatClick=()=>{
        setUserName(userNameInput.current.value, imageInput.current.files[0]);
    }

    //sending data to the backend
    const sendData=async (options)=>{
        return await axios.post('http://localhost:5002/api/upload',options)
    }

    //setting the username and the avatar for the chat section
    const setUserName=(userName,imageFile)=>{
        if(userName===""){
            return false;
        }
        if(imageFile === undefined){
            setUserDataForChat({user_name:userName})
        }
        else{
            setLoading(true)
            const data=new FormData();
            data.append('avatar',imageFile)
            try{
                sendData(data)
                .then(response=>{
                    setUserDataForChat({
                        user_name:userName,
                        user_avatar:response.data.user_avatar_url
                    });
                    
                })
                .catch( error => {
                    alert(error);
                  })
                  .finally(() => setLoading(false))
            }
            catch (e) {

            }
            
        }


       
    }


      return (
        <form className="login-form" autoComplete="off">
            <TextField id="chat-username" label="Enter the username" margin="normal" fullWidth
        rows="1" inputRef={userNameInput} onKeyDown={
            event=>{
                if(event.key==="Enter"){
                    event.preventDefault();
                    setUserName(event.target.value,imageInput.current.files[0]);
                }
            }
        }/>
        <label>
        <input
          style={{display:"none"}}
          id="upload-avatar"
          name="upload-avatar"
          ref={imageInput}
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <PersonAddIcon /> Upload avatar
        </Fab>
        <br />
        <br />
      </label>
    
          <Button variant="contained" color="primary" onClick={enterChatClick}>Enter chat</Button>

        </form>
      )
}

export default LoginForm