import React from 'react';
import { Avatar, Typography, TextField, Button } from '@mui/material';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import { Link } from 'react-router-dom';
import styles from "./UpdatePassword.module.scss";

function UpdatePassword() {
  return (
    <div className={styles.updatePasswordContainer}>
      <form className={styles.updatePasswordForm}>
        <Avatar className={styles.avatar}>
          <SecurityUpdateGoodIcon />
        </Avatar>
        <Typography variant="h5" component="h1" className={styles.heading}>
          Update Password
        </Typography>

        <TextField
          label="Old Password"
          variant="outlined"
          type="password"
          fullWidth
          className={`${styles.passwordInput} ${styles.textField}`}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          className={`${styles.passwordInput} ${styles.textField}`}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          className={`${styles.passwordInput} ${styles.textField}`}
        />

        <Button
          variant="contained"
          fullWidth
          className={styles.updateButton}
        >
          Update Password
        </Button>
        <Typography
          variant="body1"
          align="center"
          className={styles.cancelText}
        >
          <Link to="/profile" className={styles.cancelLink}>
            Cancel
          </Link>
        </Typography>
      </form>
    </div>
  );
}

export default UpdatePassword;
