import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Header from './_.js';  // 상단바 컴포넌트

import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기

import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import styles from './RoomPage.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import menuIcon from '../images/메뉴버튼.png';
import Icon1 from '../images/하트이모지.png';  // 방 1의 아이콘
import Icon2 from '../images/눈이모지.png';   // 방 2의 아이콘
import Icon3 from '../images/폭죽이모지.png'; // 방 3의 아이콘
import Icon4 from '../images/내가속한방 횃불이.png';  // 하단바 아이콘들
import Icon5 from '../images/수업소통방 횃불이.png';
import Icon6 from '../images/자유소통방 횃불이.png';

const roomsData = [
  { id: 1, title: '내가 속한 방 제목 1', lastMessage: '마지막 내용', icon: Icon1, selected: false },
  { id: 2, title: '내가 속한 방 제목 2', lastMessage: '마지막 내용', icon: Icon2, selected: false },
  { id: 3, title: '내가 속한 방 제목 3', lastMessage: '마지막 내용', icon: Icon3, selected: false },
];

const RoomPage = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴 열림/닫힘 상태
  const [isSelectingForReport, setIsSelectingForReport] = useState(false); // 방 신고 모드 여부
  const [isSelectingForEdit, setIsSelectingForEdit] = useState(false); // 방 편집 모드 여부
  const [selectedRooms, setSelectedRooms] = useState([]); // 신고 및 편집을 위해 선택된 방 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 신고 모달 열림/닫힘 상태
  const [reportReason, setReportReason] = useState(''); // 신고 사유 상태
  const navigate = useNavigate();

  // 방 ID에 맞는 페이지로 이동하기
  const handleRoomClick = (path) => {
    navigate(`/${path}`);  // 방 ID에 맞는 페이지로 이동
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // 메뉴 토글
  };
