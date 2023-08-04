import React, {useRef, useState} from 'react';
import styles from "./modalforregister.module.css";
import ava from '../../../assets/other/nickname.svg'
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalForAuth from "../ModalForAuth/ModalForAuth";
import axios from "axios";

const ModalForRegister = ({closeModalRegister}) => {
    const fileInputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null)


    const handleAddPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file)
    };


    // для модалки
    const modalRef = useRef(null);

    const handleClose = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            // Click occurred outside the modal, so close it
            closeModalRegister();
        }
    };


    const handleFormSubmit = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('nickname', nickname);
        formData.append('password', password);
        formData.append('image_file', selectedImage);

        axios.post('http://68.183.214.2:8666/api/auth/signup/', formData)
            .then((response) => {
                // Handle successful registration (e.g., show a success message)
                console.log('Registration successful:', response.data);
            })
            .catch((error) => {
                // Handle registration error (e.g., show an error message)
                console.error('Registration error:', error);
            });
    };



    return (
        <>
            <div className={styles.modalWindow} onMouseDown={handleClose}>
                    <div className={styles.modalRating}>
                        <div className={styles.allBlock}>
                            <div className={styles.authTexts}>
                                <div className={styles.authButtons}>
                                    <button className={styles.button} >Вход</button>
                                    <button className={styles.button1}>Регистрация</button>
                                </div>
                                <CloseIcon onClick={closeModalRegister} sx={{marginTop: '-22px', cursor: 'pointer'}}/>
                            </div>
                            <div className={styles.form}>
                                <div className={styles.inputFile}>
                                    {selectedImage ? (
                                        <img className={styles.img} src={URL.createObjectURL(selectedImage)} alt="Selected" />
                                    ) : (
                                        <img className={styles.img} src={ava} alt="Avatar" />
                                    )}
                                    <label htmlFor="photoInput">
                                        <Button color="secondary" onClick={handleAddPhoto}>
                                            ДОБАВИТЬ ФОТО
                                        </Button>
                                    </label>
                                    <input
                                        type="file"
                                        id="photoInput"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className={styles.inputForm}>
                                    <input
                                        required
                                        className={styles.input}
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <input
                                        required
                                        className={styles.input}
                                        type="text"
                                        placeholder="Nickname"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                    />
                                    <input
                                        required
                                        className={styles.input}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button className={styles.button} type="submit" onClick={handleFormSubmit}>регистрация</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default ModalForRegister;
