import React, {useEffect, useState} from 'react';
import styles from './genrecatalog.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getGenres, getTypes, updateSelectedGenres, updateSelectedTypes,} from '../../redux/slices/genreSlice';
import {Button, Checkbox} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {filterMangasByYear, getMangas} from '../../redux/slices/mangaSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const GenreCatalog = () => {
    const dispatch = useDispatch();
    const {genres, selectedGenres, types, selectedTypes} = useSelector((state) => state.genreReducer);
    const [showParentGenreBlock, setShowParentGenreBlock] = useState(true);
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');

    const getUniqueTypes = (types) => {
        const uniqueTypes = [];
        const typeMap = {};

        types.forEach((type) => {
            if (!typeMap[type.type]) {
                typeMap[type.type] = true;
                uniqueTypes.push(type);
            }
        });

        return uniqueTypes;
    };

    const handleBackClick = () => {
        setShowParentGenreBlock(!showParentGenreBlock);
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
        dispatch(getMangas({selectedGenres, selectedTypes}));
    };

    const handleApplyFilterByYear = () => {
        // Выполните фильтрацию по выбранным жанрам, типам и годам
        dispatch(
            filterMangasByYear({
                fromYear: parseInt(fromYear), // Преобразуйте в числовой тип
                toYear: parseInt(toYear), // Преобразуйте в числовой тип
            })
        );
    };


    return (
        <>
            <div className={styles.allBlock}>
                {showParentGenreBlock ? (
                    <div className={styles.genres} onClick={handleBackClick}>
                        <p className={styles.p}>Жанры</p>
                        <div className={styles.arrowBlock}>
                            <p className={styles.p}>все</p>
                            <ArrowForwardIosIcon color="gray" />
                        </div>
                    </div>
                ) : (
                    <div className={styles.back} onClick={handleBackClick}>
                        <ArrowBackIosIcon color="gray" />
                        <p className={styles.p}>Назад</p>
                    </div>
                )}
                {showParentGenreBlock ? (
                    <div className={styles.typeBlock}>
                        <h3 className={styles.h3}>Тип</h3>
                        <div className={styles.type}>
                            {getUniqueTypes(types).map((type) => (
                                <div className={styles.types} key={type.id}>
                                    <Checkbox
                                        color="green"
                                        checked={selectedTypes.includes(type.type)}
                                        onChange={() => handleTypesChange(type.type)}
                                    />
                                    <p className={styles.p}>{type.type}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.inputs}>
                            <input
                                placeholder="От 0"
                                className={styles.input}
                                type="text"
                                value={fromYear}
                                onChange={(e) => setFromYear(e.target.value)}
                            />
                            <input
                                placeholder="До 2023"
                                className={styles.input}
                                type="text"
                                value={toYear}
                                onChange={(e) => setToYear(e.target.value)}
                            />
                        </div>
                        <div className={styles.buttonsType}>
                            <Button
                                className={styles.button}
                                variant="contained"
                                color="purple"
                                sx={{padding: '16px 32px', color: '#FFFFFF'}}
                            >
                                Сбросить
                            </Button>
                            <Button
                                className={styles.button}
                                variant="contained"
                                color="purple"
                                sx={{padding: '16px 32px', color: '#FFFFFF'}}
                                onClick={handleApplyFilterByYear} // Добавляем обработчик для кнопки "Применить"
                            >
                                Применить
                            </Button>
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
                                sx={{padding: '16px 32px', color: '#FFFFFF'}}
                            >
                                Сбросить
                            </Button>
                            <Button
                                className={styles.button}
                                variant="contained"
                                color="purple"
                                sx={{padding: '16px 32px', color: '#FFFFFF'}}
                                onClick={handleApplyFilter}
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
