import React, { useState } from 'react';
import styles from './FindIDPage.module.css';

import back_logo from '../images/뒷모습 횃불이.png';  // 로고 이미지 불러오기

const FindIDPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 로그인 로직 추가 가능
        console.log('로그인 시도:', { email, password });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logoSection}>
                    <div className={styles["group-info"]}>
                        <img src={back_logo} className={styles["app-back_logo"]} alt="back_logo" />
                        <h2>INFO!</h2>
                    </div>
                </div>
            </header>
            <h1>아이디 찾기</h1>

            <div className={styles.loginBox}>
                {/* 아이디 찾기 폼 */}
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name"><br />이름</label>
                        <input type="text" id="name" placeholder="이름" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email"><br />이메일</label>
                        <div className={styles.inputWrapper}>
                            <input type="email" id="email" placeholder="이메일" />
                            <button className={styles.inputBtn}>인증번호 받기</button>
                        </div>
                    </div>
                </div>
                <button type="submit" className={styles.loginButton}>닫기</button>
            </div>
        </div>
    );
};

export default FindIDPage;
