import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Header from './_.js';  // 상단바 컴포넌트

import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함

import styles from './Class_Room.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import menuIcon from '../images/메뉴버튼.png';
import Icon1 from '../images/하트이모지.png';  // 방 1의 아이콘
import Icon2 from '../images/눈이모지.png';   // 방 2의 아이콘
import Icon3 from '../images/폭죽이모지.png'; // 방 3의 아이콘

import Icon7 from '../images/임베디드시스템공학과 횃불이.png';

import Icon4 from '../images/내가속한방 횃불이.png';  // 하단바 아이콘들
import Icon5 from '../images/수업소통방 횃불이.png';
import Icon6 from '../images/자유소통방 횃불이.png';

const roomsData = [
  { id: 1, title: '데이터 베이스', lastMessage: '마지막 내용', icon: Icon7, selected: false },
  { id: 2, title: 'C언어 프로그래밍(2)', lastMessage: '마지막 내용', icon: Icon7, selected: false },
  { id: 3, title: '영상 처리', lastMessage: '마지막 내용', icon: Icon7, selected: false },
];

const Class_Room = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴 열림/닫힘 상태
  const [isSelectingForReport, setIsSelectingForReport] = useState(false); // 방 신고 모드 여부
  const [isSelectingForEdit, setIsSelectingForEdit] = useState(false); // 방 편집 모드 여부
  const [selectedRooms, setSelectedRooms] = useState([]); // 신고 및 편집을 위해 선택된 방 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 신고 모달 열림/닫힘 상태
  const [reportReason, setReportReason] = useState(''); // 신고 사유 상태
  const navigate = useNavigate();
// 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  // 방 ID에 맞는 페이지로 이동하기
  const handleRoomClick = (path) => {
    navigate(`/${path}`);  // 방 ID에 맞는 페이지로 이동
  };

  
  /*const handleRoomClick = (id) => {
    navigate(`${id}`);  // 방 ID에 맞는 페이지로 이동
  }; */


  return (
    <div className={`${styles.app} ${isDesktop ? styles.desktopApp : ''}`}>
      {/* 상단바 */}
      <header className={`${styles["app-header"]} ${isDesktop ? styles.desktopHeader : ''}`}>
        <div className={`${styles["title-group"]} ${isDesktop ? styles.desktopTitleGroup : ''}`}>
          <img
            src={main_mascot}
            className={`${styles["app-main_mascot"]} ${isDesktop ? styles.desktopMascot : ''}`}
            alt="main_mascot"
          />
          <h2>INFO!</h2>
          <div className={`${styles["right-section"]} ${isDesktop ? styles.desktopRightSection : ''}`}>
            <div className={`${styles["mascot-logo"]} ${isDesktop ? styles.desktopLogo : ''}`}></div>
            <h2 className={`${styles["title-text"]} ${isDesktop ? styles.desktopTitleText : ''}`}>공지사항</h2>
            <img src={main_bell} className={`${styles["app-main_bell"]} ${isDesktop ? styles.desktopBell : ''}`} alt="main_bell" />
            <img src={main_message} className={`${styles["app-main_message"]} ${isDesktop ? styles.desktopMessage : ''}`} alt="main_message" />
            <img src={main_my} className={`${styles["app-main_my"]} ${isDesktop ? styles.desktopMy : ''}`} alt="main_my" />
          </div>
        </div>
      </header>
  
      {/* 컨테이너 */}
      <div className={`${styles.container} ${isDesktop ? styles.desktopContainer : ''}`}>
        <div className={`${styles.content} ${isDesktop ? styles.desktopContent : ''}`}>
          <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
            <img
              src={CommunicationRoom_goBack}
              className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : ''}`}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
            />
            <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>수업 소통방</h1>
          </div>
  
          {/* 방 목록 */}
          <div className={`${styles.roomsList} ${isDesktop ? styles.desktopRoomsList : ''}`}>
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`${styles.roomItem} ${room.selected ? styles.selected : ''} ${
                  isDesktop ? styles.desktopRoomItem : ''
                }`}
              >
                <img
                  src={room.icon}
                  alt={`방 아이콘 ${room.id}`}
                  className={`${styles.roomIcon} ${isDesktop ? styles.desktopRoomIcon : ''}`}
                />
                <div className={`${styles.roomInfo} ${isDesktop ? styles.desktopRoomInfo : ''}`}>
                  <div className={`${styles.roomTitle} ${isDesktop ? styles.desktopRoomTitle : ''}`}>{room.title}</div>
                  <div className={`${styles.roomMessage} ${isDesktop ? styles.desktopRoomMessage : ''}`}>{room.lastMessage}</div>
                </div>
  
                {(isSelectingForReport || isSelectingForEdit) ? (
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room.id)}
                    className={`${styles.reportCheckbox} ${isDesktop ? styles.desktopReportCheckbox : ''}`}
                  />
                ) : (
                  <button
                    className={`${styles.joinButton} ${isDesktop ? styles.desktopJoinButton : ''}`}
                    onClick={() => handleRoomClick(room.id)}
                  >
                    참여하기
                  </button>
                )}
              </div>
            ))}
          </div>
  
          {/* 하단바 */}
          <div className={`${styles.bottomNav} ${isDesktop ? styles.desktopBottomNav : ''}`}>
            <div className={`${styles.navItem} ${isDesktop ? styles.desktopNavItem : ''}`}>
              <img
                src={Icon4}
                alt="내가 속한 방"
                className={`${styles.navIcon} ${isDesktop ? styles.desktopNavIcon : ''}`}
                onClick={() => handleRoomClick("RoomPage")}
              />
              <span className={`${styles.navText} ${isDesktop ? styles.desktopNavText : ''}`}>내가 속한 방</span>
            </div>
  
            <div className={`${styles.navItem} ${isDesktop ? styles.desktopNavItem : ''}`}>
              <img
                src={Icon5}
                alt="수업 소통 방"
                className={`${styles.navIcon} ${isDesktop ? styles.desktopNavIcon : ''}`}
                onClick={() => handleRoomClick("ClassRoom")}
              />
              <span className={`${styles.navText} ${isDesktop ? styles.desktopNavText : ''}`}>수업 소통 방</span>
            </div>
  
            <div className={`${styles.navItem} ${isDesktop ? styles.desktopNavItem : ''}`}>
              <img
                src={Icon6}
                alt="자유 소통 방"
                className={`${styles.navIcon} ${isDesktop ? styles.desktopNavIcon : ''}`}
                onClick={() => handleRoomClick("FreeRoom")}
              />
              <span className={`${styles.navText} ${isDesktop ? styles.desktopNavText : ''}`}>자유 소통 방</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Class_Room;
