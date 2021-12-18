import { useContext } from 'react';
import { ThemeContextProvider, ThemeContext } from './theme-context';
import { useTheme } from '@mui/material/styles';

const TestThemeContextContent = () => {
  const { switchTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <>
      <p>{theme.palette.mode === 'light' ? 'light mode' : 'dark mode'}</p>
      <button onClick={switchTheme}>Switch</button>
    </>
  );
};

const TestThemeContext = () => {
  return (
    <ThemeContextProvider>
      <TestThemeContextContent />
    </ThemeContextProvider>
  );
};

export default TestThemeContext;
