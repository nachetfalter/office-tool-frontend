import { List, ListItem, Typography, Button } from '@mui/material';

import { CustomisedCard } from './ButtonMenu.styled';

type OptionType = {
  name: string;
  icon: React.ReactNode;
  clickParameter: string;
};

interface Props {
  title?: string;
  options: OptionType[];
  clickHandler: (clickParameter: string) => void;
}

const ButtonMenu = ({ title, options, clickHandler }: Props): JSX.Element => {
  return (
    <CustomisedCard>
      {title && (
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
      )}
      <List>
        {options.map((option) => (
          <ListItem key={option.name} sx={{ display: 'flex' }}>
            <Button
              startIcon={option.icon}
              variant="contained"
              sx={{ margin: 'auto 0', width: '100%' }}
              onClick={() => clickHandler(option.clickParameter)}
            >
              {option.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </CustomisedCard>
  );
};

export default ButtonMenu;
