import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Typography variant="body2" className={styles.text}>
        © 2024 Your Company. All rights reserved.
      </Typography>
      <Box className={styles.links}>
        <Link href="/about" className={styles.link}>About Us</Link>
        <Link href="/contact" className={styles.link}>Contact Us</Link>
        <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
        <Link href="/terms" className={styles.link}>Terms of Service</Link>
      </Box>
    </Box>
  );
};

export default Footer;
