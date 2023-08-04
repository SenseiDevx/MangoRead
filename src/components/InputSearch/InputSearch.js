import React, { useEffect, useState } from 'react';
import styles from './inputsearch.module.css';
import search from '../../assets/header/search.svg';
import {Link} from "react-router-dom";

const InputSearch = () => {
    const [isInputFocused, setInputFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
        setSearchText('');
    };


    useEffect(() => {
        // Функция для отправки запроса на API и получения данных
        const fetchData = async () => {
            try {
                const response = await fetch(`http://68.183.214.2:8666/api/v1/manga/?search=${searchText}`);
                if (response.ok) {
                    const data = await response.json();
                    setFilteredData(data);
                    setDropdownVisible(true); // Показываем дропдаун с результатами при получении данных
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Выполняем запрос только если текст не пустой
        if (searchText.trim() !== '') {
            fetchData();
        } else {
            setFilteredData([]);
            setDropdownVisible(false);
        }
    }, [searchText]);

    useEffect(() => {
        // Добавляем обработчики событий для закрытия дропдауна при клике вне него
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.inputBlock}`)) {
                closeDropdown(); // Закрываем дропдаун и очищаем инпут
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                        {filteredData.length > 0 ? (
                            <>
                                <p className={styles.p}>Найдено {filteredData.length} манг:</p>
                                <ul className={styles.ul}>
                                    {filteredData.map((item) => (
                                        // Заменяем <li> на компонент Link и указываем путь к странице "about"
                                        <Link style={{textDecoration: "none"}} to={`/about/${item.id}`} key={item.id} className={styles.link}>
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
