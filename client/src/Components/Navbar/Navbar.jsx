// import useHooks
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
// import mui
import { Typography, Button, IconButton, Menu, MenuItem, Modal, TextField, Hidden, InputAdornment, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import Login from '../../pages/Login';
// to link to other pages
import { Link } from 'react-router-dom';
// our files
import './navbar.css';
import Auth from '../../utils/auth'
import { QUERY_SEARCH_ALL_BOOKS } from '../../utils/queries';
import SearchIcon from '@mui/icons-material/Search';

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

const NavBar = () => {
    // functionality for nav menu
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
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


    // logic for search feature
    const { loading, data, refetch } = useQuery(QUERY_SEARCH_ALL_BOOKS);
    const [searchInput, setSearchInput] = useState('');
// make loading scenario
    console.log(data?.searchAllBooks);

    // const handleSearch = async (event) => {
    //     event.preventDefault();

    //     if (!searchInput) {
    //         return false;
    //     }

    // }

    return (
        <>
            <Grid container py={2} id="nav-parent" style={{ backgroundColor: "transparent", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Grid id="child-1" item sx={{ display: "flex", marginLeft: '2rem' }}>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={isMenuOpen ? handleMenuClose : handleMenuOpen}
                            sx={{ position: 'relative' }}
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </Hidden>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
                        <TitleTypography id="liber" sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                            {'{'}&nbsp;&nbsp;L i b e r&nbsp;&nbsp;{'}'}
                        </TitleTypography>
                    </Link>
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
                <Grid item id="searchbar" sx={{ display: "flex", alignItems: "center", marginRight: "2rem", justifyContent: "right", }}>

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

                    <Hidden lgUp>
                        <Menu
                            id="responsive-menu"
                            anchorEl={anchorEl}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 0, left: 0 }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            disablePortal // Add this prop
                            sx={{
                                '& .MuiMenu-paper': {
                                    marginTop: '10%',
                                    width: '100%',
                                    height: '100vh',
                                    transformOrigin: 'top center',
                                    transform: 'translateX(0%) translateY(0%)',
                                    backgroundColor: '#f3f3ec',
                                    boxShadow: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                                '& .MuiMenuItem-root': {
                                    fontSize: '2rem',
                                    padding: '1rem',
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        color: '#8abbb1',
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    MyLibrary &gt;
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/books" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Books &gt;
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Log in &gt;
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
