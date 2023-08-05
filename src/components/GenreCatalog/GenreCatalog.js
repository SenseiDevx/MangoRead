import React, {useEffect, useState} from 'react';
import styles from './genrecatalog.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getGenres, updateSelectedGenres} from "../../redux/slices/genreSlice";
import {Button, Checkbox} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";

const GenreCatalog = () => {
    const dispatch = useDispatch();
    const {genres, selectedGenres} = useSelector((state) => state.genreReducer);
    const [showParentGenreBlock, setShowParentGenreBlock] = useState(true);
    const [mangaInfo, setMangaInfo] = useState(null);

    const handleBackClick = () => {
        setShowParentGenreBlock((prevShowParentGenreBlock) => !prevShowParentGenreBlock);
    };

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    // Обработчик для обновления выбранных жанров
    const handleGenreChange = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            // Если жанр уже выбран, убираем его из списка выбранных
            dispatch(
                updateSelectedGenres(selectedGenres.filter((id) => id !== genreId))
            );
        } else {
            // Иначе, добавляем его в список выбранных
            dispatch(updateSelectedGenres([...selectedGenres, genreId]));
        }
    };

    // Обработчик для применения фильтрации манг по выбранным жанрам
    const handleApplyFilter = () => {

    };





    return <>
        <div className={styles.allBlock}>
            <div className={styles.back} onClick={handleBackClick}>
                <ArrowBackIosIcon color='gray'/>
                <p className={styles.p}>Назад</p>
            </div>
            {showParentGenreBlock ? (
                <div className={styles.typeBlock}>
                    <h3 className={styles.h3}>Тип</h3>
                    <div className={styles.genre}>
                        {genres && genres?.map((type) => (
                            <div className={styles.genre} key={type?.id}>
                                <Checkbox
                                    color="green"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.parentGenreBlock}>
                    <h3 className={styles.h3}>Жанры</h3>
                    <div className={styles.genreBlock}>
                        {genres &&
                            genres?.map((genre) => (
                                <div className={styles.genre} key={genre?.id}>
                                    <Checkbox
                                        color="green"
                                        checked={selectedGenres.includes(genre.id)}
                                        onChange={() => handleGenreChange(genre.id)}
                                    />
                                    <p className={styles.p}>{genre?.title}</p>
                                </div>
                            ))}
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            className={styles.button}
                            variant='contained'
                            color="purple"
                            sx={{padding: '16px 32px', color: '#FFFFFF'}}
                        >
                            Сбросить
                        </Button>
                        <Button
                            className={styles.button}
                            variant='contained'
                            color="purple"
                            sx={{padding: '16px 32px', color: '#FFFFFF'}}
                            onClick={handleApplyFilter} // Добавляем обработчик для кнопки "Применить"
                        >
                            Применить
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </>
};

export default GenreCatalog;
