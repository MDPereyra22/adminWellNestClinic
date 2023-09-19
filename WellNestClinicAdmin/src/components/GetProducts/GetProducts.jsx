import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct} from "../../redux/action/actions";
import styles from "./GetProducts.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await fetchProducts();
        const existingProducts = allProducts.filter((product) => !product.deleted);
        const deleted = allProducts.filter((product) => product.deleted);

        setProducts(existingProducts);
        setDeletedProducts(deleted);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleToggleDeleted = () => {
    setShowDeleted(!showDeleted);
  };
  const filteredProducts = showDeleted
  ? deletedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



  return (
    <div className={styles.container}>

      <Link to="/">
        <button id="back" className={styles.backButton}>Go back</button>
      </Link>
      <div className={styles.title}>All products</div>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <button onClick={handleToggleDeleted}>
          {showDeleted ? "Show Active" : "Show Deleted"}
        </button>
      </div>
      <div>
        {filteredProducts.map((product, index) => (
          <div className={styles.content} key={product.id}>
            <div className={styles.contenedor}>
              <div className={styles.info}>
                <div className={styles.aloha}><img className={styles.imagen} src={product.imageUrl}></img></div>
                <div className={styles.etiqueta}>Name: <span className={styles.valor}>{product.name}</span></div>

                <div className={styles.etiqueta}>Description: <span className={styles.valor}>{product.description}</span></div>

                <div className={styles.etiqueta}>Amount: <span className={styles.valor}>{product.amount} mg</span></div>

                <div className={styles.etiqueta}>Dose: <span className={styles.valor}>{product.dose}</span></div>


                <div className={styles.etiqueta}>Stock: <span className={styles.valor}>{product.stock} left</span></div>

                <div className={styles.etiqueta}>Price: <span className={styles.valor}>${product.price}</span></div>
                <div className={styles.etiqueta}>Drugs: <span className={styles.valor}>{product.drugs.map((drug) => drug.name)}</span></div>
                <div className={styles.etiqueta}>Laboratory: <span className={styles.valor}>{product.Product_Laboratory.name}</span></div>
                <div className={styles.etiqueta}>Presentation type: <span className={styles.valor}>{product.Product_PresentationType.type}</span></div>

              </div>


              <div className={styles.deleteButton}>
                <Link to={`/product/${product.id}`}>
                  View Product
                </Link>
              </div>

            </div>
          </div>

        ))}
      </div>

    </div>
  );
}
export default Products;
