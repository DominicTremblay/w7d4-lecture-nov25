import { useState, useEffect, useReducer } from 'react';
import dataReducer, {
  SET_MESSAGE,
  SET_CONNECTION,
  SET_USER,
} from '../reducer/dataReducer';

const useSocket = url => {
  //  const [socket, setSocket] = useState(null);
  //  const [connected, setConnected] = useState(false);

  const [state, dispatch] = useReducer(dataReducer, {
    socket: null,
    connected: false,
    messages: [],
    currentUser: { name: 'Anonymous' },
  });

  const handleMessage = msg => {
    const message = JSON.parse(msg.data);
    console.log(message);

    dispatch({ type: SET_MESSAGE, message });
  };

  // Create a connection to the socket server

  useEffect(() => {
    const socket = new WebSocket(url);
    // setSocket(socket);
    // setConnected(true);
    dispatch({ type: SET_CONNECTION, socket });
  }, [url]);

  useEffect(() => {
    if (state.connected) {
      state.socket.onopen = () => console.log('Connected to Socket Server');
      state.socket.onmessage = handleMessage;
      state.socket.onclose = () =>
        console.log('Disconnected from socket server');

      return () => {
        state.socket.onopen = null;
        state.socket.onmessage = null;
        state.socket.onclose = null;
      };
    }
  }, [state.connected]);

  return {
    state,
  };
};

export default useSocket;
