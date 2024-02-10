import { useState } from "react";
import Auth from "./auth";

const useLoginClick = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = Auth.loggedIn();

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

    const handleLoginClick = () => {
        console.log("Login button clicked");
        setLoginModalOpen(true);
        handleMenuClose();
        console.log("isLoginModalOpen:", isLoginModalOpen);
    };

    const handleLoginModalClose = () => {
        setLoginModalOpen(false);
    };

    return {
        isLoginModalOpen,
        isMenuOpen,
        isLoggedIn,
        logout,
        handleMenuOpen,
        handleMenuClose,
        handleLoginClick,
        handleLoginModalClose
    };

}

export default useLoginClick;

// anywhere we need login modal to pop up, import these:

// import useLoginClick from '../../utils/loginClick';
// import { useEffect } from 'react';
// import { Modal } from '@mui/material';
// import Login from '../../pages/Login';

// include this modal block of code at end of file 
{/* <Modal open={isLoginModalOpen} onClose={handleLoginModalClose}>
    <div>
        <Login open={isLoginModalOpen} onClose={handleLoginModalClose} />
    </div>
</Modal> */}