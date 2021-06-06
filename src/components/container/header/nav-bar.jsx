import React from "react";
import {Link} from "react-router-dom"
import styles from './nav-bar.module.css'

const NavBar = () => {
    return (<div className={styles.navBar}>
        <div className={styles.navLink}><Link to="/">Home</Link></div>
        <div className={styles.navLink}><Link to="/about">About</Link></div>
        <div className={styles.navLink}><Link to="/detail">detail</Link></div>
    </div>)
}

export default NavBar
