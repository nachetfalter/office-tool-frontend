import { cleanup, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestThemeContext from './TestThemeContext';

describe('Theme Context', () => {
  beforeEach(() => {
    act(() => {
      render(<TestThemeContext />);
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('changes state to the opposite color mode upon being called', () => {
    expect(screen.queryByText('light mode')).toBeTruthy();
    const switchButton = screen.queryByText('Switch');
    if (switchButton) {
      userEvent.click(switchButton);
      expect(screen.queryByText('dark mode')).toBeTruthy();

      userEvent.click(switchButton);
      expect(screen.queryByText('light mode')).toBeTruthy();
    } else {
      fail('Cannot find the switch mode button');
    }
  });
});
