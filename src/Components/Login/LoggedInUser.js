// LoggedInUserInfoComponent.js
import React from 'react';
import { useSelector } from 'react-redux';

const LoggedInUserInfoComponent = () => {
  const userInfo = useSelector((state) => state.user);

  console.log('User Info:', userInfo);

  return (
    <div>
      <h2>User Information</h2>
      <p>User Role: {userInfo.user_role}</p>
      <p>User ID: {userInfo.user_id}</p>
      <p>MSNV: {userInfo.user_msnv}</p>
      <p>FULLNAME:{userInfo.user_fullname}</p>
      <p>Is Active: {userInfo.is_active}</p>
    </div>
  );
};

export default LoggedInUserInfoComponent;
