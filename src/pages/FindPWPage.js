import React, { useState } from 'react';
import styles from './FindPWPage.module.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기

import back_logo from '../images/뒷모습 횃불이.png';  // 로고 이미지 불러오기

const FindPWPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useNavigate 훅을 호출하여 navigate 함수를 가져옴
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기에 로그인 로직 추가 가능
        console.log('로그인 시도:', { email, password });
    };

    // 닫기 버튼 클릭 시 호출되는 함수
    const handleClose = () => {
        // 페이지를 /LoginPage로 이동시킴
        navigate('/LoginPage');
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
            <h1>비밀번호 찾기</h1>

            <div className={styles.loginBox}>
                {/* 아이디 찾기 폼 */}
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name"><br />이름</label>
                        <input type="text" id="name" placeholder="이름" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email"><br />아이디</label>
                        <div className={styles.inputWrapper}>
                            <input type="email" id="email" placeholder="아이디" />
                            <button className={styles.inputBtn_}>아이디 확인</button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">이메일</label>
                        <div className={styles.inputWrapper}>
                            <input type="email" id="email" placeholder="이메일" />
                            <button className={styles.inputBtn}>인증번호 받기</button>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">인증번호 확인</label>
                        <div className={styles.inputWrapper}>
                            <input type="email" id="email" placeholder="인증번호" />
                            <button className={styles.inputBtn}>인증번호 확인</button>
                        </div>
                    </div>
                </div>
                <button type="submit" className={styles.loginButton} onClick={handleClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default FindPWPage;
