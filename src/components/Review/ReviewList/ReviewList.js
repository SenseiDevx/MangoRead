import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getReviews, setShowModal } from "../../../redux/slices/reviewSlice";
import { useParams } from "react-router-dom";
import { Button, Pagination } from "@mui/material";
import styles from './reviewlist.module.css';
import ModalForReview from "../ModalForReview/ModalForReview";

const ReviewList = ({ userId }) => {
    const dispatch = useDispatch();
    const { review, showModal } = useSelector((state) => state.reviewReducer);
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const toggleModal = () => {
        dispatch(setShowModal(true));
    };

    const handleCloseModal = () => {
        dispatch(setShowModal(false));
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const getCurrentPageComments = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return review.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleAddComment = () => {
        dispatch(getReviews({ id }));
    };

    useEffect(() => {
        dispatch(getReviews({ id }));
    }, [dispatch, id]);

    return (
        <>
            <div className={styles.commentHeader}>
                <h3 className={styles.h3}>Топ комментарий</h3>
                <Button color="secondary" onClick={toggleModal}>Добавить комментарий</Button>
                {showModal && <ModalForReview closeModal={handleCloseModal} userId={userId} onAddComment={handleAddComment} />}
            </div>
            <div className={styles.allBlock}>
                {review.length > 0 ? (
                    getCurrentPageComments().map((comm) => (
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
            <div className={styles.pagination}>
                <Pagination
                    count={Math.ceil(review.length / itemsPerPage)}
                    page={currentPage}
                    color="primary"
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ReviewList;
