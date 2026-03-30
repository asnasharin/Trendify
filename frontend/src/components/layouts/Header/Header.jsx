import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
import { ShoppingCart } from "@mui/icons-material"
import Badge from '@mui/material/Badge'
import ProfileModal from './ProfileModal'
import { useSelector } from 'react-redux'

function Header() {
    const user = useSelector((state) => state.user.user);
    const  cartItems  = useSelector((state) => state.cart.cartItems);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const cartItemCount = cartItems.length;



    return (
        <div className='header_navmenu'>
            <ul>
                <li>
                    <Link to="/" className="nav_link" style={{ textDecoration: "none" }}>Home</Link>
                </li>
                <li>
                    <Link to="/product" className="nav_link" style={{ textDecoration: "none" }}>Product</Link>
                </li>
            </ul>
            <span className='left_section'>
                <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
                    <Badge
                        badgeContent={cartItemCount}
                        sx={{ '& .MuiBadge-badge': { backgroundColor: 'red' } }}
                    >
                        <ShoppingCart className='cart_icon' />
                    </Badge>
                </Link>
                <span>
                    <ProfileModal user={user} isAuthenticated={isAuthenticated} />
                </span>
            </span>
        </div>
    );
}

export default Header;
