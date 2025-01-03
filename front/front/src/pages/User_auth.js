import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import styles from "./User_auth.module.css"; // CSS 파일을 따로 작성

import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기

import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';



const User_auth = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");


  const [dropdownVisible, setDropdownVisible] = useState(false);  // 드롭다운 상태 관리
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); //logout
  const navigate = useNavigate(); // useNavigate 훅 선언
// 반응형 페이지 처리를 위한 useMediaQuery 사용
const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
 

//로그아웃
  const handleLogoutClick = (e) => { 
    e.preventDefault(); 
    setIsLogoutModalOpen(true); 
  }; 
  
  const handleLogoutConfirm = () => { 
    setIsLogoutModalOpen(false); navigate('/Start'); 
  }; 
  
  const handleLogoutCancel = () => { 
    setIsLogoutModalOpen(false);
  };


    // 드롭다운 메뉴 토글 함수
    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
      };
  


  const handleSubmit = () => {
    // 권한 요청 처리 로직
    console.log("권한 요청:", { studentNumber, id, password, position });
  };

    return (
      <div className={styles.app}>
        {/* 상단바 */}
        <header className={`${styles["app-header"]} ${isDesktop ? styles.desktopHeader : ''}`}>
          <div className={`${styles["title-group"]} ${isDesktop ? styles.desktopTitleGroup : ''}`}>
            <img
              src={main_mascot}
              className={`${styles["app-main_mascot"]} ${isDesktop ? styles.desktopMascot : ''}`}
              alt="main_mascot"
            />
            <h2 className={isDesktop ? styles.desktopTitleText : ''}>INFO!</h2>
            <div className={`${styles["right-section"]} ${isDesktop ? styles.desktopRightSection : ''}`}>
              <div className={styles["mascot-logo"]}></div>
              <h2 className={`${styles["title-text"]} ${isDesktop ? styles.desktopTitleText : ''}`}>공지사항</h2>
              <img
                src={main_bell}
                className={`${styles["app-main_bell"]} ${isDesktop ? styles.desktopBell : ''}`}
                alt="main_bell"
              />
              <img
                src={main_message}
                className={`${styles["app-main_message"]} ${isDesktop ? styles.desktopMessage : ''}`}
                alt="main_message"
              />
              <img
                src={main_my}
                className={`${styles["app-main_my"]} ${isDesktop ? styles.desktopMy : ''}`}
                alt="main_my"
                onClick={toggleDropdown}
              />
              {/* 드롭다운 메뉴 */}
              {dropdownVisible && (
                <div className={`${styles["dropdown-menu"]} ${isDesktop ? styles.desktopDropdownMenu : ''}`}>
                  <a href="/scrap" className={styles["menu-item"]}>스크랩</a>
                  <a href="/write-post" className={styles["menu-item"]}>작성 게시글</a>
                  <a href="/write-comment" className={styles["menu-item"]}>작성 댓글</a>
                  <a href="/User_auth" className={styles["menu-item"]}>사용자 권한 인증</a>
                  <a href="#" onClick={handleLogoutClick} className={`${styles["menu-item"]} ${styles["logout"]}`}>
                    로그아웃
                  </a>
                </div>
              )}
              {/* 로그아웃 모달 */}
              {isLogoutModalOpen && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modalContent}>
                    <h3>정말 로그아웃하시겠습니까?</h3>
                    <div className={styles.modalButtons}>
                      <button onClick={handleLogoutConfirm} className={styles.confirmButton}>네</button>
                      <button onClick={handleLogoutCancel} className={styles.cancelButton}>아니오</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
  
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
              <img
                src={CommunicationRoom_goBack}
                className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : ''}`}
                alt="뒤로가기"
                onClick={() => navigate(-1)} /* 뒤로 가기 동작 추가 */
              />
              <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>사용자 권한 접근</h1>
            </div>
          </div>
  
          <div className={`${styles.accessRequestContainer} ${isDesktop ? styles.desktopAccessRequestContainer : ''}`}>
            <form className={styles.accessRequestForm}>
              <div className={styles.formGroup}>
                <label2>학번</label2>
                <div className={styles.inlineInput}>
                  <input
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label2>아이디</label2>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label2>비밀번호</label2>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label2>직책</label2>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="ex) 학회장, 학생회장, 과사, 근로자..."
                />
              </div>
  
              <button
                type="button"
                className={`${styles.submitButton} ${isDesktop ? styles.desktopSubmitButton : ''}`}
                onClick={handleSubmit}
              >
                권한 요청하기
              </button>
            </form>
          </div>
        </div>
      </div>
    );

  };

export default User_auth;
