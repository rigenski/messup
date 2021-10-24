import axios from 'axios';
import { useState } from 'react';

interface LoginProps {
  setRegister: () => void;
  handleAuth: () => void;
}

const Login = (props: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setStateDefaults = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    await axios
      .post('auth/login', data)
      .then((res: any) => {
        setStateDefaults();

        localStorage.setItem('token', res.data.token);

        props.handleAuth();
      })
      .catch((err) => {
        setStateDefaults();

        console.log('error:', err);
      });
  };

  return (
    <>
      <div className="chat-box d-flex flex-column justify-content-center align-items-center bg-light">
        <h4>Login</h4>
        <form onSubmit={(e) => handleLogin(e)} style={{ width: '75%' }}>
          <div className="form-group mb-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <a
              href="#"
              className="text-primary text-decoration-none"
              onClick={() => props.setRegister()}
            >
              Register ?
            </a>
            <button type="submit" className="btn btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
