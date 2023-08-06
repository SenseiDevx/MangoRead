import React, { useEffect, useState } from 'react';
import styles from './genrecatalog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {getGenres, getTypes, updateSelectedGenres, updateSelectedTypes,} from '../../redux/slices/genreSlice';
import { Button, Checkbox } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getMangas } from '../../redux/slices/mangaSlice';

const GenreCatalog = () => {
    const dispatch = useDispatch();
    const { genres, selectedGenres, types, selectedTypes } = useSelector((state) => state.genreReducer);
    const [showParentGenreBlock, setShowParentGenreBlock] = useState(true);
    // const uniqueTypes = new Set(types.map((type) => type.type));
    // console.log("types", uniqueTypes)

    const handleBackClick = () => {
        setShowParentGenreBlock((prevShowParentGenreBlock) => !prevShowParentGenreBlock);
    };

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getTypes());
    }, [dispatch]);

    // Обработчик для обновления выбранных жанров
    // Обработчик для обновления выбранных жанров
    const handleGenreChange = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            // Если жанр уже выбран, убираем его из списка выбранных
            dispatch(updateSelectedGenres(selectedGenres.filter((id) => id !== genreId)));
        } else {
            // Иначе, добавляем его в список выбранных
            dispatch(updateSelectedGenres([...selectedGenres, genreId]));
        }
    };

// Обработчик для обновления выбранных типов
    const handleTypesChange = (type) => {
        if (selectedTypes.includes(type)) {
            dispatch(updateSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type)));
        } else {
            dispatch(updateSelectedTypes([...selectedTypes, type]));
        }
    };


    const handleApplyFilter = () => {
        // Выполните фильтрацию по выбранным жанрам и типам
        dispatch(getMangas({ selectedGenres, selectedTypes }));
    };

    return (
        <>
            <div className={styles.allBlock}>
                <div className={styles.back} onClick={handleBackClick}>
                    <ArrowBackIosIcon color="gray" />
                    <p className={styles.p}>Назад</p>
                </div>
                {showParentGenreBlock ? (
                    <div className={styles.typeBlock}>
                        <h3 className={styles.h3}>Тип</h3>
                        <div className={styles.genre}>
                            {types &&
                                types.map((type) => (
                                    <div className={styles.genre} key={type.id}>
                                        <Checkbox
                                            color="green"
                                            checked={selectedTypes.includes(type?.type)}
                                            onChange={() => handleTypesChange(type?.type)} // Используем идентификатор типа
                                        />
                                        <p className={styles.p}>{type?.type}</p>
                                    </div>
                                ))}
                            <div className={styles.buttons}>
                                <Button
                                    className={styles.button}
                                    variant="contained"
                                    color="purple"
                                    sx={{ padding: '16px 32px', color: '#FFFFFF' }}
                                >
                                    Сбросить
                                </Button>
                                <Button
                                    className={styles.button}
                                    variant="contained"
                                    color="purple"
                                    sx={{ padding: '16px 32px', color: '#FFFFFF' }}
                                    onClick={handleApplyFilter} // Добавляем обработчик для кнопки "Применить"
                                >
                                    Применить
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.parentGenreBlock}>
                        <h3 className={styles.h3}>Жанры</h3>
                        <div className={styles.genreBlock}>
                            {genres &&
                                genres.map((genre) => (
                                    <div className={styles.genre} key={genre.id}>
                                        <Checkbox
                                            color="green"
                                            checked={selectedGenres.includes(genre.id)}
                                            onChange={() => handleGenreChange(genre.id)}
                                        />
                                        <p className={styles.p}>{genre.title}</p>
                                    </div>
                                ))}
                        </div>
                        <div className={styles.buttons}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                color="purple"
                                sx={{ padding: '16px 32px', color: '#FFFFFF' }}
                            >
                                Сбросить
                            </Button>
                            <Button
                                className={styles.button}
                                variant="contained"
                                color="purple"
                                sx={{ padding: '16px 32px', color: '#FFFFFF' }}
                                onClick={handleApplyFilter} // Добавляем обработчик для кнопки "Применить"
                            >
                                Применить
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default GenreCatalog;
