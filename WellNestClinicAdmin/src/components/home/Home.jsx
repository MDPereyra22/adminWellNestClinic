// Home.js
import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Link to="/postUser">Create new user</Link>
        <Link to="/users">User list</Link>
        <Link to="/postDoctor">Create new doctor</Link>
        <Link to="/deleteUser">Delete a user</Link>
      </div>
    </div>
  );
}

export default Home;
