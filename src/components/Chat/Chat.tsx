import { useEffect, useState } from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import ChatForm from './ChatForm';
import ChatList from './ChatList';

interface UserDetail {
  _id: string;
  name: string;
  username: string;
  password: string;
  createdAt: any;
  updatedAt: any;
}

interface RoomDetail {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

interface ChatProps {
  user: UserDetail | undefined;
  room: RoomDetail | undefined;
  handleAuth: () => void;
  handleLogout: () => void;
}

const Chat = (props: ChatProps) => {
  const [register, isRegister] = useState<boolean>(false);
  const [login, isLogin] = useState<boolean>(true);

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

  const handleAuth = () => {
    props.handleAuth();
  };

  const handleLogout = () => {
    props.handleLogout();
    setStateDefaults();
  };

  useEffect(() => {
    if (props.user) {
      isRegister(false);
      isLogin(false);
    }
  }, [props.user]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="chat-wrapper bg-dark shadow-lg rounded-xl px-2 py-2">
          <div className="bg-primary d-flex justify-content-between align-items-center rounded-top-lg px-2 py-3">
            {props.user ? (
              <h5
                className="text-light ms-2 mb-0 cursor-pointer"
                onClick={() => handleLogout()}
              >
                {props.user.name}
              </h5>
            ) : (
              <h4 className="text-light ms-2 mb-0">Messup</h4>
            )}
            <h5 className="text-light me-2 mb-0">#{props.room?.code}</h5>
          </div>
          {register ? (
            <Register setLogin={() => setLogin()} />
          ) : login ? (
            <Login
              setRegister={() => setRegister()}
              handleAuth={() => handleAuth()}
            />
          ) : (
            <ChatList room={props.room} />
          )}
          <ChatForm room={props.room} />
        </div>
      </div>
    </>
  );
};

export default Chat;
