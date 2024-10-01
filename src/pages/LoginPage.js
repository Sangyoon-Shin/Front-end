import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 가져오기
import styles from './LoginPage.module.css';

import telecom_logo from '../images/정보통신공학과 횃불이.png';  // 로고 이미지 불러오기
import back_logo from '../images/뒷모습 횃불이.png';  // 로고 이미지 불러오기
import Q_logo from '../images/물음표.png';  // 로고 이미지 불러오기


const LoginPage = () => {
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
            <p className={styles["footer-text"]}>
              재학생은 인천대학교<br /> 포털 아이디, 비밀번호로 <br />
              로그인하세요!
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
            <label htmlFor="email">아이디</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <Link to="/JoinPage">졸업생/관계자용 회원가입</Link> {/* Link를 사용하여 페이지 전환 */}
        </div>
        <div className={styles.footerLinks}>
          <Link to="/FindIDPage">아이디 찾기</Link> {/* Link를 사용하여 페이지 전환 */}
          <Link to="/FindPWPage">비밀번호 찾기</Link> {/* Link를 사용하여 페이지 전환 */}
        </div>
      </div>
    </div>
  );
};

/*
return (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src="/path-to-your-logo.png" alt="INFO" className={styles.logo} />
        <span>인천대학교 포털 아이디, 비밀번호로 로그인하세요!</span>
      </div>
    </header>

    <div className={styles.loginBox}>
      <h2>로그인</h2>
      <div className={styles.welcomeBox}>
        <h3>Welcome to</h3>
        <img src="/path-to-your-logo.png" alt="INFO Mascot" className={styles.mascotLogo} />
        <h3>INFO!</h3>
        <p>INFORMATION TECHNOLOGY</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">아이디</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <a href="#">회원가입</a>
        <a href="#">아이디 찾기</a>
        <a href="#">비밀번호 찾기</a>
      </div>
    </div>
  </div>
);
};
*/

export default LoginPage;
