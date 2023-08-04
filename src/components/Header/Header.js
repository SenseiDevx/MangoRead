import React, {useEffect, useState} from 'react';
import styles from './header.module.css';
import { ReactComponent as MangoLogo } from "../../assets/header/mangoLogo.svg";
import InputSearch from "../InputSearch/InputSearch";
import {Link} from "react-router-dom";
import ModalForRegister from "../RegisterAndAuth/ModalForRegister/ModalForRegister";
import ModalForAuth from "../RegisterAndAuth/ModalForAuth/ModalForAuth";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, logoutUser} from "../../redux/slices/authSlice";

const Header = ({userId}) => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginModal, setIsLoginModal] = useState(false);
    const {user} = useSelector(state => state.authReducer);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData(userId));
        }
    }, [dispatch, userId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        console.log('Token was deleted')
    };

    const openModalRegister = () => {
        setIsModalOpen(true);
    };

    const closeModalRegister = () => {
        setIsModalOpen(false);
    };

    const openModalAuth = () => {
        setIsLoginModal(true);
    };

    const closeModalAuth = () => {
        setIsLoginModal(false);
    };

    return (
        <div className={styles.allBlock}>
            <div className={styles.headerBlock}>
                <div className={styles.logoBlock}>
                    <Link to="/">
                        <MangoLogo />
                    </Link>
                    <div className={styles.logoText}>
                        <h2 className={styles.h2}>MangoRead</h2>
                        <p className={styles.p}>Читай мангу с нами</p>
                    </div>
                </div>
                <InputSearch />
                <div className={styles.buttons}>
                    {user ? (
                        <>
                            <h3 className={styles.username}>{user?.user}</h3>
                            <img className={styles.img} src={user?.image} alt={user?.user}/>
                            <button className={styles.logout} onClick={handleLogout}>
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={styles.login} onClick={openModalAuth}>
                                Войти
                            </button>
                            <button className={styles.signUp} onClick={openModalRegister}>
                                Регистрация
                            </button>
                        </>
                    )}
                </div>
            </div>
            {isModalOpen && <ModalForRegister closeModalRegister={closeModalRegister} />}
            {loginModal && <ModalForAuth closeModalAuth={closeModalAuth} />}
        </div>
    );
};

export default Header;
