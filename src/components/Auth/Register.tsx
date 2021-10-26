import axios from 'axios';
import { useState } from 'react';

interface RegisterProps {
  setLogin: () => void;
}

const Register = (props: RegisterProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setStateDefaults = () => {
    setName('');
    setUsername('');
    setPassword('');
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      username: username,
      password: password,
    };

    await axios
      .post('auth/register', data)
      .then((res) => {
        setStateDefaults();

        props.setLogin();
      })
      .catch((err) => {
        setStateDefaults();
      });
  };

  return (
    <>
      <div className="auth-box d-flex flex-column justify-content-center align-items-center bg-secondary rounded-bottom-lg">
        <h4 className="text-dark">Register</h4>
        <form onSubmit={(e) => handleRegister(e)} style={{ width: '75%' }}>
          <div className="form-group mb-2">
            <label htmlFor="name" className="text-dark">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="username" className="text-dark">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="text-dark">
              Password
            </label>
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
              className="text-primary"
              onClick={() => props.setLogin()}
            >
              Login ?
            </a>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
