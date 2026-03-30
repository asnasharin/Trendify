import React, { useEffect } from 'react';
import styles from "./Profile.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Reducers/UserReducer';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated} = useSelector((state) => state.user)

    useEffect(() => {
        if(isAuthenticated == false) {
            navigate("/login")
        }
    }, [navigate, isAuthenticated])

    const logoutHandler = () => {
        dispatch(logout())
        navigate("/login")
    }

  return (
    <div className={styles.rootProfile}>
      <div className={styles['header-root']}>
        <Typography variant="h5" component="h1" className={styles.headingProfile}>
          Hi, {user.name} !
        </Typography>
        <Typography variant="body2" className={styles.greeting}>
          Welcome back! Happy shopping!
        </Typography>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.leftContainer}>
          <h4 className={styles.profileHeadingLeft}>Profile Overview</h4>
          <div className={styles.profileSection}>
            <Avatar
              alt={user.name}
            //   src={user.avatar.url}
              className={styles.profileAvatar}
            />
            <div className={styles.leftDetails}>
              <Typography className={styles.profileText}>
                <span className={styles.profileSubHeading}>Name :</span> {user.name}
              </Typography>
              <Typography className={styles.profileText}>
                <span className={styles.profileSubHeading}>Email :</span> {user.email}
              </Typography>
            </div>
          </div>

          <div className={styles.myOrder}>
            <Typography variant="h4" component="h1" className={styles.profileHeading}>
              Orders
            </Typography>
            <Link to="/orders" style={{ textDecoration: "none", color: "inherit" }}>
              <Button variant="contained" className={styles.ordersButton}>
                Orders
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.rightHeadings}>
            <Typography variant="h4" component="h1" className={styles.profileHeading}>
              Personal Information
            </Typography>
            <Typography className={styles.profileText2}>
              Hey there! Feel free to edit any of your details below so your account is up to date.
            </Typography>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.details}>
              <Typography variant="h4" component="h1" className={styles.profileHeading}>
                MY DETAILS
              </Typography>
              <Typography className={styles.profileText}>Name: {user.name}</Typography>
              <Typography className={styles.profileText}>Email: {user.email}</Typography>
            </div>

            <div className={styles.details}>
              <Typography variant="h4" component="h1" className={styles.profileHeading} style={{ marginTop: "1.5rem" }}>
                LOGIN DETAILS
              </Typography>
              <Typography className={styles.profileSubHeading}>EMAIL</Typography>
              <Typography className={styles.profileText}>{user.email}</Typography>

              <Typography className={styles.profileSubHeading} style={{ marginTop: "10px" }}>
                PASSWORD
              </Typography>
              <Typography className={styles.profileSubHeading}>
                *************
              </Typography>
            </div>

            <Link to="/password/update" style={{ textDecoration: "none", color: "inherit" }}>
              <Button variant="contained" className={styles.profileButton}>
                UPDATE PASSWORD
              </Button>
            </Link>

            <div className={styles.manageAccount}>
              <Typography variant="h4" component="h1" className={styles.profileHeading}>
                Log out from all devices
              </Typography>
              <p className={styles.profileText3}>
                To access the Cricket Weapon Store website again, you need to provide your credentials. This action will log you out from any other web browsers you have used before.
              </p>
            </div>

            <Button
              variant="contained"
              color="primary"
              className={styles.profileButton}
              startIcon={<LogoutIcon />}
              onClick={logoutHandler}
            >
              Logout Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
