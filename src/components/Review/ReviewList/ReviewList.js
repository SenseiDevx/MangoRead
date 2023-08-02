// ReviewList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../../redux/slices/reviewSlice';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './reviewlist.module.css';
import ModalForReview from '../ModalForReview/ModalForReview';

const ReviewList = () => {
    const dispatch = useDispatch();
    const { review } = useSelector((state) => state.reviewReducer);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    const closeModal = (event) => {
        if (event.target.classList.contains('backdrop')) {
            toggleModal();
        }
    };

    useEffect(() => {
        dispatch(getReviews(id));
    }, [dispatch, id]);

    return (
        <>
            <div className={styles.commentHeader}>
                <h3 className={styles.h3}>Топ комментарий</h3>
                <Button color="secondary" onClick={toggleModal}>
                    Добавить комментарий
                </Button>
            </div>
            <div>
                {review.length > 0 ? (
                    review.map((comm) => (
                        <div key={comm.id}>
                            <img src={comm.user.image_file} alt="userImage" />
                            <div>
                                <h2>
                                    {comm.user.username} {comm.user.nickname}
                                </h2>
                                <span>{comm.text}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No comments available</div>
                )}
            </div>
            {showModal && (
                <div className="backdrop" onClick={closeModal}>
                    <ModalForReview onClose={toggleModal} />
                </div>
            )}
        </>
    );
};

export default ReviewList;
