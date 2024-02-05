import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField, InputAdornment, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import Hidden from '@mui/material/Hidden';
import { Modal } from '@mui/material';
import Login from '../../pages/Login';
import './navbar.css';


const StyledAppBar = styled(AppBar)({
    backgroundColor: '#161520',
    fontFamily: 'Montserrat',
});

const StyledIconButton = styled(IconButton)({
    // marginRight: 2,
    fontFamily: 'Montserrat',
});

const TitleTypography = styled(Typography)({

    fontSize: '2.5rem',
    // maginRight: '', 

});

const StyledTypography = styled(Typography)({
    display: 'flex',
    marginLeft: '2rem',
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
        <>
            {/* parent */}
            <Grid container id="nav-parent" style={{ backgroundColor: "#161520", display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "white" }}>
                {/* child 1 */}
                <Grid item sx={{ display: "flex", marginLeft: '2rem', }}>
                    {/* brand */}
                    <Hidden mdUp>
                        <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </StyledIconButton>
                    </Hidden>
                    <TitleTypography id="liber" variant="h6">
                        Liber
                    </TitleTypography>

                    {/* nav buttons*/}
                    <StyledTypography variant="h6">
                        <Hidden mdDown>
                            <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                                MyLibrary
                            </Button>

                            <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                                Books
                            </Button>

                            <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                                Login
                            </Button>
                        </Hidden>
                    </StyledTypography>
                </Grid>
                {/* search bar */}

                <Grid item id="searchbar" sx={{ display: "flex", alignItems: "center", marginRight: "2rem", justifyContent: "right" }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search"
                        sx={{
                            // placeholder text
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                            },
                            // user input text
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            // outlined input outline
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
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
                </Grid>
                {/* hamburger menu items */}
                <Hidden lgUp>
                    <Menu id="responsive-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>MyLibrary</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Books</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
                    </Menu>
                </Hidden>

            </Grid>
        </>

    );
};

export default NavBar;
