import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatPreview.module.css';  // 필요한 스타일 가져오기
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함


function ChatPreview() {
  const [participants, setParticipants] = useState(50); // 현재 인원 수 (예시로 50명 설정)
  const navigate = useNavigate();

  const handleJoinClick = () => { 
    handleShow();
  };

  // 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  const [show, setShow] = useState(false); 
  const [selectedProfile, setSelectedProfile] = useState(''); 
  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true); 
  const handleSave = () => { 
    if (selectedProfile) { 
      window.location.href = `http://example.com/${selectedProfile}`; 
    }
  };


return (
  <div className={styles.app}>
    {/* 상단바 */}
    <header className={`${styles["app-header"]} ${isDesktop ? styles.desktopHeader : styles.mobileHeader}`}>
      <div className={styles["title-group"]}>
        <img src={main_mascot} className={styles["app-main_mascot"]} alt="main_mascot" />
        <h2>INFO!</h2>
        <div className={styles["right-section"]}>
          <h2 className={styles["title-text"]}>공지사항</h2>
          <img src={main_bell} className={styles["app-main_bell"]} alt="main_bell" />
          <img src={main_message} className={styles["app-main_message"]} alt="main_message" />
          <img src={main_my} className={styles["app-main_my"]} alt="main_my" />
        </div>
      </div>
    </header>

    {/* 메인 컨텐츠 */}
    <div className={`${styles.container} ${isDesktop ? styles.desktopContainer : styles.mobileContainer}`}>
      <div className={styles.content}>
        <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : styles.mobileTitleContainer}`}>
          <img
            src={CommunicationRoom_goBack}
            className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : styles.mobileGoBackButton}`}
            alt="뒤로가기"
            onClick={() => navigate(-1)} /* 뒤로 가기 동작 추가 */
          />
          <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : styles.mobilePageTitle}`}>
            소통 채팅방
          </h1>
        </div>
      </div>
    </div>

    {/* 채팅방 카드 */}
    <div className="container">
      <div className={`${styles.roomCard} ${isDesktop ? styles.desktopRoomCard : styles.mobileRoomCard}`}>
        <div className={styles.roomHeader}>
          <h3 className={`${styles.roomTitle} ${isDesktop ? styles.desktopRoomTitle : styles.mobileRoomTitle}`}>
            C언어 학습방
          </h3>
          <span className={styles.date}>24.01.01</span>
          <span className={styles.participants}>{participants}/100</span>
        </div>

        <p className={`${styles.roomDescription} ${isDesktop ? styles.desktopRoomDescription : styles.mobileRoomDescription}`}>
          C언어 같이 공부할 사람~~~ <br />
          다양한 문제도 있어요~~~~~~~~~
        </p>

        <button
          className={`${styles.Joinbutton} ${isDesktop ? styles.desktopJoinbutton : styles.mobileJoinbutton}`}
          onClick={handleJoinClick}
        >
          참여하기
        </button>
      </div>
    </div>
  </div>
);

}

export default ChatPreview;
