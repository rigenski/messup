interface IRoom {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

interface RoomCardProps {
  room: IRoom;
  setCode: (code: number) => void;
}

const RoomCard = (props: RoomCardProps) => {
  return (
    <>
      <a
        href="#"
        className="card mb-3 p-2 w-100 bg-primary text-decoration-none cursor-pointer"
        onClick={() => props.setCode(props.room.code)}
      >
        <div className="card-title d-flex justify-content-between">
          <small className="text-white">{props.room.name}</small>
          <small className="text-white">
            {props.room.createdAt.slice(0, 10)}
          </small>
        </div>
        <div className="card-body pt-0">
          <h1 className="card-title mb-0 text-light text-center">
            #{props.room.code}
          </h1>
        </div>
      </a>
    </>
  );
};

export default RoomCard;
