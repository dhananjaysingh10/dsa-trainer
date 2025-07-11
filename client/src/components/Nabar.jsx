import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo4.svg";
import { FiLogOut } from "react-icons/fi"
import API from "../lib/api";
import { signoutSuccess } from '../redux/user/userSlice';
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleMenuClose();
        try {
            const res = await API.post('/user/signout', { withCredentials: true })
            const data = res;
            if (res.statusText == 'OK') {
                dispatch(signoutSuccess());
                navigate("/");
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const goToProfile = () => {
        navigate("/profile");
        handleMenuClose();
    };

    return (
        <nav className="p-3 md:p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full bg-white dark:bg-black">
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Phoenix Logo"
                    className="w-12 h-12 dark:invert"
                />
                <h1 className="font-bold font-mono text-xl md:text-2xl text-gray-800 dark:text-white">
                    phoenix
                </h1>
            </div>

            {console.log(currentUser)}
            {currentUser && (
                <div>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleMenuOpen}
                            size="small"
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar
                                src={currentUser.profilePicture}
                                alt={currentUser.username}
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                mt: 1.5,
                                minWidth: 150,
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem onClick={goToProfile}>{currentUser.username}</MenuItem>
                        {/* <MenuItem onClick={goToProfile}>Profile</MenuItem> */}
                        <MenuItem onClick={handleLogout} className=" !text-red-500 hover:!text-red-600 flex items-center gap-2">
                            <FiLogOut className="text-red-500" />Logout</MenuItem>
                    </Menu>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
