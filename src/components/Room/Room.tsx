import axios from 'axios';
import { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import RoomForm from './RoomForm';

interface UserDetail {
  _id: string;
  name: string;
  username: string;
  password: string;
  createdAt: any;
  updatedAt: any;
}

interface RoomProps {
  user: UserDetail | undefined;
  setRoom: (data: any) => void;
}

const Room = (props: RoomProps) => {
  const [rooms, setRooms] = useState([]);
  const [code, setCode] = useState<number | undefined>();

  const getDataRooms = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    await axios
      .get('room', config)
      .then((res: any) => {
        setRooms(res.data.result);
      })
      .catch((err: any) => {
        console.log('error: ', err);
      });
  };

  useEffect(() => {
    getDataRooms();
  }, []);

  return (
    <>
      <h2 className="text-center mb-4">List Room</h2>
      <RoomForm
        code={code}
        getDataRooms={() => getDataRooms()}
        setRoom={(data) => props.setRoom(data)}
      />
      <div className="mb-2">
        <h4 className="mb-4">My Room</h4>
        <div className="row mb-0">
          {rooms
            .slice(0)
            .reverse()
            .map((item: any, index) => {
              if (item.user_id === props.user?._id) {
                return (
                  <div key={index} className="col-6">
                    <RoomCard data={item} setCode={(code) => setCode(code)} />
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="mb-2">
        <h4 className="mb-4">Public Room</h4>
        <div className="row mb-0">
          {rooms
            .slice(0)
            .reverse()
            .map((item: any, index) => {
              if (item.user_id !== props.user?._id) {
                return (
                  <div key={index} className="col-6">
                    <RoomCard data={item} setCode={(code) => setCode(code)} />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Room;
