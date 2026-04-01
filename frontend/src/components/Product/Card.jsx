import React from "react";
import { Avatar, Rating, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import styles from "../Product/Card.module.scss";

function Card({ review }) {
  return (
    <div className={styles.cardRoot}>
      <div className={styles.cardheader}>
        <Avatar
          alt="User Avatar"
          src={review.avatar || "https://i.imgur.com/JSW6mEk.png"}
          className={styles.avatar}
        />
        <Typography variant="body1" className={styles.subHeadings}>
          {review.name}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={styles.bodyText}
        >
          {/* {formateDate(review.createdAt)} */}
        </Typography>
      </div>
      <Rating
        value={review.rating}
        precision={0.5}
        size="medium"
        readOnly
        className={styles.star}
      />
      <Typography variant="h6" className={styles.title}>
        {review.title}
      </Typography>
      <Typography variant="body1" className={styles.commentTxt}>
        {review.comment}
      </Typography>
      <Typography variant="body1" className={styles.recommend}>
        Would you recommend this product?{" "}
        <span className={review.recommend ? styles.yes : styles.no}>
          {review.recommend ? "Yes!" : "No!"}
        </span>
      </Typography>
      <div className={styles.helpful}>
        <Typography variant="body2" color="textSecondary" className={styles.subHeadings}>
          Helpful?
        </Typography>
        <ThumbUpIcon onClick={() => console.log("Thumbs Up")} />
      </div>
    </div>
  );
}

export default Card;
