import useGetLevel from '@hooks/getLevel';
import React, { createContext } from 'react';

import { ILoggedProfile } from '../interfaces/Profile';

interface LevelContextProps {
  updateLevel: () => void;
  level: ILoggedProfile;
}

export const LevelContext = createContext<LevelContextProps>(null);

export const LevelProvider: React.FC = ({ children }) => {
  const { getLevel, profileLevel } = useGetLevel();

  return (
    <LevelContext.Provider
      value={{ updateLevel: getLevel, level: profileLevel }}
    >
      {children}
    </LevelContext.Provider>
  );
};
