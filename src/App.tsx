import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Room from './components/Room/Room';

interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
  createdAt: any;
  updatedAt: any;
}

interface Room {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

function App() {
  const [user, setUser] = useState<User>();
  const [room, setRoom] = useState<Room>();

  const setStateDefaults = () => {
    setUser(undefined);
  };

  const handleAuth = () => {
    const token = localStorage.getItem('token');

    if (token) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      axios.get('auth/profile', config).then(
        (res: any) => {
          setUser(res.data.result);

          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      setStateDefaults();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    handleAuth();
  };

  const getDataRoom = async () => {
    const token = localStorage.getItem('token');
    const code = localStorage.getItem('room');

    if (token) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      if (code) {
        await axios
          .get(`room/${code}`, config)
          .then((res: any) => {
            setRoom(res.data.result);

            localStorage.setItem('room', code);
          })
          .catch((err) => {
            console.log('error: ', err);
          });
      }
    }
  };

  useEffect(() => {
    handleAuth();
    getDataRoom();
  }, []);

  return (
    <>
      <main>
        <div className="container my-3 my-md-5">
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-5 mb-5">
              <Chat
                user={user}
                room={room}
                handleAuth={() => handleAuth()}
                handleLogout={() => handleLogout()}
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-7 mb-5">
              {user ? (
                <Room user={user} setRoom={(data) => setRoom(data)} />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
