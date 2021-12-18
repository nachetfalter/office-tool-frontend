import { render, act, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import PdfInterface from './PdfInterface';

describe('PdfInterface', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Router>
          <PdfInterface />
        </Router>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders title', () => {
    expect(screen.getByText('PDF Utility Tool')).toBeInTheDocument();
  });

  it('navigates to link upon clicking', () => {
    userEvent.click(screen.getByText('PDF Split'));
    expect(global.window.location.pathname).toBe('/pdf-tool/split');
  });
});
