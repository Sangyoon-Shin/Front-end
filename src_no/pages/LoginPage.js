import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

import telecom_logo from '../images/정보통신공학과 횃불이.png';
import back_logo from '../images/뒷모습 횃불이.png';
import Q_logo from '../images/물음표.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const BASE_URL = "https://8d48-117-16-196-138.ngrok-free.app"; // 실제 URL로 변경

  // 페이지 이동을 위한 navigate 선언
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        }
      );

      const jwtToken = response.headers['authorization']?.split(' ')[1];
      if (!jwtToken) {
        throw new Error("Authorization token missing in response");
      }

      localStorage.setItem('authToken', jwtToken);
      setError('');
      setUsername('');
      setPassword('');

      // 로그인 성공 시 메인 페이지로 이동
      navigate('/'); // 이동할 페이지 경로 설정
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 엑세스 토큰 만료 시 리프레시 토큰을 사용하여 새로운 엑세스 토큰 요청
        const refreshedToken = await handleTokenRefresh();
        if (refreshedToken) {
          // 리프레시 토큰으로 새로운 엑세스 토큰을 받았으면, 로그인 요청 재시도
          handleSubmit(event);
        } else {
          setError("로그인 실패: 아이디나 비밀번호를 확인해 주세요.");
          alert("로그인 실패: 아이디나 비밀번호를 확인해 주세요.");
        }
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const handleTokenRefresh = async () => {
    try {
      // 저장된 리프레시 토큰을 가져옵니다.
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error("리프레시 토큰이 없습니다.");
      }

      // 리프레시 토큰으로 새로운 엑세스 토큰을 요청합니다.
      const response = await axios.post(
        `${BASE_URL}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const newAccessToken = response.data.accessToken;
      if (newAccessToken) {
        // 새로운 엑세스 토큰을 로컬 스토리지에 저장합니다.
        localStorage.setItem('authToken', newAccessToken);
        return newAccessToken; // 새로운 엑세스 토큰 반환
      } else {
        throw new Error("리프레시 토큰 갱신 실패");
      }
    } catch (error) {
      console.error("리프레시 토큰 갱신 오류:", error);
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div className={styles["group-info"]}>
            <img src={back_logo} className={styles["app-back_logo"]} alt="back_logo" />
            <h2>INFO!</h2>
            <p className={styles["footer-text"]}>
              인천대학교 메일로<br /> 회원가입해주세요!
            </p>
            <img src={Q_logo} className={styles["app-Q_logo"]} alt="Q_logo" />
          </div>
        </div>
      </header>
      <h1>로그인</h1>

      <div className={styles.loginBox}>
        <div className={styles.welcomeBox}>
          <div className={styles["group-login"]}>
            <h3>Welcome<br /><br /> to</h3>
            <img src={telecom_logo} className={styles["app-telecom_logo"]} alt="telecom_logo" />
            <h3><br />INFO!</h3>
          </div>
          <p>INFORMATION TECHNOLOGY</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">학번</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>확인</button>
        </form>

        <div className={styles.footerLinks}>
          <Link to="/JoinPage">회원가입</Link>/ 
          <Link to="/FindPWPage">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
