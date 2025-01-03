import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Otherprofile.module.css';  // 필요한 스타일 가져오기
import profileIcon from '../images/프로필.png'; // 프로필 아이콘
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import UserContext from './UserContext' //유저 프로필

import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함

const Otherprofile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  // 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  const handleEditProfile = () => {
    navigate('/Chatchat'); // 쪽지 채팅방 페이지로 이동
  };

  // 신고하기 버튼 클릭 시 바로 신고 모달 열기
  const handleReportClick = () => {
    setReportReason('');  // 신고 모달을 열기 전에 신고 사유를 빈 문자열로 초기화
    setIsModalOpen(true);
  };

  // 신고 팝업에서 신고하기 버튼 클릭
  const handleSubmitReport = () => {
    alert(`신고 사유: ${reportReason}`);
    setReportReason('');  // 신고 사유 초기화
    setIsModalOpen(false);
  };

  // 신고 팝업에서 취소 버튼 클릭
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReportReason('');  // 신고 사유 초기화
  };

  return (
    <div className={styles.app}>
      {/* 상단바 */}
      <header className={`${styles["app-header"]} ${isDesktop ? styles.desktopHeader : styles.mobileHeader}`}>
        <div className={styles["title-group"]}>
          <img src={main_mascot} className={styles["app-main_mascot"]} alt="main_mascot" />
          <h2>INFO!</h2>
          <div className={`${styles["right-section"]} ${isDesktop ? styles.desktopRightSection : ''}`}>
            <div className={styles["mascot-logo"]}></div>
            <h2 className={styles["title-text"]}>공지사항</h2>
            <img src={main_bell} className={styles["app-main_bell"]} alt="main_bell" />
            <img src={main_message} className={styles["app-main_message"]} alt="main_message" />
            <img src={main_my} className={styles["app-main_my"]} alt="main_my" />
          </div>
        </div>
      </header>
  
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : styles.mobileTitleContainer}`}>
            <img
              src={CommunicationRoom_goBack}
              className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : styles.mobileGoBackButton}`}
              alt="뒤로가기"
              onClick={() => navigate(-1)} /* 뒤로 가기 동작 추가 */
            />
            <h1 className={styles.pageTitle}>방 제목</h1>
          </div>
        </div>
  
        <div className={styles.content}>
          <div className={`${styles.profilePictureContainer} ${isDesktop ? styles.desktopProfilePictureContainer : ''}`}>
            <img
              src={profileIcon}
              alt="Profile"
              className={`${styles.profilePicture} ${isDesktop ? styles.desktopProfilePicture : styles.mobileProfilePicture}`}
            />
          </div>
          <div className={`${styles.profileInfo} ${isDesktop ? styles.desktopProfileInfo : styles.mobileProfileInfo}`}>
            <div className={styles.nickname}>닉네임</div>
            <button className={styles.sentButton} onClick={handleEditProfile}>
              쪽지 보내기
            </button>
            <button className={styles.reportButton} onClick={handleReportClick}>
              신고하기
            </button>
          </div>
        </div>
  
        {/* 신고 모달 */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${isDesktop ? styles.desktopModalContent : ''}`}>
              <h3>신고하기</h3>
              <textarea
                className={`${styles.reportTextarea} ${isDesktop ? styles.desktopReportTextarea : ''}`}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="신고 사유를 입력하세요"
              />
              <div className={styles.modalButtons}>
                <button onClick={handleCloseModal} className={`${styles.cancelButton} ${isDesktop ? styles.desktopCancelButton : ''}`}>
                  신고하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Otherprofile;
