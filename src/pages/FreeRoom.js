import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Header from './_.js';  // 상단바 컴포넌트
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기


import styles from './FreeRoom.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import menuIcon from '../images/메뉴버튼.png';
import Icon1 from '../images/하트이모지.png';  // 방 1의 아이콘
import Icon2 from '../images/눈이모지.png';   // 방 2의 아이콘
import Icon3 from '../images/폭죽이모지.png'; // 방 3의 아이콘

import Icon4 from '../images/내가속한방 횃불이.png';  // 하단바 아이콘들
import Icon5 from '../images/수업소통방 횃불이.png';
import Icon6 from '../images/자유소통방 횃불이.png';

import Icon8 from '../images/프로필.png';

import Icon9 from '../images/검색.png';


const roomsData = [
  { id: 1, title: '자유 소통방 1', lastMessage: '마지막 내용', icon: Icon1, selected: false },
  { id: 2, title: '자유 소통방 2', lastMessage: '마지막 내용', icon: Icon2, selected: false },
  { id: 3, title: '자유 소통방 3', lastMessage: '마지막 내용', icon: Icon3, selected: false },
];

const FreeRoom = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴 열림/닫힘 상태
  const [isSelectingForReport, setIsSelectingForReport] = useState(false); // 방 신고 모드 여부
  const [isSelectingForEdit, setIsSelectingForEdit] = useState(false); // 방 편집 모드 여부
  const [selectedRooms, setSelectedRooms] = useState([]); // 신고 및 편집을 위해 선택된 방 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 신고 모달 열림/닫힘 상태
  const [reportReason, setReportReason] = useState(''); // 신고 사유 상태
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(''); //검색 관련
  const [activeFilter, setActiveFilter] = useState('재학생'); //탭


  // 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  
  // 방 ID에 맞는 페이지로 이동하기
  const handleRoomClick = (path) => {
    navigate(`/${path}`);  // 방 ID에 맞는 페이지로 이동
  };


  // 검색 기능 처리 함수
  const handleSearch = () => {
    console.log('검색어:', searchTerm);
    // 검색 결과에 맞는 글 필터링 로직을 여기에 추가
  };

  // 필터링 처리 함수
  const handleFilter = (filter) => {
    setActiveFilter(filter);
    console.log('필터 선택:', filter);
    // 필터링된 방 목록 로직을 여기에 추가
  };

  //프로필로 이동
  const handleProfileClick = () => {
    navigate('/myprofile');
  };

  return (
    <div className={styles.app}>
      {/* 상단바 */}
      <header className={styles["app-header"]}>
        <div className={`${styles["title-group"]} ${isDesktop ? styles["desktop-title-group"] : ''}`}>
          <img src={main_mascot} className={styles["app-main_mascot"]} alt="main_mascot" />
          <h2>INFO!</h2>
          <div className={styles["right-section"]}>
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
          <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
            <img
              src={CommunicationRoom_goBack}
              className={styles.goBackButton}
              alt="뒤로가기"
              onClick={() => navigate(-1)}
            />
            <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>
              자유 소통방
            </h1>
          </div>
  
          {/* 검색창 및 필터링 UI */}
          <div className={`${styles.searchContainer} ${isDesktop ? styles.desktopSearchContainer : ''}`}>
            <div className={styles.profileIcon} onClick={handleProfileClick}>
              <img src={Icon8} alt="Profile Icon" />
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
              <img src={Icon9} alt="Search Icon" />
            </button>
          </div>
  
          {/* 방 목록 */}
          <div className={styles.roomsList}>
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
                  className={styles.roomIcon}
                />
                <div className={styles.roomInfo}>
                  <div className={styles.roomTitle}>{room.title}</div>
                  <div className={styles.roomMessage}>{room.lastMessage}</div>
                </div>
                {(isSelectingForReport || isSelectingForEdit) ? (
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room.id)}
                    className={styles.reportCheckbox}
                  />
                ) : (
                  <button
                    className={styles.joinButton}
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
            <div className={styles.navItem}>
              <img
                src={Icon4}
                alt="내가 속한 방"
                className={styles.navIcon}
                onClick={() => handleRoomClick("RoomPage")}
              />
              <span className={styles.navText}>내가 속한 방</span>
            </div>
            <div className={styles.navItem}>
              <img
                src={Icon5}
                alt="수업 소통 방"
                className={styles.navIcon}
                onClick={() => handleRoomClick("ClassRoom")}
              />
              <span className={styles.navText}>수업 소통 방</span>
            </div>
            <div className={styles.navItem}>
              <img
                src={Icon6}
                alt="자유 소통 방"
                className={styles.navIcon}
                onClick={() => handleRoomClick("FreeRoom")}
              />
              <span className={styles.navText}>자유 소통 방</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  

};

export default FreeRoom;
