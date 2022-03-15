import { render, act, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import PdfInterface from './PdfMenu';

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
    expect(screen.getByText('PDF to image')).toBeInTheDocument();
    expect(screen.getByText('Image to PDF')).toBeInTheDocument();
  });

  it('navigates to the split function upon clicking', () => {
    userEvent.click(screen.getByText('PDF to image'));
    expect(global.window.location.pathname).toBe('/pdf-tool/split');
  });

  it('navigates to the split function upon clicking', () => {
    userEvent.click(screen.getByText('Image to PDF'));
    expect(global.window.location.pathname).toBe('/pdf-tool/merge');
  });
});
