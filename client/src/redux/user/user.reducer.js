import UserActionTypes from './user.types';

let INITIAL_STATE;

if (window.localStorage.getItem('currentUser')) {
  INITIAL_STATE = JSON.parse(window.localStorage.getItem('currentUser'));
} else {
  INITIAL_STATE = null;
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case UserActionTypes.USER_SIGN_OUT:
      return null;
    default:
      return state;
  }
};

export default userReducer;
