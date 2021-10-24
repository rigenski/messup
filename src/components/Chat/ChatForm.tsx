import axios from 'axios';
import { useState } from 'react';

interface RoomDetail {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

interface ChatFormProps {
  room: RoomDetail | undefined;
}

const ChatForm = (props: ChatFormProps) => {
  const [text, setText] = useState('');

  const setStateDefaults = () => {
    setText('');
  };

  const handleCreateChat = async (e: any) => {
    e.preventDefault();

    const data = {
      text: text,
      room_id: props.room?._id,
    };

    await axios
      .post('chat/create', data)
      .then((res: any) => {
        setStateDefaults();
      })
      .catch((err) => {
        setStateDefaults();

        console.log('error', err);
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => handleCreateChat(e)}
        className="d-flex bg-light rounded-bottom-lg px-2 py-2"
      >
        <input
          type="text"
          className="form-control rounded-pill px-3 me-2"
          placeholder="Type in here ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn bg-primary rounded-pill px-2">
          <i className="bi bi-cursor-fill px-1 text-white"></i>
        </button>
      </form>
    </>
  );
};

export default ChatForm;
