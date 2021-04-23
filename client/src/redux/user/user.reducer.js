import UserActionTypes from './user.types';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case UserActionTypes.USER_SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
