import React, { useState } from 'react';
import { Typography, Button, IconButton, Menu, MenuItem, Modal, TextField, Hidden, InputAdornment, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import Login from '../../pages/Login';
import { Link } from 'react-router-dom';
import './navbar.css';
import Auth from '../../utils/auth'

// Liber brand
const TitleTypography = styled(Typography)({
    fontSize: '2.5rem',
    cursor: 'pointer',
});

// buttons pre-nav burger menu
const StyledTypography = styled(Typography)({
    display: 'flex',
    marginLeft: '2rem',
});

// functionality for nav menu
const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        // Set the menu anchor position to the top left corner
        document.getElementById('responsive-menu').style.top = '0';
        document.getElementById('responsive-menu').style.left = '0';
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
        <>
            {/* parent */}
            <Grid container py={2} id="nav-parent" style={{ backgroundColor: "transparent", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                {/* child 1 (nav and brand)*/}
                <Grid id="child-1" item sx={{ display: "flex", marginLeft: '2rem' }}>

                    {/* nav menu, which will replace StyledTypography */}
                    <Hidden mdUp>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    {/* brand */}
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
                        <TitleTypography id="liber" sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                            {'{'}&nbsp;&nbsp;L i b e r&nbsp;&nbsp;{'}'}
                        </TitleTypography>
                    </ Link>

                    {/* nav buttons*/}
                    <StyledTypography variant="h6">
                        <Hidden mdDown>
                            <Button className="navlinks" color="inherit">
                                MyLibrary
                            </Button>

                            <Button className="navlinks" color="inherit">
                                Books
                            </Button>

                            <Button className="navlinks" color="inherit" onClick={handleLoginClick}>
                                Login
                            </Button>

                            <Button className="navlinks" color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </Hidden>
                    </StyledTypography>
                </Grid>

                {/* child 2 / search bar */}
                <Grid item id="searchbar" sx={{ display: "flex", alignItems: "center", marginRight: "2rem", justifyContent: "right" }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search"
                        sx={{
                            // this is not placeholder text, idk what it is
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                            },
                            // this is placeholder text and user input text
                            '& .MuiInputBase-input': {
                                color: 'black',
                                fontFamily: 'Lato'
                            },
                            // outlined input outline
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" color="inherit">
                                        <SearchIcon sx={{ color: 'white', backgroundColor: '#8abbb1', borderRadius: '5px', padding: '4px' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* hamburger menu items */}
                    <Hidden lgUp>
                        <Menu
                            id="responsive-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{
                                '& .MuiMenu-paper': {
                                    width: '100%',
                                    height: '100%',
                                    transformOrigin: 'top center',
                                    transform: 'translateX(0%) translateY(0%)',
                                },
                                '& .MuiMenuItem-root': {
                                    fontSize: '1.5rem', // Adjust the font size as needed
                                    padding: '1rem', // Adjust the padding as needed
                                },
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    MyLibrary
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/books" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Books
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Log in
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Hidden>
                </Grid>

                <Modal open={isLoginModalOpen} onClose={handleLoginModalClose}>
                    <div>
                        <Login open={isLoginModalOpen} onClose={handleLoginModalClose} />
                    </div>
                </Modal>

            </Grid>
        </>
    );
};

export default NavBar;
