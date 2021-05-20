import { createContext } from 'react';

export interface IThemeContext {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>(null);

export default ThemeContext;
