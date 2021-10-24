import axios from 'axios';
import { useEffect, useState } from 'react';

interface RoomFormProps {
  code: number | undefined;
  getDataRooms: () => void;
  setRoom: (data: any) => void;
}

const RoomForm = (props: RoomFormProps) => {
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<number>(0);

  const setStateDefaults = (): void => {
    setName('');
    setCode(0);
  };

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
    };

    await axios
      .post('room/create', data)
      .then((res: any) => {
        setStateDefaults();

        props.getDataRooms();
      })
      .catch((err) => {
        setStateDefaults();

        console.log('error', err);
      });
  };

  const handleJoinRoom = async (e: any) => {
    e.preventDefault();

    await axios
      .get(`room/${code}`)
      .then((res: any) => {
        setStateDefaults();

        props.setRoom(res.data.result);

        localStorage.setItem('room', String(code));
      })
      .catch((err) => {
        setStateDefaults();

        console.log('error: ', err);
      });
  };

  useEffect(() => {
    if (props.code) {
      setCode(props.code);
    }
  }, [props.code]);

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
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
          <button type="submit" className="btn btn-primary ms-2">
            Join
          </button>
        </form>
      </div>
      <div className="collapse row mb-4" id="collapseCreate">
        <form
          onSubmit={(e) => handleCreateRoom(e)}
          className="d-flex col-12 col-md-8"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Name Room ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ms-2">
            Go
          </button>
        </form>
      </div>
    </>
  );
};

export default RoomForm;
