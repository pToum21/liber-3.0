import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import Hidden from '@mui/material/Hidden';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#2196f3', // You can customize the color
});

const StyledIconButton = styled(IconButton)({
  marginRight: 2,
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Hidden lgUp>
          {/* Display the hamburger icon only on screens smaller than lg */}
          <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </StyledIconButton>
        </Hidden>
        <StyledTypography variant="h6">
          Book Reader
        </StyledTypography>

        <Hidden mdDown>
          {/* Display these buttons on medium and larger screens */}
          <Button color="inherit">Books</Button>
          <Button color="inherit">Genres</Button>
          <Button color="inherit">MyLibrary</Button>
          <Button color="inherit">Log in</Button>
        </Hidden>

        <Hidden lgUp>
          {/* Display these buttons on large screens (lgUp) */}
          <Menu
            id="responsive-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Books</MenuItem>
            <MenuItem onClick={handleMenuClose}>Genres</MenuItem>
            <MenuItem onClick={handleMenuClose}>MyLibrary</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