// 반응형 페이지 처리를 위한 useMediaQuery 사용
const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  // 신고하기 버튼 클릭 시 방 신고 선택 모드로 전환
  const handleReportClick = () => {
    setIsSelectingForReport(true);
    setIsSelectingForEdit(false);
    setMenuOpen(false);
  };

  // 편집하기 버튼 클릭 시 방 편집 선택 모드로 전환
  const handleEditClick = () => {
    setIsSelectingForEdit(true);
    setIsSelectingForReport(false);
    setMenuOpen(false);
  };

  // 방 신고 또는 편집 모드에서 체크박스 클릭 시 선택된 방 관리
  const handleSelectRoom = (id) => {
    if (selectedRooms.includes(id)) {
      setSelectedRooms(selectedRooms.filter((roomId) => roomId !== id));
    } else {
      setSelectedRooms([...selectedRooms, id]);
    }
  };

  // 신고 모드 취소 함수
  const handleCancelReport = () => {
    setIsSelectingForReport(false); // 신고 모드 종료
    setSelectedRooms([]); // 선택된 방 초기화
  };

  // 편집 모드 취소 함수
  const handleCancelEdit = () => {
    setIsSelectingForEdit(false); // 편집 모드 종료
    setSelectedRooms([]); // 선택된 방 초기화
  };

  // 신고 버튼 클릭 시 신고 팝업 열기
  const handleOpenReportModal = () => {
    if (selectedRooms.length !== 1) {
      alert("신고할 방을 하나만 선택하세요.");
    } else {
      setReportReason('');  // 신고 모달을 열기 전에 신고 사유를 빈 문자열로 초기화
      setIsModalOpen(true);
    }
  };

  // 신고 팝업에서 신고하기 버튼 클릭
  const handleSubmitReport = () => {
    alert(`신고 사유: ${reportReason}`);
    setReportReason('');  // 신고 사유 초기화
    setIsModalOpen(false);
    setSelectedRooms([]);
    setIsSelectingForReport(false);
  };

  // 신고 팝업에서 취소 버튼 클릭
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRooms([]);
    setIsSelectingForReport(false);
    setReportReason('');  // 신고 사유 초기화
  };

  // 선택된 방 삭제 함수
  const handleDeleteRooms = () => {
    if (selectedRooms.length === 0) {
      alert("삭제할 방을 선택하세요.");
    } else {
      setRooms(rooms.filter((room) => !selectedRooms.includes(room.id)));
      setSelectedRooms([]);
      setIsSelectingForEdit(false);
      alert("선택된 방이 삭제되었습니다.");
    }
  };
 
    return (
      <div className={styles.app}>
        {/* 상단바 */}
        <header className={styles["app-header"]}>
          <div className={styles["title-group"]}>
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
                onClick={() => navigate(-1)}  /* 뒤로 가기 동작 추가 */
              />
              <h1 className={styles.pageTitle}>내가 속한 방</h1>       {/* 내가 속한 방 중앙 타이틀 */}
            </div>
  
            {/* 메뉴 버튼 */}
            <img
              src={menuIcon}
              className={styles.menuButton}
              alt="메뉴"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.menuItem} onClick={handleEditClick}>편집하기</div>
                <div className={styles.menuItem} onClick={handleReportClick}>신고하기</div>
              </div>
            )}
  
            {/* 방 목록 추가 */}
            <div className={styles.roomsList}>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`${styles.roomItem} ${room.selected ? styles.selected : ''}`}
                >
                  <img src={room.icon} alt={`방 아이콘 ${room.id}`} className={styles.roomIcon} />  {/* 아이콘 추가 */}
                  <div className={styles.roomInfo}>
                    <div className={styles.roomTitle}>{room.title}</div>
                    <div className={styles.roomMessage}>{room.lastMessage}</div>
                  </div>
  
                  {(isSelectingForReport || isSelectingForEdit) ? (
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes(room.id)}
                      onChange={() => handleSelectRoom(room.id)}
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
  
            {/* 방 신고 및 취소 버튼 */}
            {isSelectingForReport && (
              <div className={styles.reportActions}>
                <button className={styles.reportButton} onClick={handleOpenReportModal}>
                  선택된 방 신고하기
                </button>
                <button className={styles.cancelButton} onClick={handleCancelReport}>
                  신고 모드 취소
                </button>
              </div>
            )}
  
            {/* 방 삭제 및 취소 버튼 */}
            {isSelectingForEdit && (
              <div className={styles.reportActions}>
                <button className={styles.reportButton} onClick={handleDeleteRooms}>
                  선택된 방 삭제하기
                </button>
                <button className={styles.cancelButton} onClick={handleCancelEdit}>
                  편집 모드 취소
                </button>
              </div>
            )}
  
            {/* 신고 모달 */}
            {isModalOpen && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <h3>신고하기</h3>
                  <textarea
                    className={styles.reportTextarea}
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="신고 사유를 입력하세요"
                  />
                  <div className={styles.modalButtons}>
                    <button onClick={handleSubmitReport} className={styles.reportButton}>
                      신고하기
                    </button>
                    <button onClick={handleCloseModal} className={styles.cancelButton}>
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
  
            {/* 하단바 */}
            <div className={styles.bottomNav}>
              <div className={styles.navItem}>
                <img
                  src={Icon4}
                  alt="내가 속한 방"
                  className={styles.navIcon}
                  onClick={() => handleRoomClick("RoomPage")}  // 내가속한방으로 이동
                />
                <span className={styles.navText}>내가 속한 방</span>  {/* 텍스트 추가 */}
              </div>
  
              <div className={styles.navItem}>
                <img
                  src={Icon5}
                  alt="수업 소통 방"
                  className={styles.navIcon}
                  onClick={() => handleRoomClick("ClassRoom")}  // 수업소통방으로 이동
                />
                <span className={styles.navText}>수업 소통 방</span>  {/* 텍스트 추가 */}
              </div>
  
              <div className={styles.navItem}>
                <img
                  src={Icon6}
                  alt="자유 소통 방"
                  className={styles.navIcon}
                  onClick={() => handleRoomClick("FreeRoom")}  // 자유소통방으로 이동
                />
                <span className={styles.navText}>자유 소통 방</span>  {/* 텍스트 추가 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
  };

export default RoomPage;
