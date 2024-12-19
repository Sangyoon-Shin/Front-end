import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js';  // 상단바 컴포넌트
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
  const [rooms, setRooms] = useState(roomsData); // 여기는 하드코딩 되어있는 상태
  // const [rooms, setRooms] = useState([]); // 방 목록 상태를 빈 배열로 초기화 --> 백엔드에서 가져오려면 이 코드로 
  const [menuOpen, setMenuOpen] = useState(false);  // 메뉴 열림/닫힘 상태
  const [isSelectingForReport, setIsSelectingForReport] = useState(false); // 방 신고 모드 여부
  const [isSelectingForEdit, setIsSelectingForEdit] = useState(false); // 방 편집 모드 여부
  const [selectedRooms, setSelectedRooms] = useState([]); // 신고 및 편집을 위해 선택된 방 목록
  const [isModalOpen, setIsModalOpen] = useState(false); // 신고 모달 열림/닫힘 상태
  const [reportReason, setReportReason] = useState(''); // 신고 사유 상태
  const navigate = useNavigate();

  // 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  {/*
   // 방 목록을 백엔드에서 가져오기 위한 useEffect
   useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/rooms');
        if (!response.ok) {
          throw new Error('방 목록을 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setRooms(data); // 방 목록 상태 업데이트
      } catch (error) {
        console.error('방 목록을 가져오는 중 오류 발생:', error);
        alert('방 목록을 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchRooms();
  }, []);
  */}

  // 방 ID에 맞는 페이지로 이동하기
  const handleRoomClick = (id) => {
    navigate(`/room/${id}`);  // 방 ID에 맞는 페이지로 이동
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // 메뉴 토글
  };

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

  // 신고 팝업에서 신고하기 버튼 클릭 - fetch 사용 추가
  const handleSubmitReport = async () => {
    if (reportReason.trim() === '') {
      alert('신고 사유를 입력해주세요.');
      return;
    }

    const reportedRoomId = selectedRooms[0];
    const reportData = {
      roomId: reportedRoomId,
      reason: reportReason,
    };

    try {
      // fetch API 호출
      const response = await fetch('https://your-backend-api.com/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error('신고 요청이 실패했습니다.');
      }

      alert('신고가 성공적으로 접수되었습니다.');

      // 상태 초기화
      setReportReason('');
      setIsModalOpen(false);
      setSelectedRooms([]);
      setIsSelectingForReport(false);
    } catch (error) {
      console.error('신고하는 동안 오류가 발생했습니다:', error);
      alert('신고에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 신고 팝업에서 취소 버튼 클릭
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRooms([]);
    setIsSelectingForReport(false);
    setReportReason('');  // 신고 사유 초기화
  };

  {/* 백엔드 연동하기 전 코드
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
  */}

  // 선택된 방 삭제 함수 (백엔드 연동)
  const handleDeleteRooms = async () => {
    if (selectedRooms.length === 0) {
      alert("삭제할 방을 선택하세요.");
    } else {
      try {
        // 각 선택된 방에 대해 DELETE 요청을 보냄
        for (const roomId of selectedRooms) {
          const response = await fetch(`https://your-backend-api.com/rooms/${roomId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error(`방 ID ${roomId}을(를) 삭제하는 데 실패했습니다.`);
          }
        }

        // 상태 업데이트: 클라이언트 측에서도 방 삭제
        setRooms(rooms.filter((room) => !selectedRooms.includes(room.id)));
        setSelectedRooms([]);
        setIsSelectingForEdit(false);
        alert("선택된 방이 삭제되었습니다.");

      } catch (error) {
        console.error('방 삭제 중 오류 발생:', error);
        alert('방 삭제 중 문제가 발생했습니다.');
      }
    }
  };


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
          <img
            src={CommunicationRoom_goBack}
            className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : ''}`}
            alt="뒤로가기"
            onClick={() => navigate(-1)}  /* 뒤로 가기 동작 추가 */
          />
          <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>
            내가 속한 방
          </h1>
        </div>

        {/* 메뉴 버튼 */}
        <img
          src={menuIcon}
          className={`${styles.menuButton} ${isDesktop ? styles.desktopMenuButton : ''}`}
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
        <div className={`${styles.roomsList} ${isDesktop ? styles.desktopRoomsList : ''}`}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`${styles.roomItem} ${isDesktop ? styles.desktopRoomItem : ''} ${room.selected ? styles.selected : ''
                }`}
            >
              <img src={room.icon} alt={`방 아이콘 ${room.id}`} className={styles.roomIcon} />
              <div className={`${styles.roomInfo} ${isDesktop ? styles.desktopRoomInfo : ''}`}>
                <div className={`${styles.roomTitle} ${isDesktop ? styles.desktopRoomTitle : ''}`}>{room.title}</div>
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
              <h4>신고하기</h4>
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
              onClick={() => handleRoomClick("내가속한방")}
            />
            <span className={styles.navText}>내가 속한 방</span>
          </div>
          <div className={styles.navItem}>
            <img
              src={Icon5}
              alt="수업 소통 방"
              className={styles.navIcon}
              onClick={() => handleRoomClick("수업소통방")}
            />
            <span className={styles.navText}>수업 소통 방</span>
          </div>
          <div className={styles.navItem}>
            <img
              src={Icon6}
              alt="자유 소통 방"
              className={styles.navIcon}
              onClick={() => handleRoomClick("자유소통방")}
            />
            <span className={styles.navText}>자유 소통 방</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
