import { CHANGE_LOGIN_STATUS } from './contants';

const defaultState = {
  isLogin: false,
};

export default (state, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS: {
      const newState = {
        ...state,
        isLogin: action.status,
      };
      return newState;
    }
    default:
      return defaultState;
  }
};
