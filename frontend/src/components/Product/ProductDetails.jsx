import React, { useEffect, useState } from 'react';
import styles from '../Product/ProductDetails.module.scss';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Actions/productAction';
import { addToCart } from '../../Actions/CartActions';
import ReviewCard from './ReviewCard';

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector((state) => state.products.productDetails);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const handleAddItem = () => {
    if (product && quantity > 0) {
      dispatch(addToCart({ id, quantity }));
    }
    alert('Item Added To Cart');
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.prodcutDetialsContainer}>
          <section id={styles.product_details} className={styles.section}>
            <div className={styles.product_container}>
              <div className={styles.prod_details_wrapper}>
                {/*=== Product Details Left-content ===*/}
                <div className={styles.prod_details_left_col}>
                  {product.images && product.images.length > 0 && (
                    <div className={styles.image_wrapper}>
                      <img
                        src={product.images[0].url}
                        alt={`product-img`}
                        className={styles.productImage}
                      />
                    </div>
                  )}
                </div>

                {/*=== Product Details Right-content ===*/}
                <div className={styles.prod_details_right_col_001}>
                  {/* Product Name */}
                  <h1 className={styles.prod_details_title}>{product.name}</h1>

                  {/* Product Ratings */}
                  <div className={styles.prod_details_ratings}>
                    <span>
                      <strong>Ratings:</strong> {product.ratings || 0}/5
                    </span>
                  </div>

                  {/* Product Price */}
                  <div className={styles.prod_details_price}>
                    <h2 className={styles.price}>$ {product.price}</h2>
                  </div>

                  {/* Product Description */}
                  <div className={styles.productDescription}>
                    <h4>Description:</h4>
                    <p>{product.description}</p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    className={styles.prod_details_addtocart_btn}
                    onClick={handleAddItem}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.reviewCard}>
            <ReviewCard product={product} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
