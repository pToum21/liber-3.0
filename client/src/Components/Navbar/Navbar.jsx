import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // Import Link from your routing library

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#161520' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    id='liber'
                    sx={{
                        ml: 2, // Adjusted margin
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Liber
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ mr: 60, my: 2, color: 'white', fontFamily: 'Jim Nightshade', fontSize: '1.1rem' }}
                    >
                        myLibrary
                    </Button>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                    </Menu>
                </Box>

                {/* "Log In" Button */}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ mr: 2, my: 2, color: 'white', fontFamily: 'Jim Nightshade', fontSize: '1.1rem' }}
                    >
                        Log In
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
