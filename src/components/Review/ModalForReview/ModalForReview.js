import React from 'react';
import styles from './modalforreview.module.css'
import nickName from '../../../assets/other/nickname.svg'

const ModalForReview = () => {
    return <>
        <div className={styles.modalWindow} onClick={onclose}>
            <div className={styles.modalRating}>
                <div className={styles.reviewBlock}>
                    <div className={styles.reviewTopBlock}>
                        <img src={nickName} alt=""/>
                        <h3 className={styles.h3}>Имя,Никнейм</h3>
                    </div>
                    <div className={styles.reviewBottomBlock}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Добавьте комментарий"
                            required
                        />
                        <button
                            className={styles.button}
                            type="submit">Добавить</button>
                    </div>
                </div>
            </div>
        </div>

    </>
};

export default ModalForReview;