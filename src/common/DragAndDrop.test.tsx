import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  makeDnd,
  mockGetComputedStyle,
  mockDndSpacing,
  DND_DIRECTION_UP,
  DND_DIRECTION_DOWN,
} from 'react-beautiful-dnd-test-utils';
import DragAndDropList from './DragAndDropList';

describe('DragAndDropList', () => {
  const testItems = ['item 1', 'item 2'];
  const onDrag = jest.fn().mockImplementation((sourceIndex, targetIndex) => {
    return { source: sourceIndex, target: targetIndex };
  });
  const onDelete = jest.fn().mockImplementation((_, index) => {
    return index;
  });

  beforeEach(() => {
    const { container } = render(<DragAndDropList items={testItems} onDragging={onDrag} onDelete={onDelete} />);
    mockDndSpacing(container);
    mockGetComputedStyle();
  });

  it('displays the list correctly', () => {
    const deleteButtons = screen.queryAllByTestId('delete-item');
    expect(screen.queryByText('item 1')).toBeTruthy();
    expect(screen.queryByText('item 2')).toBeTruthy();
    expect(deleteButtons.length).toBe(2);
  });

  it('allows the user to drag up', async () => {
    await makeDnd({
      text: 'item 2',
      direction: DND_DIRECTION_UP,
      positions: 1,
    });

    expect(onDrag).toReturnWith({ source: 1, target: 0 });
  });

  it('allows the user to drag down', async () => {
    await makeDnd({
      text: 'item 1',
      direction: DND_DIRECTION_DOWN,
      positions: 1,
    });

    expect(onDrag).toReturnWith({ source: 0, target: 1 });
  });

  it('allows the user to delete element', async () => {
    const deleteButtons = screen.queryAllByTestId('delete-item');
    userEvent.click(deleteButtons[1]);
    expect(onDelete).toReturnWith(1);
  });
});
