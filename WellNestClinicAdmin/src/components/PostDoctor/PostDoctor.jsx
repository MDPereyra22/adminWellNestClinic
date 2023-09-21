/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getSpecialties } from "../../redux/action/actions";
import styles from "./PostDoctor.module.css"

const PostDoctor = () => {
  const navigate = useNavigate();
  const specialities = useSelector((state) => state.specialities);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    specialities: [],
  });

  useEffect(() => {
    dispatch(getSpecialties());
  }, []);

  console.log(specialities);
  console.log(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectSpeciality = (event) => {
    const selectedSpeciality = event.target.value;
    if (selectedSpeciality !== "") {
      if (!formData.specialities.includes(selectedSpeciality)) {
        setFormData({
          ...formData,
          specialities: [...formData.specialities, selectedSpeciality],
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const refreshToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    axios
      .post(
        "https://serverwellnestclinic.onrender.com/doctor",
        formData,
        config
      )
      .then((response) => {
        alert("Doctor created successfully!", response.data);
        navigate("/home");
      })
      .catch((error) => {
        alert("Error creating doctor", error);
      });
  };

  return (
    <div className={styles.componentContainer}>
      <div className={styles.containerForm}>
        <h2>Create a new doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.containerField}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.containerField}>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.containerField}>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.containerField}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.containerField}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.containerField}>
            <label>Specialities:</label>
            <select className={styles.selectSpeciality} onChange={(e) => handleSelectSpeciality(e)}>
              <option></option>
              {specialities.map((speciality) => (
                <option key={speciality.id} value={speciality.id}>
                  {speciality.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.containerButtonsPostDoctor}>
            <Link className={styles.buttonHome} to={"/home"}>Go back</Link>
            <button className={styles.buttonAddDoctor} type="submit">Create Doctor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDoctor;
