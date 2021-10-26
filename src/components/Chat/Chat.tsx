import { useContext, useEffect, useState } from 'react';
import socket from '../../config/socket/ThemeSocket';
import { ThemeContext } from '../../context/ThemeContext';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ChatForm from './ChatForm';
import ChatList from './ChatList';

interface IChatProps {
  handleAuth: () => void;
}

interface IUser {
  _id: String;
  name: String;
  username: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
}

interface IChat {
  _id: any;
  text: String;
  user_id: IUser;
  room_id: String;
  createdAt: Date;
  updatedAt: Date;
}

const Chat = (props: IChatProps) => {
  const { state, dispatch } = useContext(ThemeContext);

  const [register, isRegister] = useState<Boolean>(false);
  const [login, isLogin] = useState<Boolean>(true);

  const [chats, setChats] = useState<IChat[]>([]);

  const setStateDefaults = () => {
    isRegister(false);
    isLogin(true);
  };

  const setRegister = () => {
    isRegister(true);
    isLogin(false);
  };

  const setLogin = () => {
    isRegister(false);
    isLogin(true);
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_LOGIN', payload: false });

    localStorage.removeItem('token');

    props.handleAuth();

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  };

  useEffect(() => {
    if (state.user?._id && state.room?._id) {
      socket.emit('join', {
        user_id: state.user._id,
        room_id: state.room._id,
      });
    }
  }, [state.room]);

  useEffect(() => {
    socket.on('chat', (chat: any) => {
      setChats([...chats, chat]);
    });
  }, [chats]);

  useEffect(() => {
    socket.emit('get-chats-history', state.room._id);
    socket.on('get-chats', (chat: any) => {
      setChats(chat);
    });
  }, [state.room]);

  useEffect(() => {
    if (state.isLogin) {
      isRegister(false);
      isLogin(false);
    } else {
      setStateDefaults();
    }
  }, [state.isLogin]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="chat-wrapper px-2 py-2 bg-dark rounded-xl shadow-lg">
          <div className="px-2 py-3 d-flex justify-content-between align-items-center bg-primary rounded-top-lg">
            {state.isLogin ? (
              <h5
                className="ms-2 mb-0 text-light cursor-pointer"
                onClick={() => handleLogout()}
              >
                {state.user.name}
              </h5>
            ) : (
              <h4 className="ms-2 mb-0 text-light">Messup</h4>
            )}
            <h5 className="me-2 mb-0 text-light">#{state.room.code}</h5>
          </div>
          {register ? (
            <Register setLogin={() => setLogin()} />
          ) : login ? (
            <Login
              setRegister={() => setRegister()}
              handleAuth={() => props.handleAuth()}
            />
          ) : (
            <>
              <ChatList chats={chats} />
              <ChatForm />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
