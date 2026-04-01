import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Actions/productAction'; 
import ProductCard from '../Home/ProductCard/ProductCard';
import styles from './Product.module.scss';
import { FormControlLabel, Radio, RadioGroup, Slider, Typography, Button } from '@mui/material';
import InventoryIcon from "@mui/icons-material/Inventory"; 
import Loader from '../Loader/Loader';

function Product() {
  const categories = ["men", "women", "kids", "furniture", "shoe", "perfumes"];
  const { products, error, loading } = useSelector((state) => state.products.user);
  const dispatch = useDispatch();

  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (error) {
      console.error(error);
    }

    // Pass query parameters to the action
    dispatch(getProducts({ price, category, rating }));
  }, [dispatch, error, price, category, rating]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
  };

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  return (
    loading ? (
     <Loader />
    ) : (
      <>
        {products === undefined || products.length === 0 ? (
          <div className={styles.emptyCartContainer} style={{ marginTop: "5rem", background: "white" }}>
            <InventoryIcon className={styles.cartIcon} />
            <Typography variant="h5" component="h1" className={styles.cartHeading}>
              Product Not Found
            </Typography>
            <Typography variant="body1" className={styles.cartText}>
              Nothin' to see here.
            </Typography>
            <Typography variant="body1" className={styles.cartText}>
              There is no product with this name.
            </Typography>
            <Button
              className={styles.shopNowButton}
              onClick={() => window.location.reload()}
              style={{ width: "7rem" }}
            >
              Refresh
            </Button>
          </div>
        ) : (
          <div className={styles.productPage}>
            {/* Filters */}
            <div className={styles.filterBox}>
              {/* Price Filter */}
              <div className={styles.priceFilter}>
                <Typography style={{ fontSize: '18px', fontWeight: 700, color: '#414141' }}>
                  Price
                </Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  min={0} max={100000} step={100}
                  valueLabelDisplay='auto'
                />
              </div>

              <div className={styles.filter_divider}></div>

              {/* Categories Filter */}
              <div className={styles.categoriesFilter}>
                <Typography style={{ fontSize: "18px", fontWeight: 700, color: "#414141" }}>
                  Categories
                </Typography>
                <ul className={styles.categoryBox}>
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <label htmlFor={`category-${index}`}>
                        <input
                          type="checkbox"
                          id={`category-${index}`}
                          value={cat}
                          onChange={() => handleCategory(cat)}
                          checked={category === cat}
                        />
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.filter_divider}></div>

              {/* Ratings Filter */}
              <div className={styles.ratingsFilter}>
                <Typography style={{ fontSize: "18px", fontWeight: 700, color: "#414141" }}>
                  Ratings Above
                </Typography>
                <RadioGroup row value={rating} onChange={handleRating}>
                  <FormControlLabel value="4" control={<Radio />} label="4★ & above" />
                  <FormControlLabel value="3" control={<Radio />} label="3★ & above" />
                  <FormControlLabel value="2" control={<Radio />} label="2★ & above" />
                </RadioGroup>
              </div>
            </div>

            <div className={styles.productsContainer}>
              <div className={products.length < 2 ? styles.products1 : styles.products}>
                {products && products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
}

export default Product;
