import { render, act, screen, cleanup, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import PdfSplit from './PdfSplit';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PdfSplit', () => {
  beforeEach(() => {
    act(() => {
      render(<PdfSplit />);
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders title and all buttons', () => {
    expect(screen.getByText('PDF Split Tool')).toBeInTheDocument();
    expect(screen.queryAllByText('Output Page Name')).toBeTruthy();
    expect(screen.queryAllByText('Page Options')).toBeTruthy();
    expect(screen.getByText('Upload File')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('allows users to set page name, page option and upload file', async () => {
    // Test the page name input
    const pageNameInput = screen.getByLabelText('Output Page Name');
    if (pageNameInput) {
      fireEvent.change(pageNameInput, { target: { value: 'testPage' } });
      expect((pageNameInput as HTMLInputElement).value).toBe('testPage');
    } else {
      fail('Cannot find page name input');
    }
    // Test the page options
    fireEvent.mouseDown(screen.getAllByRole('button')[0]);
    const options = within(screen.getByRole('listbox'));
    fireEvent.click(options.getByText('Page Split (Horizontal)'));
    expect(screen.queryAllByText('Page Split (Horizontal)')).toBeTruthy();
    // Test the file upload
    const fileContent = '{ "name": "test file" }';
    const blob = new Blob([fileContent]);
    const file = new File([blob], 'test.pdf', {
      type: 'application/PDF',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
    const fileUpload = screen.getByTestId('pdf-upload');
    userEvent.upload(fileUpload, file);
    await waitFor(() => expect(screen.queryByText('test.pdf')).toBeTruthy());
  });

  it('disallows the user to submit the form unless all fields are filled', async () => {
    expect(screen.getByText('Submit')).toBeDisabled();

    const pageNameInput = screen.getByLabelText('Output Page Name');
    if (pageNameInput) {
      fireEvent.change(pageNameInput, { target: { value: 'testPage' } });
    } else {
      fail('Cannot find page name input');
    }
    expect(screen.getByText('Submit')).toBeDisabled();

    const fileContent = '{ "name": "test file" }';
    const blob = new Blob([fileContent]);
    const file = new File([blob], 'test.pdf', {
      type: 'application/PDF',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
    const fileUpload = screen.getByTestId('pdf-upload');
    userEvent.upload(fileUpload, file);
    await waitFor(() => expect(screen.queryByText('test.pdf')).toBeTruthy());
    expect(screen.getByText('Submit')).not.toBeDisabled();
  });

  it('resets file after submission', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data: new ArrayBuffer(8),
      }),
    );

    global.URL.createObjectURL = jest.fn();

    const pageNameInput = screen.getByLabelText('Output Page Name');
    if (pageNameInput) {
      fireEvent.change(pageNameInput, { target: { value: 'testPage' } });
    } else {
      fail('Cannot find page name input');
    }

    const fileContent = '{ "name": "test file" }';
    const blob = new Blob([fileContent]);
    const file = new File([blob], 'test.pdf', {
      type: 'application/PDF',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
    const fileUpload = screen.getByTestId('pdf-upload');
    userEvent.upload(fileUpload, file);
    await waitFor(() => expect(screen.queryByText('test.pdf')).toBeTruthy());

    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.queryByText('test.pdf')).toBeFalsy());
    await waitFor(() => expect(screen.queryByText('Submit')).toBeDisabled());
  });
});
