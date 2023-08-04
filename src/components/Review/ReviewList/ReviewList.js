import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../redux/slices/reviewSlice";
import { useParams } from "react-router-dom";
import {Button} from "@mui/material";
import styles from './reviewlist.module.css'
import ModalForReview from "../ModalForReview/ModalForReview";

const ReviewList = ({userId}) => {
    const dispatch = useDispatch()
    const { review } = useSelector((state) => state.reviewReducer)
    const { id } = useParams()
    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }


    useEffect(() => {
        dispatch(getReviews({id}))
    }, [dispatch])

    return <>
        <div className={styles.commentHeader}>
            <h3 className={styles.h3}>Топ комментарий</h3>
            <Button color="secondary" onClick={toggleModal}>Добавить комментарий</Button>
            {showModal && <ModalForReview closeModal={handleCloseModal} userId={userId}/>}
        </div>
        <div className={styles.allBlock}>
            {review.length > 0 ? (
                review.map((comm) => (
                    <div className={styles.reviewBlock} key={comm.id}>
                        <img className={styles.img} src={comm.user.image_file} alt='userImage' />
                        <div className={styles.commentBlock}>
                            <h2 className={styles.h2}>{comm.user.username} {comm.user.nickname}</h2>
                            <span className={styles.span}>{comm.text}</span>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    No comments available
                </div>
            )}
        </div>
    </>
};

export default ReviewList;