import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  currentUser: userReducer,
});

export default rootReducer;
