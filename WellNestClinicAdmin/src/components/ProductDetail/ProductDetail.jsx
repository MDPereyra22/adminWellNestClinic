import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://serverwellnestclinic.onrender.com/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <div>
        <h2>{product.name}</h2>
        <p>Description: {product.description}</p>
        <p>Amount: {product.amount} mg</p>
        <p>Dose: {product.dose}</p>
        <p>Stock: {product.stock} left</p>
        <p>Price: ${product.price}</p>
        <p>Drugs: {product.drugs.map((drug) => drug.name).join(", ")}</p>
        <p>Laboratory: {product.Product_Laboratory.name}</p>
        <p>Presentation type: {product.Product_PresentationType.type}</p>
        {/* Agrega más detalles según tus necesidades */}
      </div>
    </div>
  );
}

export default ProductDetail;
