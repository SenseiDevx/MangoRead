import React, {useEffect, useState} from 'react';
import styles from './aboutpage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getMangaById, getMangas} from '../../redux/slices/mangaSlice';
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";

const AboutPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {manga, loading} = useSelector((state) => state.mangoReducer);
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false); // Add state variable for expansion

    useEffect(() => {
        dispatch(getMangaById(id));
    }, [id, dispatch]);

    const back = () => {
        navigate('/');
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };

    const sinopsis = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. " +
    "Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, " +
    "ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor " +
    "ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante " +
    "fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam " +
    "condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id. " +
    "Praesent lorem orci, mattis non efficitur id, ultricies vel nibh. Sed volutpat lacus vitae gravida" +
    " viverra. Fusce vel tempor elit. Proin tempus, magna id scelerisque vestibulum, nulla ex pharetra sapien," +
    " tempor posuere massa neque nec felis. Aliquam sem ipsum, vehicula ac tortor vel, egestas ullamcorper dui." +
    " Curabitur at risus sodales, tristique est id, euismod justo. Mauris nec leo non libero sodales lobortis." +
    " Quisque a neque pretium, dictum tellus vitae, euismod neque. Nulla facilisi."]

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
                                    <h3 className={styles.name}>{manga?.en_name}</h3>
                                    <div className={styles.dataBlock}>
                                        <h3 className={styles.h3}>Информация: </h3>
                                        {isExpanded ? (
                                            <p className={styles.p}>{manga?.description}</p>
                                        ) : (
                                            <p className={styles.p}>{truncateText(manga?.description, 35)}</p>
                                        )}
                                        <Button onClick={toggleExpanded}>
                                            {isExpanded ? 'Свернуть' : 'Развернуть'}
                                        </Button>
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
                                <p>{sinopsis}</p>
                            </div>
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
