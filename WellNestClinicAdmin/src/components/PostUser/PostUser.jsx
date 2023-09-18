/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styles from "./PostUser.module.css";
import validation from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDniType, getPlan, postUser } from "../../redux/action/actions";
import BackGroundGlobal from "../backgrounds/BackgroundGlobal";

const PostUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dniType = useSelector((state) => state.dniType);
  const plan = useSelector((state) => state.plan);
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

  useEffect(() => {
    dispatch(getDniType());
    dispatch(getPlan());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors(
      validation({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(postUser(formData));
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
      navigate("/home");
    } else {
      alert("Incomplete or invalid data");
    }
  };

  return (
    <div className={styles.componentContainer}>
      <div className={styles.formContainer}>
        <h2>Create a new user</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Last name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email address:</label>
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
            <select
              name="dniType"
              value={formData.dniType}
              onChange={handleSelectChange}
            >
              <option value="">Select a DNI type</option>
              {dniType.map((dni) => (
                <option key={dni.id} value={dni.id}>
                  {dni.type}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Birth date:</label>
            <input
              type="date"
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
            <label>Payment up to date:</label>
            <input
              type="date"
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
            <select
              name="plan"
              value={formData.plan}
              onChange={handleSelectChange}
            >
              <option value="">Select plan</option>
              {plan.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttons}>
            <Link to="/home" className={styles.link}>
              Home{" "}
            </Link>
            <button type="submit">Create user</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostUser;
