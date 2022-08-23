import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}
