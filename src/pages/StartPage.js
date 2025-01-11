import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 사용하여 페이지 이동
import styles from "./StartPage.module.css";
import ese_logo from '../images/임베디드시스템공학과 횃불이.png';
import computer_logo_ from '../images/컴퓨터공학부 횃불이_반전.png';
import computer_logo from '../images/컴퓨터공학부 횃불이.png';

const StartPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // 2초 후 /loginpage로 리디렉션
    const timer = setTimeout(() => {
      navigate('/loginpage');
    }, 2000); // 2000ms = 2초

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles["app-header"]}>
          <div className={styles["empty-space"]}></div>
          <div className={styles["title-group"]}>
            <img src={computer_logo_} className={styles["app-computer_logo_"]} alt="computer_logo_" />
            <h2 className={styles["title-text"]}>인천대학교<br /> 정보기술대학</h2>
            <img src={computer_logo} className={styles["app-computer_logo"]} alt="computer_logo" />
          </div>

          <div className={styles["empty-space"]}></div>

          <h2>INFO!</h2>
          <img src={ese_logo} className={styles["app-ese_logo"]} alt="ese_logo" />
          <h2>rmation</h2>
          <p className={styles["subtext"]}>Social network service</p>
          <p className={styles["footer-text"]}>
            For INCHENON NATIONAL UNIVERSITY <br />
            INFORMATION TECHNOLOGY
          </p>
        </header>
      </div>
    </div>
  );
};

export default StartPage;
