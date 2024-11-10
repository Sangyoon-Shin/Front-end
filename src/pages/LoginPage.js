import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

import telecom_logo from '../images/정보통신공학과 횃불이.png';
import back_logo from '../images/뒷모습 횃불이.png';
import Q_logo from '../images/물음표.png';

const LoginPage = () => {
  // 사용자 입력 상태 설정
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupEmail, setPopupEmail] = useState(''); // 팝업창에서 사용되는 이메일 상태
  const [authPopup, setAuthPopup] = useState(false); // 인증 팝업 상태
  const [verificationCode, setVerificationCode] = useState(''); // 인증번호 상태
  const [tempToken, setTempToken] = useState(''); // 임시 토큰 (인증 코드 요청 시 사용)
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인
  const [passwordPopup, setPasswordPopup] = useState(false); // 비밀번호 변경 팝업 상태
  const [error, setError] = useState(''); // 에러 메시지 상태

  const [passwordMatch, setPasswordMatch] = useState(null); // 비밀번호 일치 여부 상태

  const BASE_URL = "https://04c3-117-16-196-170.ngrok-free.app"; // 실제 도메인으로 변경하세요

  // 로그인 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해 주세요.");
      return;
    }
  
    // 로그인 요청 준비 로그
    console.log('로그인 요청 시작:', `${BASE_URL}/login`);
    console.log('입력된 아이디:', username);
    console.log('입력된 비밀번호:', password);
  
    try {
      console.log('POST 요청 보내는 중...');
  
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // 인증 정보 포함 옵션
        }
      );
  
      // 서버 응답 확인
      console.log('서버 응답 수신');
      console.log('응답 상태:', response.status); // 200 확인
      console.log('응답 데이터:', response.data); // 데이터 확인
      console.log('응답 헤더:', response.headers); // 헤더 확인
  
      const jwtToken = response.headers['authorization']?.split(' ')[1];
  
      if (!jwtToken) {
        throw new Error("Authorization token missing in response");
      }
  
      console.log('JWT 토큰 확인 성공:', jwtToken);
  
      // JWT 토큰 저장 (예: localStorage)
      localStorage.setItem('authToken', jwtToken);
  
      console.log('JWT 토큰 저장 완료');
      
      setAuthPopup(true);
      setError('');
      setUsername('');
      setPassword('');
      console.log('로그인 성공 - 팝업 열림');
    } 
    catch (error) {
      console.error("로그인 오류:", error.message);
      
      if (error.response) {
        console.error("응답 상태:", error.response.status);
        console.error("응답 데이터:", error.response.data);
        
        if (error.response.status === 401) {
          setError("로그인 실패: 아이디나 비밀번호를 확인해 주세요.");
          alert("로그인 실패: 아이디나 비밀번호를 확인해 주세요.");
        } else {
          setError("서버 오류가 발생했습니다.");
          alert("로그인 실패: 서버 오류가 발생했습니다.");
        }
      } 
      else {
        console.error("네트워크 오류 또는 서버와의 연결 문제 발생");
        alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };
  

  // 인증번호 요청 함수
  const requestVerificationCode = async () => {
    if (!popupEmail) {
      alert("이메일을 입력해 주세요.");
      return;
    }

    // 이메일 형식 검증 (@inu.ac.kr)
    const emailRegex = /^[^\s@]+@inu\.ac\.kr$/;
    if (!emailRegex.test(popupEmail)) {
      alert("유효한 @inu.ac.kr 이메일 주소를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/send-email`, new URLSearchParams({
        email: popupEmail
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      alert(`인증 코드가 ${popupEmail}로 전송되었습니다.`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("이메일 형식이 잘못되었거나 요청에 오류가 있습니다.");
      } else {
        alert("인증 코드 전송 실패: 다시 시도해 주세요.");
      }
    }
  };

  // 인증번호 확인 함수
  const verifyCode = async () => {
    if (!verificationCode) {
      alert("인증 코드를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify-code`, new URLSearchParams({
        email: popupEmail,
        code: verificationCode
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const temporaryToken = response.headers['authorization'].split(' ')[1];
      // 임시 토큰 저장 (예: state)
      setTempToken(temporaryToken);

      alert("인증이 완료되었습니다.");
      setAuthPopup(false); // 인증 팝업 닫기
      setPasswordPopup(true); // 비밀번호 변경 팝업 열기
      setVerificationCode('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("인증 코드가 유효하지 않습니다.");
      } else {
        alert("인증 실패: 다시 시도해 주세요.");
      }
    }
  };

  // 비밀번호 확인 함수
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(newPassword, e.target.value);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    setPasswordMatch(password === confirmPassword);
  };

  // 비밀번호 변경 함수
  const changePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("모든 필드를 입력해 주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 규칙 검증
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert("비밀번호는 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/auth/change-password`, new URLSearchParams({
        newPassword
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${tempToken}`
        }
      });

      alert("비밀번호가 성공적으로 변경되었습니다.");
      setPasswordPopup(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("비밀번호 유효성 검사 실패 또는 인증 코드가 유효하지 않습니다.");
      } else if (error.response && error.response.status === 401) {
        alert("인증되지 않은 요청입니다.");
      } else {
        alert("비밀번호 변경 실패: 다시 시도해 주세요.");
      }
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
          <Link to="/FindIDPage">학번 찾기</Link> /
          <Link to="/FindPWPage">비밀번호 찾기</Link>
        </div>
      </div>

      {/* 이메일 인증 팝업 */}
      {authPopup && (
        <div className={styles.popup}>
          <div className={styles.popupRow}>
            <h4>이메일 인증</h4>
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="이메일 입력 (@inu.ac.kr)"
              value={popupEmail}
              onChange={(e) => setPopupEmail(e.target.value)}
              className={styles.inputField}
            />
            <button
              type="button"
              className={`${styles.inputBtn} ${styles.requestBtn}`}
              onClick={requestVerificationCode}
            >
              인증번호 요청
            </button>
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={styles.inputField}
            />
            <button
              type="button"
              className={styles.inputBtn}
              onClick={verifyCode}
            >
              확인
            </button>
          </div>
          <div className={styles.popupRow}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setAuthPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 팝업 */}
      {passwordPopup && (
        <div className={styles.popup}>
          <h4>비밀번호 변경</h4>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={handlePasswordChange}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={styles.inputField}
          />
          <button
            type="button"
            className={styles.changeBtn}
            onClick={changePassword}
          >
            비밀번호 변경
          </button>

          {(!newPassword || !confirmPassword) && (
            <p style={{ color: 'red' }}>비밀번호를 입력해 주세요.</p>
          )}
          {newPassword && confirmPassword && passwordMatch === false && (
            <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
          )}
          {newPassword && confirmPassword && passwordMatch && (
            <p style={{ color: 'green' }}>비밀번호가 일치합니다.</p>
          )}
          <div className={styles.popupRow}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setPasswordPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
