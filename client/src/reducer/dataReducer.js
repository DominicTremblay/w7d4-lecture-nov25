export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_USERNAME = 'SET_USERNAME';

const dataReducer = (state, action) => {
  const actions = {
    SET_MESSAGES: {
      ...state,
      messages: [...state.messages, action.message],
    },
    SET_USERNAME: {
      ...state,
      currentUser: { name: action.username },
    },
  };

  return actions[action.type] || state;
};

export default dataReducer;
