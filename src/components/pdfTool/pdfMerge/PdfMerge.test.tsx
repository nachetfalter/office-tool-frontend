import { act, screen, render, cleanup, waitFor, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { makeDnd, mockGetComputedStyle, mockDndSpacing, DND_DIRECTION_DOWN } from 'react-beautiful-dnd-test-utils';
import PdfMerge from './PdfMerge';
import * as uploadModule from '../../../utility/upload';

jest.mock('../../../utility/dom');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const verifyFileOrderInColumn = (listTestId: string, orderedFiles: string[]): void => {
  const texts = within(screen.getByTestId(listTestId))
    .getAllByTestId('item')
    .map((x) => x.textContent);
  expect(texts).toEqual(orderedFiles);
};

describe('PdfMerge', () => {
  beforeEach(() => {
    act(() => {
      const { container } = render(<PdfMerge />);
      const fileContent = '{ "name": "test file" }';
      const blob = new Blob([fileContent]);
      const fileOne = new File([blob], 'test-1.png', {
        type: 'image/png',
      });
      const fileTwo = new File([blob], 'test-2.jpeg', {
        type: 'image/jpeg',
      });
      File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
      const fileUpload = screen.getByTestId('images-upload');
      userEvent.upload(fileUpload, [fileOne, fileTwo]);
      mockDndSpacing(container);
      mockGetComputedStyle();
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('has a title, a upload button and a submit button in the initial state', () => {
    expect(screen.queryByText('PDF Merge Tool')).toBeTruthy();
    expect(screen.queryByLabelText('Output PDF Name')).toBeTruthy();
    expect(screen.queryByText('Upload PNG/JPEGs')).toBeTruthy();
    expect(screen.queryByText('Submit')).toBeTruthy();
    expect(screen.queryByText('Submit')?.closest('button')).toBeDisabled();
  });

  it('allows user to upload png/jpegs and set the output file name', async () => {
    const outputFileNameInput = screen.getByLabelText('Output PDF Name');
    if (outputFileNameInput) {
      fireEvent.change(outputFileNameInput, { target: { value: 'test' } });
      expect((outputFileNameInput as HTMLInputElement).value).toBe('test');
    } else {
      fail('Cannot find output PDF name input');
    }

    await waitFor(() => expect(screen.queryByText('test-1.png')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('test-2.jpeg')).toBeTruthy());
    expect(screen.queryByText('Submit')?.closest('button')).not.toBeDisabled();
  });

  it('automatically sanitises page name upon input', async () => {
    const outputFileNameInput = screen.getByLabelText('Output PDF Name');
    if (outputFileNameInput) {
      fireEvent.change(outputFileNameInput, { target: { value: 'test+[]' } });
      expect((outputFileNameInput as HTMLInputElement).value).toBe('test ');
      fireEvent.change(outputFileNameInput, { target: { value: '0123456789012345678901234567891' } });
      await waitFor(() =>
        expect(screen.queryByText('The output file name cannot be more than 30 characters')).toBeTruthy(),
      );
      expect((outputFileNameInput as HTMLInputElement).value).toBe('test ');
    } else {
      fail('Cannot find output PDF name input');
    }
  });

  it('prevents user from uploading invalid files', async () => {
    const fileContent = '{ "name": "test file" }';
    const blob = new Blob([fileContent]);
    const invalidFile = new File([blob], 'test-3.pdf', {
      type: 'application/pdf',
    });
    File.prototype.text = jest.fn().mockResolvedValueOnce(fileContent);
    const fileUpload = screen.getByTestId('images-upload');
    userEvent.upload(fileUpload, [invalidFile]);
    await waitFor(() =>
      expect(screen.queryByText('One of the input image is either too big (>1Mb) or has an invalid type')).toBeTruthy(),
    );
  });

  it('allows user to change the order of files', async () => {
    await makeDnd({
      text: 'test-1.png',
      direction: DND_DIRECTION_DOWN,
      positions: 1,
    });

    verifyFileOrderInColumn('drag-and-drop-list', ['test-2.jpeg', 'test-1.png']);
  });

  it('allows user to delete uploaded files', async () => {
    const deleteButtons = screen.queryAllByTestId('delete-item');
    userEvent.click(deleteButtons[1]);
    verifyFileOrderInColumn('drag-and-drop-list', ['test-1.png']);
  });

  it('resets file after submission', async () => {
    mockedAxios.post.mockResolvedValue({
      data: new ArrayBuffer(8),
    });
    jest.spyOn(uploadModule, 'uploadFile').mockResolvedValue(true);

    global.URL.createObjectURL = jest.fn();

    const outputPdfNameInput = screen.getByLabelText('Output PDF Name');
    if (outputPdfNameInput) {
      fireEvent.change(outputPdfNameInput, { target: { value: 'test-file' } });
    } else {
      fail('Cannot find output PDF name input');
    }

    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.queryByText('Process Finished')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('test-1.png')).toBeFalsy());
    await waitFor(() => expect(screen.queryByText('test-file')).toBeFalsy());
    await waitFor(() => expect(screen.queryByText('Submit')).toBeDisabled());
  });

  it('displays an error message if the file upload to s3 failed', async () => {
    global.URL.createObjectURL = jest.fn();
    jest.spyOn(uploadModule, 'uploadFile').mockResolvedValue(false);

    const outputPdfNameInput = screen.getByLabelText('Output PDF Name');
    if (outputPdfNameInput) {
      fireEvent.change(outputPdfNameInput, { target: { value: 'test-file' } });
    } else {
      fail('Cannot find output PDF name input');
    }

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

    const outputPdfNameInput = screen.getByLabelText('Output PDF Name');
    if (outputPdfNameInput) {
      fireEvent.change(outputPdfNameInput, { target: { value: 'test-file' } });
    } else {
      fail('Cannot find output PDF name input');
    }

    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.queryByText('testError')).toBeTruthy());
  });
});
