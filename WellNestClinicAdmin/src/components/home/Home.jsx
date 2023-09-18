/* eslint-disable no-unused-vars */
import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <h1>Welcome, Admin!</h1>
        <Link to="/postUser">Create a new user</Link>
        <Link to="/users">List of users</Link>
        <Link to="/postDoctor">Create a new doctor</Link>
        <Link to="/postProducts">Create a new product</Link>
        <Link to="/getproducts">List of products</Link>
      </div>
    </div>
  );
}

export default Home;
