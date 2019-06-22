import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import homeReducer from 'Container/Home/store';
import loginReducer from 'Container/Login/store';

import ClientAxios from '../client/request';
import ServerAxios from '../server/request';

const reducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
});

// 服务器端store端内容，使用serverAxios
export const getStore = ctx => createStore(reducer,
  applyMiddleware(thunk.withExtraArgument(ServerAxios(ctx))));


export const getClientStore = () => {
  const defaultState = window.context.state;
  // 改变客户端store端内容，使用ClientAxios
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(ClientAxios)));
};
