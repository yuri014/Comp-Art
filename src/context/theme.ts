import { createContext, Dispatch, SetStateAction } from 'react';

export interface IThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<IThemeContext>(null);

export default ThemeContext;
