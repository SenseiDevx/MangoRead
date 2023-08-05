import React, {useEffect, useState} from 'react';
import styles from './aboutpage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getMangaById} from '../../redux/slices/mangaSlice';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import ReviewList from "../../components/Review/ReviewList/ReviewList";
import axios from "axios";

const AboutPage = ({userId}) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {manga, loading} = useSelector((state) => state.mangoReducer);
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        dispatch(getMangaById(id));
        axios.get("http://68.183.214.2:8666/api/v1/genre/")
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => {
                console.error("Error", error.message);
            });
    }, [id, dispatch]);

    const back = () => {
        navigate('/');
    }

    // Функция для преобразования числовых значений жанров в названия
    const getGenresByIds = (genreIds) => {
        return genreIds.map(genreId => {
            const genre = genres.find(item => item.id === genreId);
            return genre ? genre.title : "";
        });
    }

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
                                <img className={styles.img} src={manga?.image} alt={manga?.en_name}/>
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
                                    <div className={styles.genreBlock}>
                                        <h3 className={styles.h3}>Жанр: </h3>
                                        <p className={styles.p}>{getGenresByIds(manga?.genre).join(", ")}</p>
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
