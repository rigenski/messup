import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface IUser {
  _id: String;
  name: String;
  username: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
}

interface IChat {
  _id: String;
  text: String;
  user_id: IUser;
  room_id: String;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatBoxProps {
  chat: IChat;
}

const ChatBox = (props: ChatBoxProps) => {
  const { state } = useContext(ThemeContext);

  return (
    <>
      {props.chat.user_id?._id === state.user?._id ? (
        <div className="ms-auto px-3 py-2 px-2 mb-2 w-75 bg-primary rounded-3 shadow-sm">
          <small className="m-0 text-white">{props.chat.text}</small>
        </div>
      ) : (
        <div className="me-auto px-3 py-2 px-2 mb-2 w-75 bg-light rounded-3 shadow-sm">
          <label
            className="text-primary font-weight-medium"
            style={{ fontSize: '0.86rem' }}
          >
            {props.chat.user_id?.name}
          </label>
          <small className="m-0 text-dark d-block">{props.chat.text}</small>
        </div>
      )}
    </>
  );
};

export default ChatBox;
