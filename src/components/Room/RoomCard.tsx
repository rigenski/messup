interface RoomDetail {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

interface RoomCardProps {
  data: RoomDetail;
  setCode: (code: number) => void;
}

const RoomCard = (props: RoomCardProps) => {
  return (
    <>
      <a
        href="#join__room-form"
        className="card bg-primary cursor-pointer p-2 mb-3 w-100 text-decoration-none"
        onClick={() => props.setCode(props.data.code)}
      >
        <div className="card-title d-flex justify-content-between">
          <small className="text-white">{props.data.name}</small>
          <small className="text-white">
            {props.data.createdAt.slice(0, 10)}
          </small>
        </div>
        <div className="card-body pt-0">
          <h1 className="card-title text-light text-center mb-0">
            #{props.data.code}
          </h1>
        </div>
      </a>
    </>
  );
};

export default RoomCard;
