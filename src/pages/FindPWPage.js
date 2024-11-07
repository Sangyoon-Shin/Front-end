import React, { useState } from 'react';
import styles from './FindPWPage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import back_logo from '../images/뒷모습 횃불이.png';



const FindPWPage = () => {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [serverVerificationCode, setServerVerificationCode] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const navigate = useNavigate();

    // 임의의 데이터 지정
    const expectedStudentId = "202";
    const expectedEmail = "asz1218@inu.ac.kr";
    const expectedVerificationCode = "1234";

    // 이름 보내기 함수
    const sendNameToServer = async () => {
        try {
            await axios.post('/api/send-name', { name });
            setPopupMessage("이름이 성공적으로 전송되었습니다.");
        } catch (error) {
            setPopupMessage("이름 전송에 실패했습니다.");
        }
    };

    // 아이디 확인 함수
    const checkStudentId = async () => {
        try {
            const response = await axios.post('/api/check-id', { studentId });
            if (response.data.exists) {
                setPopupMessage("아이디가 확인되었습니다.");
            } else {
                setPopupMessage("아이디가 존재하지 않습니다.");
            }
        } catch (error) {
            setPopupMessage("아이디 확인에 실패했습니다.");
        }
    };

    // 이메일로 인증번호 요청 함수
    const requestVerificationCode = async () => {
        try {
            const response = await axios.post('/api/request-verification-code', { email });
            setServerVerificationCode(response.data.verificationCode);
            setPopupMessage("인증번호가 이메일로 발송되었습니다.");
        } catch (error) {
            setPopupMessage("인증번호 발송에 실패했습니다.");
        }
    };

    // 인증번호 확인 함수
    const verifyCode = () => {
        if (verificationCode === serverVerificationCode) {
            setPopupMessage("인증번호가 확인되었습니다.");
        } else {
            setPopupMessage("인증번호가 일치하지 않습니다.");
        }
    };

    // 닫기 버튼 클릭 시
    const handleClose = () => {
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
                <div className={styles.formContainer}>

                    {/* 아이디 입력 및 확인 */}
                    <div className={styles.formGroup}>
                        <label htmlFor="studentId"><br />아이디</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                id="studentId"
                                placeholder="아이디 입력"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                            <button className={styles.inputBtn_} onClick={checkStudentId}>아이디 확인</button>
                        </div>
                    </div>

                    {/* 이메일 입력 및 인증번호 요청 */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email">인천대 이메일</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                id="email"
                                placeholder="인천대 이메일 입력"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className={styles.inputBtn} onClick={requestVerificationCode}>인증번호 받기</button>
                        </div>
                    </div>

                    {/* 인증번호 입력 및 확인 */}
                    <div className={styles.formGroup}>
                        <label htmlFor="verificationCode">인증번호 확인</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                id="verificationCode"
                                placeholder="인증번호 입력"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button className={styles.inputBtn} onClick={verifyCode}>인증번호 확인</button>
                        </div>
                    </div>
                </div>

                {/* 닫기 버튼 */}
                <button type="button" className={styles.loginButton} onClick={handleClose}>
                    닫기
                </button>

                {/* 팝업 메시지 */}
                {popupMessage && (
                    <div style={{ marginTop: '20px', color: 'blue' }}>
                        <p>{popupMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindPWPage;
