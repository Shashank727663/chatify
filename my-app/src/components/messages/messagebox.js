import React,{useState, useRef} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function MessageBox(props) {
    const [message, setMessage] = useState("");
    const messageRef = useRef("");

    const messageobject={
        user_name:props.userData.currentUserData.user_name,
        user_avatar: props.userData.currentUserData.user_avatar,
      message: messageRef.current.value
    }

    const messageclick=()=>{
        if(message.current.value===" "){
            return false;
        }
    }

    props.onSendMessage(messageobject)
    setMessage("")
  return (
    <form className="chat-form" autoComplete="off">
    <TextField id="standard-basic" label="write your message here." margin="normal"  multiline
        fullWidth
        rows="4"   inputRef={messageRef}  onChange={event=>setMessage(event.target.value)}
            onKeyDown={event =>{
                if(event.key ==="Enter"){
                    event.preventDefault();
                    messageclick();
                }
            }}
            value={message}
        ></TextField>
        <Button variant="contained" color="primary" onClick={messageclick}>Send</Button>
    </form>
  )
}
