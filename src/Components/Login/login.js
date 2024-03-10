// LoginComponent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/Reducers/getUserInfo';
import axios from 'axios';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.10.22:5009/login_iwaki', {
        user_name: username,
        user_pw: password,
      });

      // Assume the API response contains user information
      const userData = response.data;
      console.log(userData);
      dispatch(setUser(userData));

      if(userData.user_role === 1){
        
      }

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
