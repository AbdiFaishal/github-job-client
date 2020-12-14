import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from './../../context/userContext';
import { API, setAuthToken } from './../../config/api';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post('/auth/signin', user);
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      setAuthToken(data.token);

      const res = await API.get('/auth/check-auth');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.user,
      });

      if (res.data.user) {
        history.push('/home');
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };
  return (
    <div className="modal-parent">
      <div className="modal-background" onClick={() => {}}></div>
      <div className="login-modal">
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            type="username"
            placeholder="Username"
          />
          <input
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            type="password"
            placeholder="Password"
          />
          <button className="btn">Sign In</button>
        </form>

        <p>
          Don't have an account ? Click{' '}
          {/* <Link to="/" onClick={() => {}}>
            Here
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
