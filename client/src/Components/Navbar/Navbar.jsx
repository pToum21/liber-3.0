import React, { useState } from 'react';
import { Typography, Button, IconButton, Menu, MenuItem, Modal, TextField, Hidden, InputAdornment, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import Login from '../../pages/Login';
import { Link } from 'react-router-dom';
import './navbar.css';

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
        <>
            {/* parent */}
            <Grid container id="nav-parent" style={{ backgroundColor: "transparent", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>

                {/* child 1 */}
                <Grid item sx={{ display: "flex", marginLeft: '2rem', }}>

                    {/* nav menu, which will replace StyledTypography */}
                    <Hidden mdUp>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    {/* brand */}
                    {/* <Link style={{textDecoration: 'none'}}to="/"> */}
                        <TitleTypography id="liber" variant="h6">
                            {'{'}&nbsp;&nbsp;L i b e r&nbsp;&nbsp;{'}'}
                        </TitleTypography>
                    {/* </ Link> */}


                    {/* nav buttons*/}
                    <StyledTypography variant="h6">
                        <Hidden mdDown>
                            <Button color="inherit" sx={{ fontFamily: 'Gruppo' }}>
                                MyLibrary
                            </Button>

                            <Button color="inherit" sx={{ fontFamily: 'Gruppo' }}>
                                Books
                            </Button>

                            <Button color="inherit" onClick={handleLoginClick} sx={{ fontFamily: 'Gruppo' }}>
                                Login
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
                                color: '#78ffdb',
                                fontFamily: 'Gruppo'
                            },
                            // outlined input outline
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'antiquewhite',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" color="inherit">
                                        <SearchIcon sx={{ color: 'white', background: 'linear-gradient(to right, #008080, #bdfbe7)', borderRadius: '10px', padding: '4px' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* hamburger menu items */}
                    <Hidden lgUp>
                        <Menu id="responsive-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>MyLibrary</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Books</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
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
