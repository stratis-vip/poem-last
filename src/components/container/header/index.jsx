import styles from "./header.module.css"
import NavBar from "./nav-bar"
import Title from "./title"
import React from "react";

const Header = () => {
  return (
    <div className={styles.headerMain}>
      <Title title={"Άπαντα Χριστοδούλου"}/>
      <NavBar/>

    </div>)
}
export default Header
