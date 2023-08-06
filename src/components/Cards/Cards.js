import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMangas} from '../../redux/slices/mangaSlice';
import styles from './cards.module.css';
import {Link} from 'react-router-dom';
import {CircularProgress, Pagination, Skeleton} from '@mui/material';

const Cards = () => {
    const dispatch = useDispatch();
    const {mangas, loading} = useSelector((state) => state.mangoReducer);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    useEffect(() => {
        dispatch(getMangas());
    }, [dispatch]);

    // Функция для обрезания текста и добавления двух точек, если он превышает 20 символов
    const truncateDescription = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    }


    const getCurrentPageCards = () => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return mangas.slice(startIndex, startIndex + itemsPerPage)
    }


    return (
        <>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: "300px",
                        marginBottom: "100px" }}>
                    <CircularProgress size="120px" />
                </div>
            ) : (
                <div className={styles.allBlock}>
                    {mangas.length > 0 ? (
                        getCurrentPageCards().map((manga) => {
                            return (
                                <Link to={`/about/${manga.id}`} key={manga?.id}>
                                    <div className={styles.cardBlock} key={manga?.id}>
                                        <img className={styles.img} src={manga?.image} alt={manga?.en_name}/>
                                        <div className={styles.cardText}>
                                            <h3 className={styles.h3}>Год: {manga?.issue_year}</h3>
                                            <p className={styles.p}>{truncateDescription(manga?.description, 30)}</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div>Нету Манг на странице</div>
                    )}
                </div>
            )}
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "0 auto" }}>
                <Pagination
                    count={Math.ceil(mangas.length / itemsPerPage)}
                    page={currentPage}
                    color="green"
                    onChange={handlePageChange}
                />
            </div>
        </>
    )
};

export default Cards;
