import {combineReducers} from 'redux';

import {AuthReducer} from './auth.reducer';
// const persistPostConfigs = {
//   key: 'postKey',
//   timeout: 1000,
//   storage: AsyncStorage,
//   whitelist: ['post'],
//   serialize: true,
// };
const RootReducer = combineReducers({
  AuthReducer,

  //ThemeChange,
});

export default RootReducer;
