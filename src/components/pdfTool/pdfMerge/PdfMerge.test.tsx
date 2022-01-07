import { act, screen, render, cleanup, waitFor, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  makeDnd,
  mockGetComputedStyle,
  mockDndSpacing,
  DND_DIRECTION_UP,
  DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import PdfMerge from './PdfMerge';

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
      const fileTwo = new File([blob], 'test-2.png', {
        type: 'image/png',
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
    expect(screen.queryByText('Upload Files')).toBeTruthy();
    expect(screen.queryByText('Submit')).toBeTruthy();
    expect(screen.queryByText('Submit')?.closest('button')).toBeDisabled();
  });

  it('allows user to upload files and set the output file name', async () => {
    const outputFileNameInput = screen.getByLabelText('Output File Name');
    if (outputFileNameInput) {
      fireEvent.change(outputFileNameInput, { target: { value: 'test' } });
      expect((outputFileNameInput as HTMLInputElement).value).toBe('test');
    } else {
      fail('Cannot find output file name input');
    }

    await waitFor(() => expect(screen.queryByText('test-1.png')).toBeTruthy());
    await waitFor(() => expect(screen.queryByText('test-2.png')).toBeTruthy());
    expect(screen.queryByText('Submit')?.closest('button')).not.toBeDisabled();
  });

  it('allows user to change the order of files', async () => {
    await makeDnd({
      text: 'test-1.png',
      direction: DND_DIRECTION_DOWN,
      positions: 1,
    });

    verifyFileOrderInColumn('drag-and-drop-list', ['test-2.png', 'test-1.png']);
  });

  it('allows user to delete uploaded files', async () => {
    const deleteButtons = screen.queryAllByTestId('delete-item');
    userEvent.click(deleteButtons[1]);
    verifyFileOrderInColumn('drag-and-drop-list', ['test-1.png']);
  });
});
