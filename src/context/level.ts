import { createContext } from 'react';

import { ILoggedProfile } from '../interfaces/Profile';

interface LevelContextProps {
  updateLevel: () => void;
  level: ILoggedProfile;
}

const LevelContext = createContext<LevelContextProps>(null);

export default LevelContext;
