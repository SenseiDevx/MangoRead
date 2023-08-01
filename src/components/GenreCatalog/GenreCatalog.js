import React, {useEffect} from 'react';
import styles from './genrecatalog.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getGenres} from "../../redux/slices/genreSlice";
import {Button, Checkbox} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const GenreCatalog = () => {
    const dispatch = useDispatch()
    const {genres} = useSelector((state) => state.genreReducer)

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    return <>
        <div className={styles.allBlock}>
            <Button>
                <ArrowBackIosIcon/>
                Назад
            </Button>
            <h3 className={styles.h3}>Жанры</h3>
            <div className={styles.genreBlock}>
                {genres && genres?.map((genre) => (
                    <div className={styles.genre} key={genre?.id}>
                        <Checkbox color="green" />
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
                >
                    Применить
                </Button>
            </div>
        </div>
    </>

};

export default GenreCatalog;