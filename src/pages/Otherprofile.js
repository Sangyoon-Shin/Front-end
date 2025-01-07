//1. 다른사람 프로필

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Otherprofile.module.css';  // 필요한 스타일 가져오기
import profileIcon from '../images/프로필.png'; // 프로필 아이콘
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import UserContext from './UserContext'; //유저 프로필

import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함

const Otherprofile = () => {
  const navigate = useNavigate();
  const roomId  = '91f3411b-1433-4fdd-b3ac-c0a594b5f407'; // URL에서 roomId 가져오기
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState([]); // 사용자 목록 상태
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // 신고 버튼 활성화 상태

  // 반응형 페이지 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
    const baseUrl = 'https://a1de-61-84-64-212.ngrok-free.app';
  useEffect(() => {
    // 사용자 목록 가져오기
    const fetchUserList = async () => {
      try {
        const fet = await fetch(`${baseUrl}/Room/GetUserList/${roomId}`, {
          headers : {
              contentType: 'application/json',
              'ngrok-skip-browser-warning': 'abc',
          },
          method: 'GET',
      });
      const response = await fet.json();
      console.log(response.data);
      if (response.code === 200) {
          setUserList(response.data);
          console.log(userList);
        } else {
          console.error('사용자 목록을 가져오는데 실패했습니다:', response.data);
        }
      } catch (error) {
        console.error('사용자 목록 요청 중 오류 발생:', error);
      }
    };

    fetchUserList();
  }, [roomId]);

  useEffect(() => {
    // 신고 사유가 5자 이상이면 버튼 활성화
    setIsSubmitEnabled(reportReason.length >= 5);
  }, [reportReason]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleEditProfile = () => {
    navigate(`/messages/${selectedUser.userId}`); // 쪽지 페이지로 이동 (선택된 사용자 ID 포함)
  };

  const handleReportClick = () => {
    setReportReason('');
    setIsModalOpen(true);
  };

  const handleSubmitReport = async () => {
    try {
      await axios.post('/admin/report', {
        reportedUserId: selectedUser.userId,
        reportReason,
      });
      alert('신고가 접수되었습니다.');
      setReportReason('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('신고 요청 중 오류 발생:', error);
      alert('신고 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReportReason('');
  };

  return (
    <div className={styles.app}>
      {/* 상단바 */}
      <header className={`${styles["app-header"]} ${isDesktop ? styles.desktopHeader : styles.mobileHeader}`}>
        <div className={styles["title-group"]}>
          <img src={main_mascot} className={styles["app-main_mascot"]} alt="main_mascot" />
          <h2>INFO!</h2>
          <div className={`${styles["right-section"]} ${isDesktop ? styles.desktopRightSection : ''}`}>
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
              onClick={() => navigate(-1)}
            />
            <h1 className={styles.pageTitle}>채팅방 사용자 목록</h1>
          </div>

          <ul className={styles.userList}>
            {userList.map((user) => (
              <li key={user.userId} className={styles.userItem} onClick={() => handleUserClick(user)}>
                <img src={user.profileUrl || profileIcon} alt={user.userName} className={styles.userProfileImage} />
                <span>{user.userName}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedUser && (
          <div className={styles.content}>
            <div className={`${styles.profilePictureContainer} ${isDesktop ? styles.desktopProfilePictureContainer : ''}`}>
              <img
                src={selectedUser.profileUrl || profileIcon}
                alt="Profile"
                className={`${styles.profilePicture} ${isDesktop ? styles.desktopProfilePicture : styles.mobileProfilePicture}`}
              />
            </div>
            <div className={`${styles.profileInfo} ${isDesktop ? styles.desktopProfileInfo : styles.mobileProfileInfo}`}>
              <div className={styles.nickname}>{selectedUser.userName}</div>
              <button className={styles.sentButton} onClick={handleEditProfile}>
                쪽지 보내기
              </button>
              <button className={styles.reportButton} onClick={handleReportClick}>
                신고하기
              </button>
            </div>
          </div>
        )}

        {/* 신고 모달 */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${isDesktop ? styles.desktopModalContent : ''}`}>
              <h3>신고하기</h3>
              <textarea
                className={`${styles.reportTextarea} ${isDesktop ? styles.desktopReportTextarea : ''}`}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="신고 사유를 입력하세요 (5자 이상)"
              />
              <div className={styles.modalButtons}>
                <button
                  onClick={handleSubmitReport}
                  className={`${styles.submitButton} ${isDesktop ? styles.desktopSubmitButton : ''}`}
                  disabled={!isSubmitEnabled}
                >
                  신고하기
                </button>
                <button onClick={handleCloseModal} className={`${styles.cancelButton} ${isDesktop ? styles.desktopCancelButton : ''}`}>
                  취소
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
