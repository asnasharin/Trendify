import React from 'react';
import CartItem from './CartItem';
import { Button, Typography, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import styles from "./Cart.module.scss";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../Actions/CartActions';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const final = totalPrice; 
  const isFocused = false; 
  const isValid = true; 

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseQuantity = (id, quantity, stock) => {
    let newQuantity = quantity + 1;
    if (newQuantity > stock) {
      return;
    } else {
      dispatch(addToCart({ id, quantity: newQuantity, stock }));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    let newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart({ id, quantity: newQuantity }));
    }
  };

  return (
    <div className={styles.cartpage}>
      <div className={styles.gridContainer}>
        {/* Left Container for Cart Items */}
        <div className={styles.cart_left_container}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCartContainer}>
              <RemoveShoppingCartIcon className={styles.cartIcon} />
              <Typography variant="h5" component="h1" className={styles.cartHeading}>
                Your Shopping Cart is Empty
              </Typography>
              <Typography variant="body1" className={styles.cartText}>
                Nothin' to see here.
              </Typography>
              <Typography variant="body1" className={styles.cartText}>
                Let's get shopping!
              </Typography>
              <Link to="/product">
                <Button className={styles.shopNowButton}>Shop Now</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.cart_items_container}>
              {cartItems.map((item) => (
                <div key={item.productId} className={styles.cart_content_wrapper}>
                  <CartItem 
                    item={item} 
                    deleteCartItems={deleteCartItems}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Container for Order Summary */}
        {cartItems.length > 0 && (
          <div className={styles.cart_right_container}>
            <div className={styles.order_summary}>
              <h4>
                Order Summary &nbsp; ({cartItems.length} {cartItems.length > 1 ? "items" : "item"})
              </h4>
              <div className={styles.order_summary_details}>
                <div className={styles.order_Summary_Item}>
                  <span>Original Price</span>
                  <p>{totalPrice}</p>
                </div>

                <div className={styles.order_Summary_Item}>
                  <span>Discount</span>
                  <p>
                    <del>0</del>
                  </p>
                </div>

                <div className={styles.order_Summary_Item}>
                  <span>Delivery</span>
                  <p>
                    <b>Free</b>
                  </p>
                </div>

                <div className={styles.separator_cart}></div>
                <div className={styles.order_Summary_Item}>
                  <div>
                    <h4>Total Price</h4>
                  </div>
                  <p>
                    <b>{final}</b>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.coupon_box_wrapper}>
              <div className={`${styles.coupon_box_content} ${isFocused ? styles.focused : ""}`}>
                <TextField
                  label="Enter coupon code"
                  error={!isValid}
                  helperText={!isValid && "Invalid coupon code"}
                  variant="outlined"
                  size="small"
                  style={{ width: "200px", marginRight: "1rem" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.coupon_box_apply_btn}
                >
                  Apply
                </Button>
              </div>
            </div>

            <Button
              variant="contained"
              className={styles.btn_custom}
            >
              Checkout
            </Button>

            <div className={styles.paymentLogoImg}>
              <img
                src={"../../../Image/cart.png"}
                alt="payment-icons"
                className={styles.paymentImg}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
