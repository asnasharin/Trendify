import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./DialogBox.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createReview } from "../../Actions/productAction";

function DialogBox({ open, handleClose, productId }) {

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.products.productDetails)
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ratings, setRating] = useState(0);
  const [recommended, setRecommend] = useState("");

  useEffect(() => {
    if (success) {
      alert("review added successfully");
      dispatch(clearErrors());
      handleClose();
      
      setTitle("");
      setDescription("");
      setRating(0);
      setRecommend("");
    }
    if (error) {
      alert(error.message || "An error ocuured")
      dispatch(clearErrors());
    }
  }, [success, error, dispatch, handleClose])

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      productId,
      title,
      description,
      ratings,
      recommended
    }
    dispatch(createReview(reviewData))
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose} 
      fullWidth={true}
      maxWidth="md"
      classes={{ paper: styles.dialog }} 
    >
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" className={styles.header}>
              Write your review
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Typography variant="body1" className={styles.subHeadings}>
          *All fields are required unless marked optional.
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" className={styles.bodyText} >
            Title
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter title here"
            className={styles.textField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={styles.bodyText}>
            Description
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter description here"
            multiline
            rows={4}
            className={styles.textField}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={styles.bodyText}>
            Rating
          </Typography>
          <Rating name="rating" precision={0.5} className={styles.star} value={ratings} onChange={(e, newValue) => setRating(newValue)}/>
        </Box>
        <Box mt={2}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: "14px", color: "#414141", fontWeight: "500" }}
            >
              Would you recommend this product?
            </FormLabel>
            <RadioGroup aria-label="recommendation" name="recommendation" value={recommended} onChange={(e) => setRecommend(e.target.value)}>
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />} 
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />} 
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <DialogActions>
          <Button variant="outlined" className={styles.submitBtn} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
