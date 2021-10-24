import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatBadge from './ChatBadge';
import ChatBox from './ChatBox';

interface RoomDetail {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

interface ChatListProps {
  room: RoomDetail | undefined;
}

const ChatList = (props: ChatListProps) => {
  const [chats, setChats] = useState([]);

  const getDataChats = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios
      .get(`chat/${props.room?._id}`, config)
      .then((res: any) => {
        setChats(res.data.result);
      })
      .catch((err: any) => {
        console.log('error: ', err);
      });
  };

  useEffect(() => {
    getDataChats();
  }, []);

  return (
    <>
      <div className="chat-box d-flex flex-column align-items-center overflow-y-scroll bg-light pt-4 px-2">
        <ChatBadge />
        {chats.map((item, index) => {
          return <ChatBox key={index} send={true} data={item} />;
        })}
      </div>
    </>
  );
};

export default ChatList;
