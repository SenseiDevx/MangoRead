import React, { useEffect, useRef, useState } from 'react';
import styles from './modalforauth.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slices/authSlice';

const ModalForAuth = ({ closeModalAuth }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { token } = useSelector((state) => state.authReducer);
    const [isModalOpen, setIsModalOpen] = useState(true); // New state for modal visibility

    useEffect(() => {
        if (token) {
            console.log('Пользователь уже вошел в систему!'); // Пример действия при наличии токена
        }
    }, [token]);

    const handleClose = (e) => {
        if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
            // Click occurred outside the modal, so close it
            closeModalAuth();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username,
            password,
        };

        dispatch(loginUser(data))
            .unwrap()
            .then((data) => {
                console.log('Успешный логин!', data);
                setUsername('');
                setPassword('');
                setIsModalOpen(false);
            })
            .catch((error) => {
                setError('Пароль или логин не совпадает');
                console.log(error);
            });
    };

    return (
        <>
            {isModalOpen && (
                <div className={styles.modalWindow} onClick={handleClose}>
                    <div ref={modalRef} className={styles.modalRating}>
                        <div className={styles.allBlock}>
                            <div className={styles.authTexts}>
                                <div className={styles.authButtons}>
                                    <button className={styles.button}>Вход</button>
                                    <button className={styles.button1}>Регистрация</button>
                                </div>
                                <CloseIcon
                                    onClick={() => {
                                        setIsModalOpen(false); // Close the modal when close icon is clicked
                                        closeModalAuth();
                                    }}
                                    sx={{ marginTop: '-22px', cursor: 'pointer' }}
                                />
                            </div>
                            <div className={styles.form}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className={styles.input}
                                        placeholder="Username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <br />
                                    <input
                                        className={styles.input}
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <br />
                                    <div className={styles.checkBox}>
                                        <input type="checkbox" id="checkBox" />
                                        <label htmlFor="checkBox">Запомнить меня</label>
                                    </div>
                                    <br />
                                    <button className={styles.button} type="submit">
                                        ВХОД
                                    </button>
                                </form>
                                {error && <div>{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalForAuth;
