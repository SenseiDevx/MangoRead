import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './inputsearch.module.css';
import search from '../../assets/header/search.svg';
import { Link } from 'react-router-dom';
import {clearSearch, fetchMangaData, setDropdownVisible, setSearchText} from "../../redux/slices/filterSlice";

const InputSearch = () => {
    const dispatch = useDispatch();
    const { searchText, filteredData, isDropdownVisible, status, error } = useSelector((state) => state.filterReducer);
    const [isInputFocused] = useState(false);

    const handleInputFocus = () => {
        dispatch(setDropdownVisible(true));
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            dispatch(setDropdownVisible(false));
        }, 200); // Задержка для предотвращения закрытия дропдауна при клике на результат
    };

    const handleInputChange = (event) => {
        const text = event.target.value;
        dispatch(setSearchText(text));
        if (text.trim() !== '') {
            dispatch(fetchMangaData(text));
        } else {
            dispatch(clearSearch());
        }
    };

    return (
        <>
            <div className={styles.inputBlock}>
                <div className={styles.inputWrapper}>
                    <input
                        className={`${styles.input} ${isInputFocused ? styles.inputFocused : ''}`}
                        type="text"
                        placeholder="Placeholder"
                        value={searchText}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {isInputFocused ? null : <img className={styles.search} src={search} alt="search" />}
                </div>
                {/* Отображение дропдауна с результатами фильтрации */}
                {isDropdownVisible && (
                    <div className={styles.dropdown}>
                        {status === 'loading' ? (
                            <p className={styles.p}>Загрузка...</p>
                        ) : status === 'failed' ? (
                            <p className={styles.p}>Ошибка при загрузке данных: {error}</p>
                        ) : filteredData.length > 0 ? (
                            <>
                                <p className={styles.p}>Найдено {filteredData.length} манг:</p>
                                <ul className={styles.ul}>
                                    {filteredData.map((item) => (
                                        <Link style={{ textDecoration: "none" }} to={`/about/${item.id}`} key={item.id} className={styles.link}>
                                            <li className={styles.li}>{item.en_name} - {item.ru_name}</li>
                                        </Link>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className={styles.p}>Ничего не найдено</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default InputSearch;
