import styles from './container.module.css'
import React from "react";
import Header from './header'


const Container = ({children}) => {


    return (
        <div className={styles.containerMain}>
            <Header/>
            {children}
        </div>)
}

export default Container
