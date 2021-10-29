import { FormEvent, useContext, useState } from 'react';
import socket from '../../config/socket/ThemeSocket';
import { ThemeContext } from '../../context/ThemeContext';

const ChatForm = () => {
  const { state } = useContext(ThemeContext);

  const [text, setText] = useState<String>('');

  const handleCreateChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text) {
      socket.emit('store-chat', text, state.room._id, () => {
        setText('');
      });
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleCreateChat(e)}
        className="px-2 py-2 d-flex bg-secondary rounded-bottom-lg"
      >
        <input
          type="text"
          className="form-control px-3 me-2 rounded-pill"
          placeholder="Type in here ..."
          value={String(text)}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-pill">
          <i className="bi bi-cursor-fill px-1 text-white"></i>
        </button>
      </form>
    </>
  );
};

export default ChatForm;
