import { useMemo, useState, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface themeContextType {
  switchTheme: () => void;
}

export const ThemeContext = createContext<themeContextType>({
  /* istanbul ignore next */
  switchTheme: () => {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: Props): JSX.Element => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const switchMode = () => {
    setMode((prevMode) => {
      return prevMode === 'dark' ? 'light' : 'dark';
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ switchTheme: switchMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
