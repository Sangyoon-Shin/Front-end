import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profileedit.module.css';  // 필요한 스타일 가져오기
import profileIcon from '../images/프로필.png'; // 프로필 아이콘
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import axios from 'axios'; //Axios를 사용하여 닉네임을 서버로 보내고 응답을 받기
import UserContext from './UserContext'; //유저 정보 부분
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함

const Profileedit = () => {
  const fileInputRef = useRef(null);
  const { user, updateUser } = useContext(UserContext);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || profileIcon);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(false);
// 반응형 페이지 처리를 위한 useMediaQuery 사용
const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  const handleSaveProfile = () => { 
    if (isDuplicate) { 
      alert('이미 사용 중인 닉네임입니다.'); 
      return; 
    } 
    const updatedUser = { name, email, profilePicture }; 
    updateUser(updatedUser); 
    navigate(-1);
  };

  const handleDuplicateCheck = async () => { 
    try { 
      const response = await axios.post('https://your-backend-api.com/check-username', { username: name }); 
      setIsDuplicate(response.data.isDuplicate); 
      if (response.data.isDuplicate) { 
        alert('이미 사용 중인 닉네임입니다.'); 
      } else { 
        alert('사용 가능한 닉네임입니다.'); 
      } 
    } catch (error) { 
      console.error('중복 확인 중 오류가 발생했습니다:', error); 
    }
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // 프로필 사진 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

    return (
      <div className={styles.app}>
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
              <h1 className={styles.pageTitle}>내 프로필</h1> {/* 내가 속한 방 중앙 타이틀 */}
            </div>
          </div>
  
          <div className={styles.formGroup}>
            <div className={styles.profilePictureContainer} onClick={handleProfileClick}>
              <img src={profilePicture} alt="Profile" className={styles.profilePicture} />
              <input
                type="file"
                id="profilePicture"
                ref={fileInputRef}
                className={styles.fileInput}
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }} // input을 숨깁니다.
              />
            </div>
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="name">닉네임</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            /> 
            <button className={styles.duplicateButton} onClick={handleDuplicateCheck}> 
              중복 확인 
            </button> 
            {isDuplicate && <span className={styles.duplicateWarning}>이미 사용 중인 닉네임입니다. </span>}
          </div>
  
          <button className={styles.saveButton} onClick={handleSaveProfile}>
            저장하기
          </button>
        </div>
      </div>
    );
};

export default Profileedit;
