import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Users.module.css";
import { Link } from "react-router-dom";


function Users() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("https://serverwellnestclinic.onrender.com/userClient/")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/home" className={styles.link}>Go back </Link>
      <h2>List of clients</h2>
      <ul>
        {clients.map((client, index) => (
          <li key={index} className={styles.clientItem}>
            <p className={styles.field}>Name:</p>
            <p className={styles.value}>{client.name} {client.lastName}</p>
            <p className={styles.field}>Email address:</p>
            <p className={styles.value}>{client.email}</p>
            <p className={styles.field}>DNI:</p>
            <p className={styles.value}>{client.dni}</p>
            <p className={styles.field}>Birth date:</p>
            <p className={styles.value}>{client.birthDate}</p>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
