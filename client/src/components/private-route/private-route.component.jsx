import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ ...rest }) => {
  const { currentUser } = useSelector((state) => ({ ...state }));
  return currentUser?.token ? <Route {...rest} /> : <Redirect to='/signin' />;
};

export default PrivateRoute;
