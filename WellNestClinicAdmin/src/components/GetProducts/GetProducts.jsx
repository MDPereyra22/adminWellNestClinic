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
              <div className={styles.contenedor}>
                <div className={styles.info}>
              <div className={styles.aloha}><img className={styles.imagen}src={product.imageUrl}></img></div>
              <div className={styles.etiqueta}>Name: <span className={styles.valor}>{product.name}</span></div>
             
              <div className={styles.etiqueta}>Description: <span className={styles.valor}>{product.description}</span></div>
        
              <div className={styles.etiqueta}>Amount: <span className={styles.valor}>{product.amount} mg</span></div>
         
              <div className={styles.etiqueta}>Dose: <span className={styles.valor}>{product.dose}</span></div>
     
   
              <div className={styles.etiqueta}>Stock: <span className={styles.valor}>{product.stock} left</span></div>
            
              <div className={styles.etiqueta}>Price: <span className={styles.valor}>${product.price}</span></div>
              <div className={styles.etiqueta}>Drugs: <span className={styles.valor}>{product.drugs.map((drug)=> drug.name)}</span></div>
              <div className={styles.etiqueta}>Laboratory: <span className={styles.valor}>{product.Product_Laboratory.name}</span></div>
              <div className={styles.etiqueta}>Presentation type: <span className={styles.valor}>{product.Product_PresentationType.type}</span></div>
         
            </div>
            </div>
            </div>
          
          ))}
        </div>
      </div>
    );
  }
  export default Products;
  