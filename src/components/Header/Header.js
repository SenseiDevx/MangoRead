import React from 'react';
import styles from './header.module.css';
import { ReactComponent as MangoLogo } from "../../assets/header/mangoLogo.svg";
import InputSearch from "../InputSearch/InputSearch";

const Header = () => {
    return (
        <div className={styles.allBlock}>
            <div className={styles.headerBlock}>
                <div className={styles.logoBlock}>
                    <MangoLogo />
                    <div className={styles.logoText}>
                        <h2 className={styles.h2}>MangoRead</h2>
                        <p className={styles.p}>Читай мангу с нами</p>
                    </div>
                </div>
                <InputSearch />
                <div className={styles.buttons}>
                    <button className={styles.login}>Войти</button>
                    <button className={styles.signUp}>Регистрация</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
