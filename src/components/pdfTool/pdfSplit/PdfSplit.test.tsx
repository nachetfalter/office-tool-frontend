import { render, act, screen, cleanup, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import PdfSplit from './PdfSplit';
import * as uploadModule from '../../../utility/upload';

jest.mock('../../../utility/dom');
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

  const fillForm = () => {
    const pageNameInput = screen.getByLabelText('Output Page Name');
    if (pageNameInput) {
      fireEvent.change(pageNameInput, { target: { value: 'testPage' } });
    }

    fireEvent.mouseDown(screen.getAllByRole('button')[0]);
    const options = within(screen.getByRole('listbox'));
    fireEvent.click(options.getByText('Page Split (Horizontal)'));

    const fileContent = '{ "name": "test file" }';
    const blob = new Blob([fileContent]);
    const file = new File([blob], 'test.pdf', {
      type: 'application/PDF',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
    const fileUpload = screen.getByTestId('pdf-upload');
    userEvent.upload(fileUpload, file);
  };

  it('renders title and all buttons', () => {
    expect(screen.getByText('PDF Split Tool')).toBeInTheDocument();
    expect(screen.queryAllByText('Output Page Name')).toBeTruthy();
    expect(screen.queryAllByText('Page Options')).toBeTruthy();
    expect(screen.getByText('Upload A PDF File')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('allows users to set page name, page option and upload file', async () => {
    fillForm();
    expect((screen.getByLabelText('Output Page Name') as HTMLInputElement).value).toBe('testPage');
    expect(screen.queryAllByText('Page Split (Horizontal)')).toBeTruthy();
    await waitFor(() => expect(screen.queryByText('test.pdf')).toBeTruthy());
  });

  it('automatically sanitises page name upon input', async () => {
    const pageNameInput = screen.getByLabelText('Output Page Name');
    if (pageNameInput) {
      fireEvent.change(pageNameInput, { target: { value: 'testPage+[]' } });
      expect((pageNameInput as HTMLInputElement).value).toBe('testPage ');
      fireEvent.change(pageNameInput, { target: { value: '0123456789012345678901234567891' } });
      await waitFor(() => expect(screen.queryByText('The page name cannot be more than 30 characters')).toBeTruthy());
      expect((pageNameInput as HTMLInputElement).value).toBe('testPage ');
    } else {
      fail('Cannot find page name input');
    }
  });

  it('disallows uploading invalid file', async () => {
    const fileContent = '{ "name": "test file" }';
    const blob = new Blob([fileContent]);
    const file = new File([blob], 'test.png', {
      type: 'image/png',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
    const fileUpload = screen.getByTestId('pdf-upload');
    userEvent.upload(fileUpload, file);
    await waitFor(() =>
      expect(screen.queryByText('The input file is either too big (>150Mb) or has an invalid type')).toBeTruthy(),
    );
  });

  it('prevents user from submitting the form unless all fields are filled', async () => {
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
    mockedAxios.post.mockResolvedValue({
      data: new ArrayBuffer(8),
    });
    jest.spyOn(uploadModule, 'uploadFile').mockResolvedValue(true);
    global.URL.createObjectURL = jest.fn();

    fillForm();
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.queryByText('Process Finished')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('test.pdf')).toBeFalsy());
    await waitFor(() => expect(screen.queryByText('Submit')).toBeDisabled());
  });

  it('displays an error message if the file upload to s3 failed', async () => {
    jest.spyOn(uploadModule, 'uploadFile').mockResolvedValue(false);

    global.URL.createObjectURL = jest.fn();
    fillForm();
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(screen.queryByText('Sorry, an error has happened, please raise an issue on GitHub.')).toBeTruthy(),
    );
  });

  it('displays an error message if the call to the backend fails', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          errors: ['testError'],
        },
      },
    });
    jest.spyOn(uploadModule, 'uploadFile').mockResolvedValue(true);

    global.URL.createObjectURL = jest.fn();
    fillForm();
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.queryByText('testError')).toBeTruthy());
  });
});
