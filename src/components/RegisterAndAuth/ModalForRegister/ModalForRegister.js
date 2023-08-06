import React, {useRef, useState} from 'react';
import styles from "./modalforregister.module.css";
import {Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import defaultimage from '../../../assets/other/imagedef.jpg'
import * as yup from "yup";
import {Formik} from "formik";
import ModalForAuth from "../ModalForAuth/ModalForAuth";

const validationSchema = yup.object().shape({
    selectedImage: yup.mixed().required('Изображение обязательно для загрузки'),
    username: yup.string().min(10, 'Имя пользователя должно быть не менее 10 символов').required('Имя пользователя обязательно для заполнения'),
    nickname: yup.string().min(10, 'Никнейм должен быть не менее 10 символов').required('Никнейм обязателен для заполнения'),
    password: yup.string().min(10, 'Пароль должен быть не менее 10 символов').required('Пароль обязателен для заполнения')
        .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
        .test('unique-values', 'Значения всех полей должны различаться', function (value) {
            const {username, nickname} = this.parent;
            return username !== nickname && username !== value && nickname !== value;
        }),
});

const ModalForRegister = ({closeModalRegister}) => {
    const fileInputRef = useRef(null);
    const modalRef = useRef(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleAddPhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file)
    };

    const handleFormSubmit = (values) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('nickname', values.nickname);
        formData.append('password', values.password);
        formData.append('image_file', values.selectedImage);

        axios.post('http://68.183.214.2:8666/api/auth/signup/', formData)
            .then((response) => {
                console.log('Registration successful:', response.data);
                closeModalRegister()
                alert("Чтобы войти в свой акк нажмите на Войти и введите свои данные")
            })
            .catch((error) => {
                console.error('Registration error:', error);
            });
    };


    const handleClose = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModalRegister();
            setShowAuthModal(false); // Set showAuthModal to false to close the login modal if it's open
        }
    };

    return (
        <>
            {isModalOpen && !showAuthModal && (
                <div className={styles.modalWindow} onMouseDown={handleClose}>
                    <div className={styles.modalRating} ref={modalRef}>
                        <div className={styles.allBlock}>
                            <div className={styles.authTexts}>
                                <div className={styles.authButtons}>
                                    <button
                                        className={styles.button1}
                                        onClick={() => setShowAuthModal(true)}
                                    >
                                        ВХОД
                                    </button>
                                    <button className={styles.button1}>Регистрация</button>
                                </div>
                                <CloseIcon onClick={closeModalRegister} sx={{marginTop: '-22px', cursor: 'pointer'}}/>
                            </div>
                            <div className={styles.form}>
                                <Formik
                                    initialValues={{
                                        username: '',
                                        nickname: '',
                                        password: '',
                                        selectedImage: null,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, {setSubmitting}) => {
                                        handleFormSubmit(values);
                                    }}
                                >
                                    {({values, errors, touched, handleChange, handleSubmit, setFieldValue}) => (
                                        <>
                                            <div className={styles.inputFile}>
                                                {values.selectedImage ? (
                                                    <img className={styles.img}
                                                         src={URL.createObjectURL(values.selectedImage)} alt="Selected"/>
                                                ) : (
                                                    <img className={styles.img} src={defaultimage} alt="Avatar"/>
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
                                                    style={{display: 'none'}}
                                                    onChange={(e) => {
                                                        setFieldValue('selectedImage', e.target.files[0]);
                                                        handleFileChange(e);
                                                    }}
                                                />
                                                {touched.selectedImage && !values.selectedImage &&
                                                    <p className={styles.error}>Изображение обязательно для загрузки</p>}
                                            </div>
                                            <div className={styles.inputForm}>
                                                <input
                                                    required
                                                    className={styles.input}
                                                    type="text"
                                                    placeholder="Username"
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                />
                                                {touched.username && errors.username &&
                                                    <p className={styles.error}>{errors.username}</p>}
                                                <input
                                                    required
                                                    className={styles.input}
                                                    type="text"
                                                    placeholder="Nickname"
                                                    name="nickname"
                                                    value={values.nickname}
                                                    onChange={handleChange}
                                                />
                                                {touched.nickname && errors.nickname &&
                                                    <p className={styles.error}>{errors.nickname}</p>}
                                                <input required
                                                       className={styles.input}
                                                       type="password"
                                                       placeholder="Password"
                                                       name="password"
                                                       value={values.password}
                                                       onChange={handleChange}
                                                />
                                                {touched.password && errors.password &&
                                                    <p className={styles.error}>{errors.password}</p>}
                                                <button className={styles.button} type="submit"
                                                        onClick={handleSubmit}>регистрация
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showAuthModal && <ModalForAuth closeModalAuth={() => setShowAuthModal(false)}/>}
        </>
    );
};

export default ModalForRegister;


