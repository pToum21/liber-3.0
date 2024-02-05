import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import Hidden from '@mui/material/Hidden';
import { Modal } from '@mui/material';
import Login from '../../pages/Login'
import { Link } from 'react-router-dom';


const StyledAppBar = styled(AppBar)({
    backgroundColor: '#161520',
    fontFamily: 'Montserrat',
});

const StyledIconButton = styled(IconButton)({
    marginRight: 2,
    fontFamily: 'Montserrat',
});

const TitleTypography = styled(Typography)({
    marginRight: '50px',
    fontSize: '1.8rem',
});

const StyledTypography = styled(Typography)({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Montserrat',
});

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearchButtonClick = () => {
        setShowSearchBar(!showSearchBar);
        handleMenuClose();
    };

    const handleLoginClick = () => {
        setLoginModalOpen(true);
        handleMenuClose();
    };

    const handleLoginModalClose = () => {
        setLoginModalOpen(false);
    };

    return (
        <StyledAppBar position="sticky">
            <Toolbar>
                <Hidden mdUp>
                    <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </StyledIconButton>
                </Hidden>

                <TitleTypography  variant="h6">
                    <Link to='/' id="liber" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Liber
                    </Link>

                </TitleTypography>

                <StyledTypography variant="h6">
                    <Hidden mdUp>
                        <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                            MyLibrary
                        </Button>
                    </Hidden>

                    <Hidden mdDown>
                        <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                            MyLibrary
                        </Button>
                    </Hidden>

                    <Hidden mdDown>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search"
                            sx={{
                                marginLeft: '10px',
                                fontFamily: 'Montserrat',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,
                                    color: 'white',
                                },
                                '& .MuiInputBase-input': {
                                    fontFamily: 'Montserrat',
                                    color: 'white',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" color="inherit">
                                            <SearchIcon sx={{ color: 'white', background: 'linear-gradient(to right, #ff9966, #ff5e62)', borderRadius: '10px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Hidden>
                </StyledTypography>

                <Hidden mdDown>
                    <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                        Books
                    </Button>
                </Hidden>

                <Hidden mdDown>
                    <Button color="inherit" onClick={handleLoginClick} sx={{ fontFamily: 'Montserrat' }} >
                        Log in
                    </Button>
                </Hidden>

                <Hidden lgUp>
                    <Menu id="responsive-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleSearchButtonClick}>
                            <IconButton color="inherit">
                                <SearchIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem>
                            <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                                MyLibrary
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>Books</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
                    </Menu>
                </Hidden>
            </Toolbar>
            <Modal open={isLoginModalOpen} onClose={handleLoginModalClose}>
                <div>
                    <Login open={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
                </div>
            </Modal>
        </StyledAppBar>

    );
};

export default NavBar;
