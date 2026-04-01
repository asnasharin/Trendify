import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Input, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styles from "./CartItem.module.scss";

function CartItem({ item, deleteCartItems, increaseQuantity, decreaseQuantity }) {

  const totalPrice = item.quantity * item.price;

  return (
    <Card className={styles.roots}>
      <CardMedia
        className={styles.media}
        image={item.image}
        title={item.name}
      />
      <CardContent>
        <div>
          <div>
            <Typography variant="subtitle1" className={styles.subtitle1}>
              {item.name}
            </Typography>

            <IconButton
              aria-label="delete"
              className={styles.cartDeleteIcon}
              onClick={() => deleteCartItems(item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div>
            <Typography variant="body1" className={styles.body1}>
              Price: ₹{item.price.toFixed(2)}
            </Typography>
          </div>
        </div>

        <div>
          <div className={styles.prod_details_additem}>
            <h5>QTY: {item.quantity}</h5>
            <div className={styles.additem}>
              <IconButton
                onClick={() => decreaseQuantity(item.productId, item.quantity)}
                className={styles.additem_decrease}
              >
                <RemoveIcon />
              </IconButton>
              <Input
                readOnly
                type="number"
                value={item.quantity}
                className="input"
              />
              <IconButton
                onClick={() =>
                  increaseQuantity(item.productId, item.quantity, item.stock)
                }
                className={styles.additem_increase}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <div>
            <Typography variant="body1" className={styles.body1}>
              TOTAL:
            </Typography>
            <Typography variant="subtitle1" className={styles.subtitle1}>
              ₹{totalPrice.toFixed(2)}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
