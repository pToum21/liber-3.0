import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, TextField, InputAdornment, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import Hidden from '@mui/material/Hidden';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#161520',
    fontFamily: 'Montserrat',
});

const StyledIconButton = styled(IconButton)({
    marginRight: 2,
    fontFamily: 'Montserrat',
});

const TitleTypography = styled(Typography)({
    marginLeft: '2rem',
    fontSize: '2.5rem',
    // maginRight: '', 
    flex: 1
});

const StyledTypography = styled(Typography)({
    display: 'flex',
    // marginLeft: '-25%',
    fontFamily: 'Montserrat',
    flex: 4
});

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSearchBar, setShowSearchBar] = useState(false);

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

    return (
        <>
            {/* parent */}
            <div id="Nav" style={{ backgroundColor: "#78ffdb", display: "flex", justifyContent: "space-between" }}>

                {/* brand */}
                <Hidden smUp>
                    <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </StyledIconButton>
                </Hidden>
                <TitleTypography id="liber" variant="h6">
                    Liber
                </TitleTypography>

                {/* nav buttons*/}
                <StyledTypography variant="h6">
                    <Hidden smDown>
                        <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                            MyLibrary
                        </Button>

                        <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                            Books
                        </Button>

                        <Button color="inherit" sx={{ fontFamily: 'Montserrat' }}>
                            Log in
                        </Button>
                    </Hidden>
                </StyledTypography>

                {/* search bar */}
                <Hidden mdDown >
                    <div style={{ display: "flex", alignItems: "center", marginRight: "2rem", flex: "4", justifyContent: "right" }}>
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
                    </div>
                </Hidden>

            </div>
        </>

        //  






        //         </StyledTypography>

        //        

        //         <Hidden lgUp>
        //             <Menu id="responsive-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        //                 
        //                 <MenuItem onClick={handleMenuClose}>Books</MenuItem>
        //                 <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
        //             </Menu>
        //         </Hidden>
        //     </Toolbar>
        // </StyledAppBar>
    );
};

export default NavBar;
