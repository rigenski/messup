import axios from 'axios';
import { useState } from 'react';
import IllustrationLogin from './../../assets/images/illustration-login.png';

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
      <div className="auth-box d-flex flex-column justify-content-center align-items-center bg-secondary rounded-bottom-lg">
        <img
          src={IllustrationLogin}
          alt=""
          className="mb-4"
          style={{ width: '60%' }}
        />
        <h4 className="text-primary mb-4">Login</h4>
        <form onSubmit={(e) => handleLogin(e)} style={{ width: '75%' }}>
          <div className="mb-3">
            <div className="form-group mb-2 d-flex">
              <input
                type="text"
                className="form-control rounded-pill"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-2 d-flex">
              <input
                type="password"
                className="form-control rounded-pill"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-primary mb-2 w-100 rounded-pill"
            >
              CONTINUE
            </button>
            <a
              href="#"
              className="text-primary text-decoration-none"
              onClick={() => props.setRegister()}
            >
              Register ?
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

{
  /* <div className="form-group mb-2">
            <label htmlFor="username" className="text-primary">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="text-primary">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
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
          </div> */
}
