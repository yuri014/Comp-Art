/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import React, { createContext, useReducer } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cookie from 'js-cookie';

import { IUser } from '../interfaces/User';
import { initializeApollo } from '../graphql/apollo/config';

interface IAction {
  type: string;
  payload?: unknown;
}

const initialState = {
  user: null,
};

if (Cookie.get('jwtToken')) {
  const decodedToken = jwtDecode<JwtPayload>(Cookie.get('jwtToken'));

  initialState.user = decodedToken;
}

interface IState {
  user: IUser | null;
  login?: (data: IUser) => void;
  logout?: () => void;
}

const AuthContext = createContext<IState>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (data: IUser) => {},
  logout: () => {},
});

const authReducer = (state: { user: IState }, action: IAction) => {
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
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data: IUser) => {
    Cookie.set('jwtToken', data.token, {
      expires: 2,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    Cookie.get('jwtToken');
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };

  const logout = () => {
    Cookie.remove('jwtToken');
    const client = initializeApollo();

    client.clearStore();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user as IUser, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
