import IllustrationRoom from './../../assets/images/illustration-room.png';

const ChatNull = () => {
  return (
    <>
      <div className="auth-box d-flex flex-column justify-content-center align-items-center bg-secondary rounded-bottom-lg">
        <img
          src={IllustrationRoom}
          alt=""
          className="mb-4"
          style={{ width: '60%' }}
        />
        <h4 className="text-primary mb-4">Select Room</h4>
      </div>
    </>
  );
};

export default ChatNull;
