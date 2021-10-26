import ChatBox from './ChatBox';

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

interface ChatListProps {
  chats: IChat[];
}

const ChatList = (props: ChatListProps) => {
  return (
    <>
      <div className="chat-box pt-4 px-2 d-flex flex-column align-items-center bg-secondary overflow-y-scroll">
        {props.chats.map((item, index) => {
          return <ChatBox key={index} chat={item} />;
        })}
      </div>
    </>
  );
};

export default ChatList;
