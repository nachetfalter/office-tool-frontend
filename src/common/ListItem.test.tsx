import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

describe('ListItem', () => {
  it('displays the children content', async () => {
    render(
      <ListItem>
        <p>This is a test</p>
      </ListItem>,
    );
    expect(screen.queryByText('This is a test')).toBeTruthy();
  });
});
