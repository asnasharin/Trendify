import React from 'react';
import { Box, Typography, TextField, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import styles from './NewsLetter.module.scss';

const Newsletter = () => {
  return (
    <Box className={styles.newsletterSection}>
      <Grid container spacing={4}>
        {/* Left Side: Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={styles.title}>
            Quick Links
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Blog" />
            </ListItem>
            <ListItem>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
        </Grid>

        {/* Middle: Help & Contact */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={styles.title}>
            Help & Contact
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Customer Service" />
            </ListItem>
            <ListItem>
              <ListItemText primary="FAQs" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Returns" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </List>
        </Grid>

        {/* Right Side: Newsletter Signup */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className={styles.title}>
            Newsletter
          </Typography>
          <Typography variant="body2" className={styles.subtitle}>
            Sign up for exclusive offers and updates
          </Typography>
          <Box display="flex" alignItems="center" mt={2} gap="10px" >
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              className={styles.inputField}
              InputProps={{
                style: { backgroundColor: 'white', borderRadius: '4px' },
              }}
            />
            <Button variant="contained" className={styles.subscribeButton}>
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsletter;
