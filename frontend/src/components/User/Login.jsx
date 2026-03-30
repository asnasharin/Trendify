import React, { useEffect, useState } from 'react';
import {
    Avatar,
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Alert,
} from "@mui/material";
import styles from "./formStyle.module.scss";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors } from '../../Reducers/UserReducer';
import { login } from '../../Actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, error } = useSelector((state) => state.user);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (error) {
            console.error("Login Error:", error.message);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, error, navigate, dispatch]);

    function handleLoginSubmit(e) {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <Avatar className={styles.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5' style={{ fontWeight: 'bold' }} className={styles.heading}>
                    Login to your Account
                </Typography>

                <TextField 
                    label="Email" 
                    variant="outlined"
                    fullWidth
                    className={styles.textfield}
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField 
                    label="Password" 
                    variant="outlined"
                    fullWidth
                    className={styles.textfield}
                    type="password" 
                    value={password}
                    onChange={handlePasswordChange}
                />
                
                <Grid
                    container
                    className={styles.gridcheckbox}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="I Accept The Terms Of Use"
                            className={styles.checkbox}
                        />
                    </Grid>
                </Grid>

                <Typography
                    variant="body2"
                    className={styles.termsAndConditionsText}
                >
                    I acknowledge will use my information in accordance
                    with its
                    <Link href="#" className={styles.privacyText}>
                        Privacy Policy.
                    </Link>
                </Typography>
                <Button
                    component="span"
                    variant='contained' 
                    fullWidth
                    className={styles.signupbtn}
                    onClick={handleLoginSubmit}
                >
                    Login
                </Button>
                <Typography
                    variant="body1"
                    align="center"
                    style={{ marginTop: "1rem" }}
                >
                    Don't have an account?
                    <Link to="/signup" className={styles.createaccount}>
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </div>
    );
}

export default Login;
