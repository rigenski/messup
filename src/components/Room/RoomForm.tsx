import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import socket from '../../config/socket/ThemeSocket';
import { ThemeContext } from '../../context/ThemeContext';

interface RoomFormProps {
  code: Number;
}

const RoomForm = (props: RoomFormProps) => {
  const { state, dispatch } = useContext(ThemeContext);

  const [name, setName] = useState<String>('');
  const [code, setCode] = useState<any>(0);

  const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit('store-room', name, state.user._id);
    setName('');
  };

  const setStateDefaults = (): void => {
    setName('');
    setCode(0);
  };

  const handleJoinRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .get(`room/${code}`)
      .then((res: any) => {
        setStateDefaults();

        dispatch({ type: 'GET_ROOM', payload: res.data.result });

        localStorage.setItem('room', String(code));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCode(props.code);
  }, [props.code]);

  return (
    <>
      <div className="mb-4 d-flex justify-content-between">
        <button
          className="btn btn-primary"
          data-toggle="collapse"
          data-target="#collapseCreate"
          aria-expanded="false"
          aria-controls="collapseCreate"
        >
          Create
        </button>
        <form
          onSubmit={(e) => handleJoinRoom(e)}
          id="join__room-form"
          className="d-flex"
        >
          <input
            type="number"
            className="form-control"
            placeholder="Input Code ..."
            value={code === 0 ? '' : code}
            onChange={(e) => setCode(parseInt(e.target.value))}
          />
          <button type="submit" className="ms-2 btn btn-primary">
            Join
          </button>
        </form>
      </div>
      <div className="mb-4 collapse row" id="collapseCreate">
        <form
          onSubmit={(e) => handleCreateRoom(e)}
          className="d-flex col-12 col-md-8"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Name Room ..."
            value={String(name)}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="ms-2 btn btn-primary">
            Go
          </button>
        </form>
      </div>
    </>
  );
};

export default RoomForm;
