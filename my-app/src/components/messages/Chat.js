import React from 'react'
import Message from './message';
import MessageBox from './messagebox';
import useChat from './UseChat';
export default function Chat(currentUserData) {
    const {messages,sendMessage}=useChat();
    
  return (
    <div>
        <Message messages={messages}></Message>
        <MessageBox userData={currentUserData} onSendMessages={message=>{
            sendMessage(message)
        }}></MessageBox>
    </div>
    
  )
}
