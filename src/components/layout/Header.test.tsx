import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import { ThemeContext } from '../../context/theme-context';

describe('Header', () => {
  const switchTheme = jest.fn().mockImplementation(() => {
    return;
  });
  const customisedRender = (colorMode: 'light' | 'dark' = 'light') => {
    render(
      <ThemeContext.Provider value={{ switchTheme }}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: colorMode,
            },
          })}
        >
          <Header />
        </ThemeProvider>
      </ThemeContext.Provider>,
    );
  };

  beforeEach(() => {
    customisedRender();
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the site title, the children, menu icon and the color mode', () => {
    expect(screen.queryByText('Office Utility Tools')).toBeTruthy();
    expect(screen.queryByLabelText('menu')).toBeTruthy();
    expect(screen.queryByText('light mode')).toBeTruthy();
    expect(screen.queryByTestId('color-mode')).toBeTruthy();
  });

  it('calls the context switch function upon clicking the color mode', () => {
    const colorModeButton = screen.queryByTestId('color-mode');
    if (colorModeButton) {
      userEvent.click(colorModeButton);
      expect(switchTheme).toBeCalledTimes(1);
    } else {
      fail('The light mode button is not found');
    }
  });

  it('can render dark mode', () => {
    cleanup();
    customisedRender('dark');
    expect(screen.queryByText('dark mode')).toBeTruthy();
  });
});
