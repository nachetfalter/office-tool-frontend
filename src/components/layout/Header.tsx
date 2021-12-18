import { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu, DarkMode, LightMode } from '@mui/icons-material';
import { ThemeContext } from '../../context/theme-context';
import { useTheme } from '@mui/material/styles';

const Header = (): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Office Utility Tools
          </Typography>
          {theme.palette.mode} mode
          <IconButton onClick={themeContext.switchTheme} data-testid="color-mode">
            {theme.palette.mode === 'dark' ? (
              <LightMode aria-label="light mode" />
            ) : (
              <DarkMode sx={{ color: 'white' }} aria-label="dark mode" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
