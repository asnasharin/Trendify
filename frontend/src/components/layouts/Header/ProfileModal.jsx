import { Avatar, Button, Typography, Modal } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import "./ProfileModal.scss"
import React, { useEffect, useRef, useState } from 'react'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import PersonIcon from "@mui/icons-material/Person"
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useDispatch } from 'react-redux'
import { logout } from "../../../Reducers/UserReducer" 

const ProfileModal = ({ user, isAuthenticated }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();;


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleOpen = (event) => {
        event.stopPropagation();
        setIsOpen((prevState) => !prevState);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const dashboardHandler = () => {
        setIsOpen(false);
        navigate("/admin/dashboard");
    };

    const accountHandler = () => {
        setIsOpen(false);
        navigate("/profile");
    };

    const ordersHandler = () => {
        setIsOpen(false);
        navigate("/orders");
    };

    const logoutUserHandler = () => {
        setIsOpen(false);
        dispatch(logout());
        alert.success("Logout Successfully");
    };

    const cartHandler = () => {
        setIsOpen(false);
        navigate("/cart");
    };

    const loginHandler = () => {
        setIsOpen(false);
        navigate("/login");
    };

    return (
        <>
            <div className="profile-icon" onClick={handleOpen}>
                <PersonIcon
                    className={`icon smaller ${isOpen ? "active" : ""}`}
                    fontSize="large"
                />
                {isOpen ? (
                    <ArrowDropUpIcon className="arrow-icon" />
                ) : (
                    <ArrowDropDownIcon className="arrow-icon" />
                )}
            </div>
            {isOpen && (
                <Modal open={isOpen} onClose={onClose} className="modal-container">
                    <div className="modal-content" ref={modalRef}>
                        {!isAuthenticated ? (
                            <div className="welcome-message">
                                <strong>Welcome!</strong>
                                <p>To access your account and manage orders, please log in.</p>
                            </div>
                        ) : (
                            <>
                                <div className="profile-info">
                                    <Avatar
                                        // src={user.avatar.url}
                                        alt="User Avatar"
                                        className="avatar"
                                        style={{ width: "68px", height: "68px" }}
                                    />
                                    <p className="user-id">
                                        <strong>ID :</strong> {user._id.substring(0, 8)}
                                    </p>

                                    <p className="user-name">
                                        <strong>Name :</strong> {user.name}
                                    </p>

                                    <p className="user-email">
                                        <strong>Email :</strong> {user.email}
                                    </p>
                                </div>
                            </>
                        )}
                        <div className="divider" />
                        <div className="profile-menu">
                            {user && user.role === 1 && (
                                <div className="menu-item" onClick={dashboardHandler}>
                                    <DashboardIcon className="menu-icon" />
                                    <span>Dashboard</span>
                                </div>
                              )} 
                            <div className="menu-item" onClick={accountHandler}>
                                <AccountCircleIcon className="menu-icon" />
                                <span>Profile</span>
                            </div>
                            {/* <div className="menu-item" onClick={ordersHandler}>
                                <AssignmentIcon className="menu-icon" />
                                <span>Orders</span>
                            </div> */}
                            <div className="menu-item" onClick={cartHandler}>
                                <ShoppingCartIcon className="menu-icon" />
                                <span>Cart</span>
                            </div>
                            {!isAuthenticated ? (
                                <div className="menu-item" onClick={loginHandler}>
                                    <LockOpenIcon className="menu-icon" />
                                    <span>Login</span>
                                </div>
                            ) : (
                                <div className="menu-item" onClick={logoutUserHandler}>
                                    <ExitToAppIcon className="menu-icon" />
                                    <span>Logout</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ProfileModal;
