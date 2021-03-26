import { useState } from 'react';

import { IThemeContext } from '../context/theme';

const useTheme = (): IThemeContext => {
  const [theme, setTheme] = useState('');
  return { theme, setTheme };
};

export default useTheme;
