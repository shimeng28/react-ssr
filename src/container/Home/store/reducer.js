import { CHANGE_LIST } from './contants';

const defaultState = {
  name: '小时哥',
  newsList: [],
};

export default (state, action) => {
  switch (action.type) {
    case CHANGE_LIST: {
      const newState = {
        ...state,
        newsList: action.list,
      };
      return newState;
    }
    default:
      return defaultState;
  }
};
