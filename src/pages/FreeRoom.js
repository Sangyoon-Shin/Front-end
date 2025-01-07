import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import main_mascot from '../images/대학 심볼 횃불이.png';  
import main_bell from '../images/bell.png';  
import main_message from '../images/message.png';  
import main_my from '../images/my.png';  

import styles from './FreeRoom.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import menuIcon from '../images/메뉴버튼.png';
import Icon1 from '../images/하트이모지.png';  
import Icon2 from '../images/눈이모지.png';   
import Icon3 from '../images/폭죽이모지.png'; 
import Icon4 from '../images/내가속한방 횃불이.png';  
import Icon5 from '../images/수업소통방 횃불이.png';
import Icon6 from '../images/자유소통방 횃불이.png';
import Icon8 from '../images/프로필.png';
import Icon9 from '../images/검색.png';

// 웹소켓 설정
const socketUrl = 'ws://localhost:8080'; // 백엔드의 웹소켓 URL (적절히 변경)
const roomsData = [
  { id: 1, title: '자유 소통방 1', lastMessage: '마지막 내용', icon: Icon1, selected: false },
  { id: 2, title: '자유 소통방 2', lastMessage: '마지막 내용', icon: Icon2, selected: false },
  { id: 3, title: '자유 소통방 3', lastMessage: '마지막 내용', icon: Icon3, selected: false },
];

const FreeRoom = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [filteredRooms, setFilteredRooms] = useState(roomsData); // 필터된 방 목록
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('재학생');
  const [messages, setMessages] = useState([]); // 웹소켓 메시지 상태
  const navigate = useNavigate();
  const socketRef = useRef(null);

  // 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  // 웹소켓 연결 및 메시지 수신
  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // 방 ID에 맞는 페이지로 이동하기
  const handleRoomClick = (path) => {
    navigate(`/${path}`);
  };

  // 검색 기능 처리 함수
  const handleSearch = () => {
    const filtered = rooms.filter(
      (room) =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  // 필터링 처리 함수
  const handleFilter = (filter) => {
    setActiveFilter(filter);
    console.log('필터 선택:', filter);
  };

  // 프로필로 이동
  const handleProfileClick = () => {
    navigate('/myprofile');
  };

  // 방에 메시지 전송
  const sendMessage = (roomId, message) => {
    const messageData = {
      roomId,
      message,
      time: new Date().toISOString(),
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageData));
    }
  };

  // 검색어가 변경될 때마다 검색 실행
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div className={styles.app}>
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

          <div className={styles.roomsList}>
            {filteredRooms.map((room) => (
              <div key={room.id} className={`${styles.roomItem} ${room.selected ? styles.selected : ''}`}>
                <img src={room.icon} alt={`방 아이콘 ${room.id}`} className={styles.roomIcon} />
                <div className={styles.roomInfo}>
                  <div className={styles.roomTitle}>{room.title}</div>
                  <div className={styles.roomMessage}>{room.lastMessage}</div>
                </div>
                <button
                  className={styles.joinButton}
                  onClick={() => {
                    handleRoomClick(room.id);
                    sendMessage(room.id, '새로운 메시지!');
                  }}
                >
                  참여하기
                </button>
              </div>
            ))}
          </div>

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
