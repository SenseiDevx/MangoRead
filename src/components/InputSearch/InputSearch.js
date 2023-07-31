import React, { useState } from 'react';
import styles from './inputsearch.module.css';
import search from '../../assets/header/search.svg';

const InputSearch = () => {
    const [isInputFocused, setInputFocused] = useState(false);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    return (
        <>
            <div className={styles.inputBlock}>
                <div className={styles.inputWrapper}>
                    <input
                        className={`${styles.input} ${isInputFocused ? styles.inputFocused : ''}`}
                        type="text"
                        placeholder="Placeholder"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {isInputFocused ? null : <img className={styles.search} src={search} alt="search" />}
                </div>
            </div>
        </>
    );
};

export default InputSearch;
