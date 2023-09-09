import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";
import {IconLogout, IconUserDown} from "@tabler/icons-react";

function NavBar() {
  return (
    <nav className={styles.navSup}>

      <img className={styles.logo} src="/imagenes/Logo.jpg" alt="logo" />
      <div className={styles.menu}>
        
        <Link to="/home" className={styles.linkNoUnderline}>Home </Link>
        <Link to= "/">
        <IconLogout className={styles.iconLogout}/>
        </Link>
      </div>
      
    </nav>
  );
}

export default NavBar;