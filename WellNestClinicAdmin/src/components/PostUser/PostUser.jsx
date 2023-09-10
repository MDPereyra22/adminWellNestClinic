import React, { useState } from "react";
import axios from "axios"; 
import styles from "./PostUser.module.css"
import validation from "./validation";
import { Link } from "react-router-dom";


const PostUser = () => {

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    dni: "",
    dniType: 0,
    birthDate: "",
    address: "",
    upToDate: "",
    backupContact: "",
    imageUrl: "",
    plan: 0,
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validation({
      ...formData,
      [event.target.name]: event.target.value
    }))
  };

  console.log(errors)

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      axios
        .post("https://serverwellnestclinic.onrender.com/userClient", formData)
        .then((response) => {
          console.log(response.data);
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.error)
        });
      setFormData({
        name: "",
        lastName: "",
        email: "",
        dni: "",
        dniType: 0,
        birthDate: "",
        address: "",
        upToDate: "",
        backupContact: "",
        imageUrl: "",
        plan: 0,
      });

    } else {
      alert("Incomplete or invalid data")
    }
  };
  console.log(formData)
  return (
    <div className={styles.container}>
              <Link to="/home" className={styles.link}>Home </Link>
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className={styles.error}>{errors.name}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Lastname:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>DNI type:</label>
          <input
            type="number"
            name="dniType"
            value={formData.dniType}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Birthdate:</label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Up to date:</label>
          <input
            type="text"
            name="upToDate"
            value={formData.upToDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Backup contact:</label>
          <input
            type="text"
            name="backupContact"
            value={formData.backupContact}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Image url:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Plan:</label>
          <input
            type="number"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
          />
          {errors.plan && (
            <p className={styles.error}>{errors.plan}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <button type="submit">Create user</button>
        </div>
      </form>
    </div>
  );
};

export default PostUser;