import { GET_ROOMS } from './RoomTypes';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_ROOMS:
      return {
        ...state,
        loading: false,
        rooms: payload,
      };
    default:
      return state;
  }
};
