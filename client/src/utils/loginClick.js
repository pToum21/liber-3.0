import { useState } from "react";

const useLoginClick = () => {

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
        setLoginModalOpen(true);
        handleMenuClose();
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