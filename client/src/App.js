import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
//import lib from './lib/messages';
import dataReducer, { SET_MESSAGES, SET_USERNAME } from './reducer/dataReducer';

function App() {
  //const [messages, setMessages] = useState(lib.messages);
  //const [currentUser, setCurrentUser] = useState({ name: 'Anonymous' });

  const [state, dispatch] = useReducer(dataReducer, {
    currentUser: { name: 'Anonymous' },
    messages: [],
  });
  // Sending message from the chat to the server
  const sendMessage = message => {
    // Create a new message object
    const newMessage = {
      id: Math.random()
        .toString(36)
        .substr(2, 6),
      type: 'incomingMessage',
      content: message,
      username: state.currentUser.name,
    };

    dispatch({ type: SET_MESSAGES, message: newMessage });
    //setMessages([...messages, newMessage]);
  };

  const updateUser = username => {
    // Create a notification object
    const newNotification = {
      id: Math.random()
        .toString(36)
        .substr(2, 6),
      type: 'incomingNotification',
      content: `${state.currentUser.name} has changed their name to ${username}`,
    };

    // updating the username in the state
    //setCurrentUser({ name: username });
    dispatch({ type: SET_USERNAME, username });
    //setMessages([...messages, newNotification]);
    dispatch({ type: SET_MESSAGES, message: newNotification });
  };

  return (
    <div>
      <NavBar />
      <MessageList messages={state.messages} />
      <ChatBar
        username={state.currentUser.name}
        sendMessage={sendMessage}
        updateUser={updateUser}
      />
    </div>
  );
}

export default App;
