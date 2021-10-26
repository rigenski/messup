import React, { useReducer, createContext, FC } from 'react';

interface IUser {
  _id: String;
  name: String;
  username: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
}

interface IRoom {
  _id: String;
  code: Number;
  name: String;
  user_id: String;
  createdAt: Date;
  updatedAt: Date;
}

interface IState {
  user: IUser | any;
  room: IRoom | any;
  isLogin: Boolean;
}

const initialState = {
  user: [],
  room: [],
  isLogin: false,
};

const ThemeContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_ROOM':
      return {
        ...state,
        room: action.payload,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
};

const ThemeProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
