import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

import styles from './_.module.css'; 
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 알림 아이콘
import main_message from '../images/message.png';  // 쪽지 아이콘
import main_my from '../images/my.png';  // 마이 아이콘

const _ = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);  // 드롭다운 상태 관리
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // 로그아웃 모달 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 선언

  // 로그아웃 처리 함수
  const handleLogoutClick = (e) => { 
    e.preventDefault(); 
    setIsLogoutModalOpen(true); 
  }; 
  
  const handleLogoutConfirm = () => { 
    setIsLogoutModalOpen(false); 
    navigate('/Start'); // 로그아웃 후 'Start' 페이지로 이동
  }; 
  
  const handleLogoutCancel = () => { 
    setIsLogoutModalOpen(false); // 로그아웃 취소
  };

  // 드롭다운 메뉴 토글 함수
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
        <div className={styles["title-group"]}>
          <img
            src={main_mascot}
            className={styles["app-main_mascot"]}
            alt="main_mascot"
            onClick={() => navigate("/HomePage")} // 마스코트 클릭 시 홈 페이지로 이동
          />
          <h2
            onClick={() => navigate("/HomePage")} // INFO! 클릭 시 홈 페이지로 이동
            style={{ cursor: "pointer" }}
          >
            INFO!
          </h2>

          <div className={styles["right-section"]}>
            <div className={styles["mascot-logo"]}></div>
            <h2
              className={styles["title-text"]}
              onClick={() => navigate("/notice")} // 공지사항 클릭 시 공지사항 페이지로 이동
              style={{ cursor: "pointer" }}
            >
              공지사항
            </h2>

            <img
              src={main_bell}
              className={styles["app-main_bell"]}
              alt="main_bell"
              onClick={() => navigate("/notification")} // 알림 아이콘 클릭 시 알림 페이지로 이동
            />
            <img
              src={main_message}
              className={styles["app-main_message"]}
              alt="main_message"
              onClick={() => navigate("/message")} // 쪽지 아이콘 클릭 시 쪽지 페이지로 이동
            />
            <img
              src={main_my}
              className={styles["app-main_my"]}
              alt="main_my"
              onClick={toggleDropdown} // 마이 아이콘 클릭 시 드롭다운 토글
            />

            {/* 드롭다운 메뉴 */}
            {dropdownVisible && (
              <div className={styles["dropdown-menu"]}>
                <a href="/scrap" className={styles["menu-item"]}>스크랩</a>
                <a href="/write-post" className={styles["menu-item"]}>작성 게시글</a>
                <a href="/write-comment" className={styles["menu-item"]}>작성 댓글</a>
                <a href="/User_auth" className={styles["menu-item"]}>사용자 권한 인증</a>
                <a
                  href="#"
                  onClick={handleLogoutClick} // 로그아웃 클릭 시 로그아웃 모달 열기
                  className={`${styles["menu-item"]} ${styles["logout"]}`}
                >
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
                    <button onClick={handleLogoutConfirm} className={styles.confirmButton}>
                      네
                    </button>
                    <button onClick={handleLogoutCancel} className={styles.cancelButton}>
                      아니오
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default _;
