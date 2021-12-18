import { cleanup, render, screen, fireEvent, within } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
  const options = [
    {
      text: 'Option 1',
      value: 'Option 1',
    },
    {
      text: 'Option 2',
      value: 'Option 2',
    },
  ];
  const selectHandler = jest.fn();

  beforeEach(() => {
    render(<Select title="Select Test" selectHandler={selectHandler} selectedValue="Option 1" options={options} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the title and the default option', () => {
    expect(screen.queryAllByText('Select Test').length).toBe(2);
    expect(screen.queryByText('Option 1')).toBeTruthy();
  });

  it('allows user to select different option', () => {
    fireEvent.mouseDown(screen.getByRole('button'));
    const options = within(screen.getByRole('listbox'));
    fireEvent.click(options.getByText('Option 2'));
    expect(screen.queryByText('Option 2')).toBeTruthy();
  });

  it('calls the handler upon selection', () => {
    fireEvent.mouseDown(screen.getByRole('button'));
    const options = within(screen.getByRole('listbox'));
    fireEvent.click(options.getByText('Option 2'));
    expect(selectHandler).toBeCalled();
  });

  it('disables the select dropdown if the disabled prop is passed', () => {
    cleanup();
    render(
      <Select
        title="Select Test"
        selectHandler={selectHandler}
        selectedValue="Option 1"
        options={[
          {
            text: 'Option 1',
            value: 'Option 1',
          },
          {
            text: 'Option 2',
            value: 'Option 2',
          },
        ]}
        disabled={true}
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled');
  });
});
