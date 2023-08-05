import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMangas} from '../../redux/slices/mangaSlice';
import styles from './cards.module.css';
import {Link} from 'react-router-dom';
import {Skeleton} from '@mui/material';

const Cards = () => {
    const dispatch = useDispatch();
    const {mangas, loading} = useSelector((state) => state.mangoReducer);

    useEffect(() => {
        dispatch(getMangas());
    }, [dispatch]);

    // Функция для обрезания текста и добавления двух точек, если он превышает 20 символов
    const truncateDescription = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };


    return (
        <>
            {loading ? (
                <div style={{marginTop: '120px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {[...Array(12)].map((_, index) => (
                        <div key={index} style={{margin: '10px'}}>
                            <Skeleton variant="rectangular" width={190} height={220} sx={{borderRadius: '16px'}}/>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.allBlock}>
                    {mangas && mangas?.map((manga) => (
                        <Link to={`/about/${manga.id}`} key={manga?.id}>
                            <div className={styles.cardBlock} key={manga?.id}>
                                <img className={styles.img} src={manga?.image} alt={manga?.en_name}/>
                                <div className={styles.cardText}>
                                    <h3 className={styles.h3}>Год: {manga?.issue_year}</h3>
                                    <p className={styles.p}>{truncateDescription(manga?.description, 30)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )
            }
        </>
    )
};

export default Cards;
