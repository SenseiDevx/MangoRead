import React from 'react';
import Cards from "../../components/Cards/Cards";
import GenreCatalog from "../../components/GenreCatalog/GenreCatalog";
import styles from './mainpage.module.css'

const MainPage = () => {
    return <>
        <div className="container">
            <div className={styles.container}>
                <GenreCatalog/>
                <Cards/>
            </div>
        </div>
    </>

};

export default MainPage;