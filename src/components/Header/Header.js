import React, {useEffect, useState} from 'react';
import styles from './header.module.css';
import {ReactComponent as MangoLogo} from "../../assets/header/mangoLogo.svg";
import InputSearch from "../InputSearch/InputSearch";
import {Link, useLocation} from "react-router-dom";
import ModalForRegister from "../RegisterAndAuth/ModalForRegister/ModalForRegister";
import ModalForAuth from "../RegisterAndAuth/ModalForAuth/ModalForAuth";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, logoutUser} from "../../redux/slices/authSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import jwtDecode from "jwt-decode";


const Header = () => {
    // localStorage.removeItem('token')
    const location = useLocation()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginModal, setIsLoginModal] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const {user, userId} = useSelector(state => state.authReducer);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const tokenExpirationDate = new Date(decodedToken.exp * 1000);
            dispatch(fetchUserData())
            if (new Date() > tokenExpirationDate) {
                handleLogout();
            }
        }
    }, [location]);


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

    const toggleButton = () => {
        setShowButton(!showButton);
    };


    return (
        <div className={styles.allBlock}>
            <div className={styles.headerBlock}>
                <div className={styles.logoBlock}>
                    <Link to="/">
                        <MangoLogo/>
                    </Link>
                    <div className={styles.logoText}>
                        <h2 className={styles.h2}>MangoRead</h2>
                        <p className={styles.p}>Читай мангу с нами</p>
                    </div>
                </div>
                <InputSearch/>
                <div className={styles.buttons}>
                    {user.image_file || userId ? (
                        <div className={styles.profileBlock}>
                            <h3 className={styles.username}>{userId?.user}</h3>
                            <div className={styles.imgBlock}>
                                <img
                                    className={styles.img}
                                    src={user?.image_file}
                                    alt={user?.user}
                                />
                                <ArrowDropDownIcon sx={{cursor: "pointer"}} onClick={toggleButton}/>
                                {showButton && (
                                    <button className={styles.logout} onClick={handleLogout}>
                                        Выйти
                                    </button>
                                )}
                            </div>
                        </div>
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
            {isModalOpen && <ModalForRegister closeModalRegister={closeModalRegister}/>}
            {loginModal && <ModalForAuth closeModalAuth={closeModalAuth}/>}
        </div>
    );
};

export default Header;
