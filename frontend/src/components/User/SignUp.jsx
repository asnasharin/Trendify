import React, { useEffect, useState } from 'react'
import {
    Avatar,
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Grid
    
} from "@mui/material"
import styles from "./formStyle.module.scss"
import LockOutLinedIcon from "@mui/icons-material/LockOutlined"
import CloudUploadIcon from "@mui/icons-material/CloudUploadOutlined"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../Actions/userActions'
import toast, { Toaster } from "react-hot-toast"


function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();;
  const { isAuthenticated, error } = useSelector((state) => state.user);
  

  useEffect(() => {
    if (error) {
      alert("error");
      dispatch(clearError());
    }

    if (isAuthenticated) {
      toast.success("Registered Successfully");
      navigate("/")
    }
  }, [dispatch, isAuthenticated, error, navigate])

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail( email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    setIsValidName(name.length >= 4 && name.length <= 20);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
      setIsValidPassword(e.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  function handeSignUpSubmit(e) {
    e.preventDefault();

    if(password !== confirmPassword) {
      toast.error("Password and confirm passowrd do not match");
      return;
    }

  const formData = {
    name,
    email,
    password,
    avatar,
  };
  dispatch(signup(formData));
}

  return (
    <div className={styles.formContainer}>
        <form className={styles.form} >
          <Avatar className={styles.avatar} >
            <LockOutLinedIcon />
          </Avatar>
        <Typography variant='h5' style={{ fontWeight: 'bold'}} className={styles.heading}>
                Create an Account
            </Typography>
        <div className={styles.root}>
              <Avatar
                alt="Avatar Preview"
                src={avatarPreview}
                className={styles.avatar2}
              />
              <input
                accept="image/*"
                className={styles.input}
                id="avatar-input"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className={styles.uploadAvatarButton}
                >
                  <p className={styles.uploadAvatarText}>Upload Photo</p>
                </Button>
              </label>
            </div>
            <TextField 
            label="Name" 
            variant="outlined"
            fullWidth
            className={styles.textfield}
            value={name}
            onChange={handleNameChange}
            />
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
            value={password}
            onChange={handlePasswordChange}
            />
            <TextField 
            label="Confirm Password" 
            variant="outlined"
            fullWidth
            className= {styles.textfield}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            />
            
            <Grid
              container
              className={styles.gridcheckbox}
              justify="flex-start"
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
            onClick={handeSignUpSubmit}
            >
                Create Account
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Already have an account?
              <Link to="/login" className={styles.createaccount}>
                Login
              </Link>
            </Typography>
        </form>   
    </div>
  )
}

export default SignUp