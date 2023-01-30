import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Chat from './components/messages/Chat';
import { useState } from 'react';
function App() {
  const[userData,setUserData]=useState(null);

  if(userData===null){
    return (<div className="container">
        <div className="container-title">Welcome to our Chat App</div>
        <LoginForm
          setUserDataForChat={setUserData}
        />
      </div>
    )
  }
  return (
    <div className="App">
    <Chat currentUserData={userData}></Chat>
  
    </div>
  );
}

export default App;
