/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { updateProduct } from "../../redux/action/actions";
import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal"

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    description: "",
    laboratory: 1,
    presentation: 1,
    drugs: [1],
    amount: "",
    dose: "",
    imageUrl: "",
    stock: 0,
    price: 0,
    needPrescription: false,
    deleted: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const refreshToken = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        };
        const response = await axios.get(`https://serverwellnestclinic.onrender.com/product/${id}`, config);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    setEditedProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      laboratory: product.laboratory,
      presentation: product.presentationType,
      drugs: product.drugs,
      amount: product.amount,
      dose: product.dose,
      imageUrl: product.imageUrl,
      stock: product.stock,
      price: product.price,
      needPrescription: product.needPrescription,
      deleted: product.deleted,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProduct(editedProduct)
      setProduct({ ...editedProduct });

      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.container}>
      <BackGroundGlobal imgBackGround = 'https://d1odllitvcy39q.cloudfront.net/images/141_nueva-fachada-seguro-americano-2014.jpg'></BackGroundGlobal>
      <h1 className={styles.title}>Product Detail</h1>
      <div className={styles.card}>
        {isEditing ? (
          <>
            <h2>Edit Product</h2>
            <label > Name</label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              placeholder="Name"
            />
            <label > Description</label>
            <input
              type="text"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, description: e.target.value })
              }
              placeholder="Description"
            />
            <label > Amount</label>
            <input
              type="text"
              value={editedProduct.amount}
              onChange={(e) => setEditedProduct({ ...editedProduct, amount: e.target.value })}
              placeholder="Amount"
            />
            <label > Dose</label>
            <input
              type="text"
              value={editedProduct.dose}
              onChange={(e) => setEditedProduct({ ...editedProduct, dose: e.target.value })}
              placeholder="Dose"
            />
            <label > Image URL</label>
            <input
              type="text"
              value={editedProduct.imageUrl}
              onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
              placeholder="Image URL"
            />
            <label > Stock</label>
            <input
              type="text"
              value={editedProduct.stock}
              onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
              placeholder="Stock"
            />
            <label > Price</label>
            <input
              type="text"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
              placeholder="Price"
            />
            <label >Deleted</label>
            <select
              value={editedProduct.deleted ? "true" : "false"}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  deleted: e.target.value === "true",
                })
              }
            >
              <option value="false">Active</option>
              <option value="true">Inactive</option>
            </select>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p>Status: {product.deleted ? "Inactive" : "Active"}</p>
            <p>Description: {product.description}</p>
            <p>Amount: {product.amount} mg</p>
            <p>Dose: {product.dose}</p>
            <p>Stock: {product.stock} left</p>
            <p>Price: ${product.price}</p>
            <p>Drugs: {product.drugs.map((drug) => drug.name).join(", ")}</p>
            <button className={styles.buttonEdit} onClick={handleEdit}>Edit Product</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
