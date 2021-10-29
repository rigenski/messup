import axios from 'axios';
import { useContext, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Room from './components/Room/Room';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { state, dispatch } = useContext(ThemeContext);

  const handleAuth = () => {
    const token = localStorage.getItem('token');

    if (token) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      axios
        .get('auth/profile', config)
        .then((res: any) => {
          dispatch({ type: 'GET_USER', payload: res.data.result });
          dispatch({ type: 'SET_LOGIN', payload: true });

          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token');
        })
        .catch((err) => {
          localStorage.setItem('token', '');

          console.log('error: ', err.message);
        });
    } else {
      dispatch({ type: 'GET_USER', payload: null });
      dispatch({ type: 'SET_LOGIN', payload: false });
    }
  };

  const getDataRoom = async () => {
    const code = localStorage.getItem('room');

    if (code) {
      await axios
        .get(`room/${code}`)
        .then((res: any) => {
          dispatch({ type: 'GET_ROOM', payload: res.data.result });
          dispatch({ type: 'GET_ROOM', payload: res.data.result });
        })
        .catch((err: any) => {
          console.log('error: ', err.message);
        });
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      getDataRoom();
    }
  }, [state.isAuthenticated]);

  return (
    <>
      <main>
        <div className="container my-3 my-md-5">
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-5 mb-5">
              <Chat handleAuth={() => handleAuth()} />
            </div>
            <div className="col-12 col-lg-6 col-xl-7 mb-5">
              {state.isAuthenticated ? <Room /> : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
