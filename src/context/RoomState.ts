import axios from 'axios';
import { useReducer } from 'react';

import RoomContext from './RoomContext';

import RoomReducer from './RoomReducer';

import { GET_ROOMS } from './RoomTypes';

const RoomState = ({ children }) => {
  const initialState = {
    rooms: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(RoomReducer, initialState);

  const getRooms = async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      await axios.get('room', config).then((res: any) => {
        dispatch({ type: GET_ROOMS, payload: res.data.result });
      });
    } catch (err) {
      console.log(err);
    }
  };
};
