import { useState, useContext, useEffect } from 'react';
import RoomCard from './RoomCard';
import RoomForm from './RoomForm';
import { ThemeContext } from './../../context/ThemeContext';
import socket from '../../config/socket/ThemeSocket';

interface IRoom {
  _id: string;
  code: Number;
  name: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
}

const Room = () => {
  const { state } = useContext(ThemeContext);

  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [code, setCode] = useState<Number>(0);

  useEffect(() => {
    socket.on('room', (room: any) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);

  useEffect(() => {
    socket.emit('get-rooms-history');
    socket.on('get-rooms', (rooms: any) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <>
      <h2 className="mb-4 text-dark text-center ">Messup</h2>
      <RoomForm code={code} />
      <div className="mb-2">
        <h4 className="mb-4 text-dark ">My Room</h4>
        <div className="mb-0 row">
          {rooms
            .slice(0)
            .reverse()
            .map((item: any, index: any) => {
              if (item.user_id === state.user?._id) {
                return (
                  <div key={index} className="col-6">
                    <RoomCard room={item} setCode={(code) => setCode(code)} />
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="mb-2">
        <h4 className="mb-4 text-dark">Public Room</h4>
        <div className="mb-0 row">
          {rooms
            .slice(0)
            .reverse()
            .map((item: any, index: any) => {
              if (item.user_id !== state.user?._id) {
                return (
                  <div key={index} className="col-6">
                    <RoomCard room={item} setCode={(code) => setCode(code)} />
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
