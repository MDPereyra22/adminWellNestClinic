import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./GetProducts.module.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [deletedProducts, setDeletedProducts] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://serverwellnestclinic.onrender.com/product/")
        .then((response) => {
          const allProducts = response.data;
          const existingProducts = allProducts.filter((product) => !product.deleted);
          const deleted = allProducts.filter((product) => product.deleted);
  
          setProducts(existingProducts);
          setDeletedProducts(deleted);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, []);

    const handleDeleteProduct = async (id) => {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
  
      if (confirmDelete) {
        try {
          await axios.delete(`https://serverwellnestclinic.onrender.com/product/${id}`);
  
          const updatedProducts = products.filter((product) => product.id !== id);
          const deletedProduct = products.find((product) => product.id === id);
  
          setProducts(updatedProducts);
          setDeletedProducts([deletedProduct, ...deletedProducts]);
        } catch (error) {
          console.error('Error al eliminar el producto:', error);
        }
      }
    };

    const handleRestoreProduct = async (id) => {
      const confirmRestore = window.confirm('¿Estás seguro de que deseas restaurar este producto?');
  
      if (confirmRestore) {
        try {
          await axios.put(`https://serverwellnestclinic.onrender.com/product/restore/${id}`);
  
          const restoredProduct = deletedProducts.find((product) => product.id === id);
          const updatedDeletedProducts = deletedProducts.filter((product) => product.id !== id);
  
          setProducts([restoredProduct, ...products]);
          setDeletedProducts(updatedDeletedProducts);
        } catch (error) {
          console.error('Error al restaurar el producto:', error);
        }
      }
    };

    return (
      <div className={styles.container}>
      
      <Link to="/">
            <button id="back" className={styles.backButton}>&larr; back</button>
          </Link>   
      <div className={styles.title}>All products</div>
        <div>
          {products.map((product, index) => (
            <div className={styles.content} key={product.id}>
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
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteProduct(product.id)}
            >
              Delete Product
            </button>
            </div>
            </div>
          
          ))}
        </div>
        <div>
          <h3>Deleted Products</h3>
          
            {deletedProducts.map((product, index) => (
              <div className={styles.content} key={product.id}>
                <div className={styles.aloha}><img className={styles.imagen} src={product.imageUrl} alt={product.name} /></div>
                <div className={styles.etiqueta}>Name: <span className={styles.valor}>{product.name}</span></div>
                <div className={styles.etiqueta}>Description: <span className={styles.valor}>{product.description}</span></div>
                <div className={styles.etiqueta}>Amount: <span className={styles.valor}>{product.amount} mg</span></div>
                <div className={styles.etiqueta}>Dose: <span className={styles.valor}>{product.dose}</span></div>
                <div className={styles.etiqueta}>Stock: <span className={styles.valor}>{product.stock} left</span></div>
                <div className={styles.etiqueta}>Price: <span className={styles.valor}>${product.price}</span></div>
                <div className={styles.etiqueta}>Drugs: <span className={styles.valor}>{product.drugs.map((drug)=> drug.name)}</span></div>
                <div className={styles.etiqueta}>Laboratory: <span className={styles.valor}>{product.Product_Laboratory.name}</span></div>
                <div className={styles.etiqueta}>Presentation type: <span className={styles.valor}>{product.Product_PresentationType.type}</span></div>
                <button
                  className={styles.restoreButton}
                  onClick={() => handleRestoreProduct(product.id)}
                >
                  Restore Product
                </button>
              </div>
            ))}
        </div>
        
      </div>
    );
  }
  export default Products;
  