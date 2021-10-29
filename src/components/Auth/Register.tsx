import axios from 'axios';
import { useState } from 'react';
import IllustrationRegister from './../../assets/images/illustration-register.png';

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
        <img
          src={IllustrationRegister}
          alt=""
          className="mb-4"
          style={{ width: '60%' }}
        />
        <h4 className="text-primary mb-4">Register</h4>
        <form onSubmit={(e) => handleRegister(e)} style={{ width: '75%' }}>
          <div className="mb-3">
            <div className="form-group mb-2 d-flex">
              <input
                type="text"
                className="form-control rounded-pill "
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </div>
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
              CREATE
            </button>
            <a
              href="#"
              className="text-primary text-decoration-none"
              onClick={() => props.setLogin()}
            >
              Login ?
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

{
  /* <div className="form-group mb-2">
            <label htmlFor="name" className="text-primary">
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
            <label htmlFor="username" className="text-primary">
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
            <label htmlFor="password" className="text-primary">
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
          </div> */
}
