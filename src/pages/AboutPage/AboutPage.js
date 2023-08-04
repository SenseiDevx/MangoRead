import React, {useEffect, useState} from 'react';
import styles from './aboutpage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getMangaById, getMangas} from '../../redux/slices/mangaSlice';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import ReviewList from "../../components/Review/ReviewList/ReviewList";
import ModalForReview from "../../components/Review/ModalForReview/ModalForReview";

const AboutPage = ({userId}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {manga, loading} = useSelector((state) => state.mangoReducer);
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getMangaById(id));
    }, [id, dispatch]);

    const back = () => {
        navigate('/');
    }


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };


    return (
        <>
            <div className="container">
                <Button onClick={back}>Назад</Button>
                <div className={styles.allBlock}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : manga ? (
                        <div className={styles.mangoBlock} key={manga?.id}>
                            <div className={styles.topMangoBlock}>
                                <div>
                                    <img className={styles.img} src={manga?.image} alt={manga?.en_name}/>
                                </div>
                                <div className={styles.mangoData}>
                                    <h3 className={styles.name}>{manga?.ru_name}</h3>
                                    <div className={styles.dataBlock}>
                                        <h3 className={styles.h3}>Информация:</h3>
                                    </div>
                                    <div className={styles.dataBlock}>
                                        <h3 className={styles.h3}>Тип: </h3>
                                        <p className={styles.p}>{manga?.type}</p>
                                    </div>
                                    <div className={styles.dataBlock}>
                                        <h3 className={styles.h3}>Год: </h3>
                                        <p className={styles.p}>{manga?.issue_year}</p>
                                    </div>
                                    <div className={styles.dataBlock}>
                                        <h3 className={styles.h3}>Жанр: </h3>
                                        <p className={styles.p}>{manga?.genre}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sinopsis}>
                                <h2 className={styles.h2}>Синопсис</h2>
                                <p className={styles.p}>{manga?.description}</p>
                            </div>
                            <ReviewList userId={userId}/>
                        </div>
                    ) : (
                        <div>Manga not found</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AboutPage;
