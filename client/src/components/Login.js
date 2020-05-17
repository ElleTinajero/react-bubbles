import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    usename:'',
    password:''
  });

  const history = useHistory();

  const handleChange = e => {
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('./api/login', login)
      .then((res) => {
          localStorage.setItem('token', res.data.payload);
          history.push('/bubble-page');
      })
      .catch(err => {
        console.log(err);
        alert('Username or password is incorrect')
      })
  }

  return (
    <>
     <h1>Please Login to view this super cool hex color website</h1>
     <form onSubmit={handleSubmit}>
       <input 
          type='text'
          name='username'
          placeholder='Username'
          value={login.username} 
          onChange={handleChange}
        />

        <input 
          type='password'
          name='password'
          placeholder='Password'
          value={login.password} 
          onChange={handleChange}
        />

        <button>Login</button>
     </form>
    </>
  );
};

export default Login;
