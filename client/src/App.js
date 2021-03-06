import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import lib from './lib/messages';
import useSocket from './hooks/useSocket';

function App() {
  const { state } = useSocket('ws://localhost:3001');

  //const [messages, setMessages] = useState(lib.messages);
  const [currentUser, setCurrentUser] = useState({ name: 'Anonymous' });

  // Sending message from the chat to the server
  const sendMessage = message => {
    // Create a new message object
    const newMessage = {
      type: 'postMessage',
      content: message,
      username: currentUser.name,
    };

    //setMessages([...messages, newMessage]);

    // send the object to the socket server

    state.socket.send(JSON.stringify(newMessage));
  };

  const updateUser = username => {
    // Create a notification object
    const newNotification = {
      id: Math.random()
        .toString(36)
        .substr(2, 6),
      type: 'incomingNotification',
      content: `${currentUser.name} has changed their name to ${username}`,
    };

    // updating the username in the state
    setCurrentUser({ name: username });
    //setMessages([...messages, newNotification]);
  };

  return (
    <div>
      <NavBar />
      <MessageList messages={state.messages} />
      <ChatBar
        username={currentUser.name}
        sendMessage={sendMessage}
        updateUser={updateUser}
      />
    </div>
  );
}

export default App;
