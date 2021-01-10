/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import React, { createContext, useReducer } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { IUser } from '../interfaces/User';

interface IAction {
  type: string;
  payload?: unknown;
}

const initialState = {
  user: null,
};

const checkWindow = typeof window !== 'undefined';

if (checkWindow && localStorage.getItem('jwtToken') !== 'undefined') {
  const decodedToken = jwtDecode<JwtPayload>(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

interface IState {
  user: IUser | null;
}

const AuthContext = createContext({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (data: IUser) => {},
  logout: () => {},
});

const authReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = props => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (data: IUser) => {
    if (checkWindow) {
      localStorage.setItem('jwtToken', data.token);
    }
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
