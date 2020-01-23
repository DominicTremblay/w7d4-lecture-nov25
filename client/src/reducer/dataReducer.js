export const SET_CONNECTION = 'SET_CONNECTION';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_USER = 'SET_USER';

const dataReducer = (state, action) => {
  const actions = {
    SET_CONNECTION: {
      ...state,
      socket: action.socket,
      connected: true,
    },

    SET_MESSAGE: {
      ...state,
      messages: [...state.messages, action.message],
    },

    SET_USER: {
      ...state,
      currentUser: { name: action.username },
    },
  };

  return actions[action.type] || state;
};

export default dataReducer;
