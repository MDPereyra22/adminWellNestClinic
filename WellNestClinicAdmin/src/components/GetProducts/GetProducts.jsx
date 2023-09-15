import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./GetProducts.module.css";

function Products() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://serverwellnestclinic.onrender.com/product/")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, []);

    return (
      <div className={styles.container}>
      
      <Link to="/">
            <button id="back" className={styles.backButton}>&larr; back</button>
          </Link>   
      <div className={styles.title}>All products</div>
        <div>
          {products.map((product, index) => (
            <div className={styles.content}>
              <div className={styles.divo}>
                <div className={styles.diva}>
              <div className={styles.chau}>Name: <span className={styles.hola}>{product.name}</span></div>
             
              <div className={styles.chau}>Description: <span className={styles.hola}>{product.description}</span></div>
        
              <div className={styles.chau}>Amount: <span className={styles.hola}>{product.amount} mg</span></div>
         
              <div className={styles.chau}>Dose: <span className={styles.hola}>{product.dose}</span></div>
     
              <div className={styles.chau}>Image: <span className={styles.hola}>{product.image}</span></div>
   
              <div className={styles.chau}>Stock: <span className={styles.hola}>{product.stock} left</span></div>
            
              <div className={styles.chau}>Price: <span className={styles.hola}>${product.price}</span></div>
              <div className={styles.chau}>Drugs: <span className={styles.hola}>{product.drugs.map((drug)=> drug.name)}</span></div>
              <div className={styles.chau}>Laboratory: <span className={styles.hola}>{product.Product_Laboratory.name}</span></div>
              <div className={styles.chau}>Presentation type: <span className={styles.hola}>{product.Product_PresentationType.type}</span></div>
         
            </div>
            </div>
            </div>
          
          ))}
        </div>
      </div>
    );
  }
  export default Products;
  