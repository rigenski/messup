interface ChatDetail {
  _id: string;
  text: string;
  user_id: string;
  room_id: string;
  createdAt: any;
  updatedAt: any;
}

interface ChatBoxProps {
  send: boolean;
  data: ChatDetail;
}

const ChatBox = (props: ChatBoxProps) => {
  const { send } = props;
  return (
    <>
      {send ? (
        <div className="bg-primary ms-auto w-75 px-3 py-2 px-2 mb-2 rounded-3">
          <small className="m-0 text-white">{props.data.text}</small>
        </div>
      ) : (
        <div className="bg-secondary me-auto w-75 px-3 py-2 px-2 mb-2 rounded-3">
          <label
            className="text-primary font-weight-medium"
            style={{ fontSize: '0.8rem' }}
          >
            rygenzx
          </label>
          <small className="m-0 text-dark d-block">
            Praesent sapien massa, convallis a pellentesque nec, egestas non nis
          </small>
        </div>
      )}
    </>
  );
};

export default ChatBox;
