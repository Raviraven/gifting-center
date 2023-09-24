import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

type ColorModes = 'light' | 'dark';

export const ColorModeContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [mode, setMode] = useState<ColorModes>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem('colorMode', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#121212' : '#a2d4bf',
            paper: mode === 'dark' ? '#121212' : '#ffeab4', //'#f2d799',
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    const savedInLocal = localStorage.getItem('colorMode');
    setMode(savedInLocal ? (savedInLocal as ColorModes) : 'light');
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
