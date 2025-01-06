import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./FreewritePage.module.css";
import main_mascot from '../images/대학 심볼 횃불이.png';
import main_bell from '../images/bell.png';
import main_message from '../images/message.png';
import main_my from '../images/my.png';
import arrow from '../images/arrow.png';
import bar from '../images/bar.png';
import Header from './_.js'; // 상단바 컴포넌트
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



// API에서 사용할 기본 URL과 헤더 설정
const BASE_URL = 'https://6387-2406-5900-10f0-c886-1516-1f0b-2678-cc12.ngrok-free.app/api/board';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('사용자 인증 정보가 없습니다.');

  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.userId;

  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-USER-ID': userId,
    'ngrok-skip-browser-warning': 1
  };
};

const ContestWrite = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 게시글 ID를 URL에서 가져옴 (수정 시 사용)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [files, setFiles] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [images, setImages] = useState([]);  // 이미지 배열로 수정

<<<<<<< HEAD

  // 특정 게시글 데이터 가져오기 (수정 모드일 경우)
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchPostData(id);
    }
  }, [id]);
=======
    // 반응형 처리를 위한 useMediaQuery 사용
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
>>>>>>> 7090cc74850f8c1e4b61bb14f85aafb4644e7e59

  const fetchPostData = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/competition/update/${postId}`, {
        headers: { ...getAuthHeaders(), 'ngrok-skip-browser-warning': 1 },
      });
      const { competitionTitle, competitionContents, competitionHashtag, competitionFile } = response.data;
      setTitle(competitionTitle);
      setContent(competitionContents);
      setHashtag(competitionHashtag);
      setFiles(competitionFile);
    } catch (error) {
      console.error('Error fetching post data:', error);
      alert('게시글 정보를 불러오는 데 실패했습니다.');
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // FileList를 배열로 변환
  };

<<<<<<< HEAD
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('competitionTitle', title);
    formData.append('competitionContents', content);
    formData.append('competitionHashtag', hashtag);

    // 파일이 있을 경우에만 추가
    if (files && files.length > 0) {
      files.forEach((file) => formData.append('competitionFile', file)); // 'freeFile'은 서버에서 요구하는 키 이름
    }

    try {
      const url = isEditing ? `${BASE_URL}/competition/update` : `${BASE_URL}/competition/save`;
      const headers = { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' };

      const response = await axios.post(url, formData, { headers });

      if (response.status === 200) {
        alert('게시글이 성공적으로 처리되었습니다.');
        navigate('/FreeboardPage'); // 게시글 목록 페이지로 이동
      } else {
        console.error('Failed to save or update data:', response.statusText);
        alert('게시글 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error saving or updating data:', error);
      alert('요청 처리 중 문제가 발생했습니다.');
    }
  };


  return (
    <div className={styles.app}>
      <Header />

      <img src={arrow} className={styles["app-arrow"]} alt="back_arrow" onClick={() => navigate(-1)} />
      <h2 className={styles["title-text2"]}>{isEditing ? '게시글 수정' : '대회게시판 작성'}</h2>

      <img src={bar} className={styles["app-bar"]} alt="bar" />

      <div className={styles["input-group"]}>
        <h2 className={styles["title-text3"]}>제목</h2>
        <input
          className={styles["input"]}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
        />
      </div>

      <div className={styles["input-group"]}>
        <h2 className={styles["title-text5"]}>해시태그</h2>
        <input
          className={styles["input"]}
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="#해시태그 입력"
        />
      </div>

      <div className={styles["input-group"]}>
        <h2 className={styles["title-text6"]}>내용</h2>
        <textarea
          className={styles["textarea"]}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요."
        />
      </div>

      {/* 이미지 미리보기 */}
      <div className={styles["image-preview-container"]}>
        {images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`미리보기 ${index + 1}`} className={styles["image-preview"]} />
        ))}
      </div>

      <div className={styles["input-group"]}>
        <h2 className={styles["title-text4"]}>파일 첨부</h2>
        <input
          className={styles["input"]}
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>

      <div className={styles["submit-group"]}>
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          {isEditing ? '수정' : '작성'}
        </button>
      </div>
    </div>
  );
=======
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
                    {/* 왼쪽 나가기 버튼 */}
                    <img
                        src={CommunicationRoom_goBack}
                        className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : ''}`}
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}  /* 뒤로 가기 동작 추가 */
                    />
                    {/* 페이지 타이틀 */}
                    <p className={`${styles.subtitle} ${isDesktop ? styles.desktopSubtitle : ''}`}>정보 게시판 - 대회</p>
                    <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>
                        게시글 작성
                    </h1>
                </div>

                {/* 폼 입력 부분 */}
                <div className={`${styles.form} ${isDesktop ? styles.desktopForm : ''}`}>

                    {/* 제목 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder=""
                            className={`${styles.inputField} ${isDesktop ? styles.desktopInputField : ''}`}
                        />
                    </div>
                    
                    {/* 모집기간 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>모집기간</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setRecruitPeriod(e.target.value)} // 모집기간 상태 업데이트
                            placeholder=""
                            className={`${styles.inputField} ${isDesktop ? styles.desktopInputField : ''}`}
                        />
                    </div>

                    {/* 해시태그 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>해시태그</label>
                        <input
                            type="text"
                            value={hashTag}
                            onChange={(e) => setHashTag(e.target.value)}
                            placeholder="#해시태그"
                            className={`${styles.inputField} ${isDesktop ? styles.desktopInputField : ''}`}
                        />
                    </div>

                    {/* 내용 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요..."
                            className={`${styles.textarea} ${isDesktop ? styles.desktopTextarea: ''}`}
                        />
                    </div>

                    {/* 게시글 올리기 버튼 */}
                    <button className={`${styles.submitButton} ${isDesktop ? styles.desktopSubmitButton: ''}`} onClick={handleSubmit}>
                        게시글 올리기
                    </button>
                </div>
            </div>
        </div>
    );
>>>>>>> 7090cc74850f8c1e4b61bb14f85aafb4644e7e59
};

export default ContestWrite;
