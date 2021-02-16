import { createContext } from 'react';

interface LevelContextProps {
  updateLevel: () => void;
  level: number;
}

const LevelContext = createContext<LevelContextProps>(null);

export default LevelContext;
