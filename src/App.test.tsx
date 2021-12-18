import { render, act, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Router>
          <App />
        </Router>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the title', () => {
    expect(screen.getByText('Features')).toBeInTheDocument();
  });

  it('navigates to link upon clicking', () => {
    userEvent.click(screen.getByText('PDF Tool'));
    expect(global.window.location.pathname).toBe('/pdf-tool');
  });
});
