import axios from 'axios';

export const signup = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios.post('/api/v1', user, config);
};
export const signin = async (user) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios.post('/api/v1/signin', user, config);
};
export const updateCurrentUserInLocalStorage = (user, next) => {
  if(localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const updatedCurrentUser = {...currentUser, ...user}
    localStorage.setItem('currentUser', JSON.stringify((updatedCurrentUser)))
    next()
  }
}