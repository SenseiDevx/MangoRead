import React, { useEffect, useRef, useState } from "react";
import styles from "./modalforreview.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../../redux/slices/reviewSlice";
import {fetchUserData} from "../../../redux/slices/authSlice";

const ModalForReview = ({ closeModal, userId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer);
    const modalRef = useRef(null);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData(userId));
        }
    }, [dispatch, userId]);

    const handleClose = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            // Click occurred outside the modal, so close it
            closeModal();
        }
    };

    const mangaId = userId
    const text = commentText
    const token = localStorage.getItem('token')

    const handleAddComment = () => {
        dispatch(addReview({ mangaId, text, token}));
        setCommentText("");
        closeModal();
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
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                            />
                            <button className={styles.button} onClick={handleAddComment} type="submit">
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
