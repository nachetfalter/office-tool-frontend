import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ButtonMenu from './ButtonMenu';

describe('ButtonMenu', () => {
  const clickHandler = jest.fn();

  beforeEach(() => {
    render(
      <ButtonMenu
        title="fake title"
        options={[
          { name: 'item1', icon: <ContentCutIcon />, clickParameter: 'value 1' },
          { name: 'item2', icon: <ContentCutIcon />, clickParameter: 'value 2' },
        ]}
        clickHandler={clickHandler}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the correct title and options', async () => {
    expect(screen.queryByText('fake title')).toBeTruthy();
    expect(screen.queryByText('item1')).toBeTruthy();
    expect(screen.queryByText('item2')).toBeTruthy();
  });

  it('triggers the click handler on clicking a button', async () => {
    const firstButton = screen.queryByText('item1');
    if (firstButton) {
      userEvent.click(firstButton);
      expect(clickHandler).toBeCalledWith('value 1');
    } else {
      fail('item1 button not found');
    }
  });
});
