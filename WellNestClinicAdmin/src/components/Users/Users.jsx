/* eslint-disable no-unused-vars */
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
    <div className={styles.componentContainer}>
      <div className={styles.containerList}>
        <div className={styles.containerTitle}>
          <h1>List of clients</h1>
          <Link to="/home" className={styles.link}>
            Go back{" "}
          </Link>
        </div>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Name:</th>
                <th>Last Name:</th>
                <th>Email address:</th>
                <th>DNI:</th>
                <th>Birth date:</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.name}</td>
                  <td>{client.lastName}</td>
                  <td>{client.email}</td>
                  <td>{client.dni}</td>
                  <td>{client.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
