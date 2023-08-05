import React, { useEffect, useRef, useState } from "react";
import styles from "./modalforreview.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../redux/slices/authSlice";
import {addReview, getReviews, setShowModal} from "../../../redux/slices/reviewSlice";
import {useParams} from "react-router-dom";

const ModalForReview = ({ closeModal, userId }) => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const { user } = useSelector((state) => state.authReducer);
    const modalRef = useRef(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData(userId));
        }
    }, [dispatch, userId]);

    const handleClose = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
            dispatch(setShowModal(false));
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token');
        console.log('Token', token)
        if (!token) {
            // Если токен отсутствует, выведем сообщение об ошибке
            console.error('Ошибка: Токен авторизации отсутствует');
            return;
        }

        const data = {
            userId: userId,
            id: id,
            token: user?.access,
            post: {
                id: id,
                text: comment,
            },
        };
        console.log("users", user)

        await dispatch(addReview(data))
        await dispatch(getReviews({id}))
        dispatch(setShowModal(false))

    };

    return (
        <>
            <div className={styles.modalWindow} onClick={handleClose}>
                <div className={styles.modalRating} ref={modalRef}>
                    <div className={styles.reviewBlock}>
                        <div className={styles.reviewTopBlock}>
                            <img className={styles.img} src={user?.image_file} alt={user?.user} />
                            <h3 className={styles.h3}>{user?.user}</h3>
                        </div>
                        <div className={styles.reviewBottomBlock}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Добавьте комментарий"
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} // Capture user's input
                            />
                            <button className={styles.button} onClick={handleAddReview} type="submit">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalForReview;
