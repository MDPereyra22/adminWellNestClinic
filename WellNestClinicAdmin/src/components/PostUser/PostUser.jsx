import React, { useState } from "react";
import axios from "axios"; // Importa Axios
import styles from "./PostUser.module.css"
import validation from "./validation";


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
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Nombre:</label>
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
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Correo Electrónico:</label>
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
          <label>Tipo de DNI:</label>
          <input
            type="number"
            name="dniType"
            value={formData.dniType}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de Nacimiento:</label>
          <input
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Última Actualización:</label>
          <input
            type="text"
            name="upToDate"
            value={formData.upToDate}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contacto de Respaldo:</label>
          <input
            type="text"
            name="backupContact"
            value={formData.backupContact}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>URL de Imagen:</label>
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
          <button type="submit">Crear Usuario</button>
        </div>
      </form>
    </div>
  );
};

export default PostUser;