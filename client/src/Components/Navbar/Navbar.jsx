import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import Hidden from '@mui/material/Hidden';
import './navbar.css'

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#161520',
    fontFamily: 'Montserrat'
});

const StyledIconButton = styled(IconButton)({
    marginRight: 2,
    fontFamily: 'Montserrat'
});

const TitleTypography = styled(Typography)({
    marginRight: '50px',
    fontSize: '1.8rem'
});

const StyledTypography = styled(Typography)({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Montserrat'
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
                    <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </StyledIconButton>
                </Hidden>

                <TitleTypography id="liber" variant="h6">
                    Liber
                </TitleTypography>

                <StyledTypography variant="h6">
                    <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>MyLibrary</Button>
                </StyledTypography>

                <Hidden mdDown>
                    <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>Books</Button>
                </Hidden>

                <Hidden mdDown>
                    <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>Log in</Button>
                </Hidden>

                <Hidden lgUp>
                    <Menu
                        id="responsive-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Books</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
                    </Menu>
                </Hidden>
            </Toolbar>
        </StyledAppBar>
    );
};

export default NavBar;
