import React from 'react';
import styles from './footer.module.css'
import {ReactComponent as MangoLogo} from "../../assets/header/mangoLogo.svg";
import {ReactComponent as FaceBook} from "../../assets/footer/Facebook.svg";
import {ReactComponent as Insatgram} from "../../assets/footer/Instagram.svg";
import {ReactComponent as Twitter} from "../../assets/footer/Twitter.svg";

const Footer = () => {
    return <>
        <div className={styles.allBlock}>
            <div className={styles.footerBlock}>
                <div className={styles.logoBlock}>
                    <MangoLogo/>
                    <div className={styles.logoText}>
                        <h2 className={styles.h2}>MangoRead</h2>
                        <p className={styles.p}>Читай мангу с нами</p>
                    </div>
                </div>
                <div className={styles.mangoLinks}>
                    <div className={styles.link}>
                        <FaceBook/>
                        <p className={styles.p}>Link One</p>
                    </div>
                    <div className={styles.link}>
                        <Insatgram/>
                        <p className={styles.p}>Link Two</p>
                    </div>
                    <div className={styles.link}>
                        <Twitter/>
                        <p className={styles.p}>Link Three</p>
                    </div>
                </div>
                <div className={styles.location}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2338.866062328371!2d-122.42056600346211!3d37.77802590943497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808eb456e2dd%3A0xcb1742ab59d38bda!2z0KHQuNCy0LjQuiDQodC10L3RgtC10YAsINCh0LDQvS3QpNGA0LDQvdGG0LjRgdC60L4sINCa0LDQu9C40YTQvtGA0L3QuNGPIDk0MTAyLCDQodCo0JA!5e0!3m2!1sru!2skg!4v1690821281665!5m2!1sru!2skg"
                        width="400"
                        height="250"
                        style={{borderRadius:20, border: 'none', boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.15)f"}}
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <div className={styles.footerBottomBlock}>
                <ul className={styles.ul}>
                    <p className={styles.p}>©2022, All right reserved.</p>
                    <a className={styles.a}>Privacy Policy</a>
                    <a className={styles.a}>Terms of Service</a>
                    <a className={styles.a}>Cookies Settings</a>
                </ul>
            </div>
        </div>
    </>
};

export default Footer;