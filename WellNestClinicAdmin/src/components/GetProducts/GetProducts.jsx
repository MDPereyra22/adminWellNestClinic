/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/action/actions";
import styles from "./GetProducts.module.css";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await fetchProducts();
        const existingProducts = allProducts.filter(
          (product) => !product.deleted
        );
        const deleted = allProducts.filter((product) => product.deleted);

        setProducts(existingProducts);
        setDeletedProducts(deleted);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const productsCardList = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const reduceName = (string) => {
    if (string.length > 12) {
      let newString = string.substring(0, 9);
      return newString + "...";
    } else {
      return string;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>All products</h1>
        <Link to="/">
          <button id="back" className={styles.backButton}>
            Go back
          </button>
        </Link>
      </div>
      <div className={styles.containerSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.search}
        />
        <button className={`${styles.buttonShow} ${showDeleted ? styles.buttonActive : styles.buttonDeleted}`} onClick={handleToggleDeleted}>
          {showDeleted ? "Show Active" : "Show Deleted"}
        </button>
      </div>
      <div className={styles.containerProducts}>
        {productsCardList.map((product, index) => {
          return (
            <>
              <div className={styles.containerList}>
                <div className={styles.containerImage}>
                  <img className={styles.imagen} src={product.imageUrl}></img>
                </div>
                <div className={styles.containerDataProduct}>
                  <h1 className={styles.titleProduct}>Name:</h1>
                  <span className={styles.dataProduct}>
                    {reduceName(product.name)}
                  </span>
                </div>
                <div className={styles.containerDataProduct}>
                  <h1 className={styles.titleProduct}>Amount:</h1>
                  <span className={styles.dataProduct}>
                    {product.amount} mg
                  </span>
                </div>
                <div className={styles.containerDataProduct}>
                  <h1 className={styles.titleProduct}>Dose:</h1>
                  <span className={styles.dataProduct}>{product.dose}</span>
                </div>
                <div className={styles.containerDataProduct}>
                  <h1 className={styles.titleProduct}>Stock:</h1>
                  <span className={styles.dataProduct}>
                    {product.stock} left
                  </span>
                </div>
                <div className={styles.containerDataProduct}>
                  <h1 className={styles.titleProduct}>Price:</h1>
                  <span className={styles.dataProduct}>${product.price}</span>
                </div>
                <div className={styles.containerDataProduct}>
                  {showDeleted ? <span className={styles.msgEliminated}>Eliminated Product</span> : null}
                </div>
                <div className={styles.containerDataProduct}>
                  <Link className={`${styles.buttonDetail} ${showDeleted ? styles.buttonDetailDelete : styles.buttonDetail}`} to={`/product/${product.id}`}>View Product</Link>
                </div>
              </div>
            </>
          );
        })}
        <div className={styles.containerPaginated}>
          <button
            className={styles.buttonProduct}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className={styles.numberPage}>
            {currentPage} of {totalPages}
          </span>
          <button
            className={styles.buttonProduct}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
export default Products;
