import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMangas} from "../../redux/slices/mangaSlice";
import styles from './cards.module.css'
import {Link} from "react-router-dom";

const Cards = () => {
    const dispatch = useDispatch()
    const {mangas} = useSelector((state) => state.mangoReducer)

    useEffect(() => {
        dispatch(getMangas())
    }, [])

    // Функция для обрезания текста и добавления двух точек, если он превышает 20 символов
    const truncateDescription = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return <>
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
    </>

};

export default Cards;