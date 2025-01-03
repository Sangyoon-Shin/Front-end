import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./BootCamp.module.css";
import main_mascot from '../images/대학 심볼 횃불이.png';
import main_bell from '../images/bell.png';
import main_message from '../images/message.png';
import main_my from '../images/my.png';
import arrow from '../images/arrow.png';
import bar from '../images/bar.png';
import camera from '../images/camera.png';  // 카메라 아이콘
import Header from './_.js';  // 상단바 컴포넌트
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// API에서 사용할 기본 URL과 헤더 설정
const BASE_URL = 'https://bcefb2d9d162.ngrok.app/api/board';

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

const BootCamp = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 게시글 ID를 URL에서 가져옴 (수정 시 사용)

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [files, setFiles] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [images, setImages] = useState([]);  // 이미지 배열로 수정

  // 특정 게시글 데이터 가져오기 (수정 모드일 경우)
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/studies/update/${postId}`, {
        headers: { ...getAuthHeaders(), 'ngrok-skip-browser-warning': 1 },
      });
      const { studyTitle, studyContents, studyHashtag, studyCreatedTime, deadline } = response.data;
      setTitle(studyTitle);
      setContent(studyContents);
      setHashtag(studyHashtag);
      setStartDate(studyCreatedTime);
      setEndDate(deadline);
    } catch (error) {
      console.error('Error fetching post data:', error);
      alert('게시글 정보를 불러오는 데 실패했습니다.');
    }
  };

  const handleFileChange = (e) => setFiles(e.target.files);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('studyTitle', title);
    formData.append('studyContents', content);
    formData.append('studyHashtag', hashtag);
    formData.append('(studyCreatedTime', startDate);
    formData.append('deadline', endDate);
    if (files) Array.from(files).forEach((file) => formData.append('files', file));

    try {
      const url = isEditing ? `${BASE_URL}/studies/update` : `${BASE_URL}/studies/save`;
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(newImages);
  };

  return (
    <div className={styles.app}>
      <Header />

      <img src={arrow} className={styles["app-arrow"]} alt="back_arrow" onClick={() => navigate(-1)} />
      <h2 className={styles["title-text2"]}>{isEditing ? '게시글 수정' : '부트캠프 게시판 작성'}</h2>

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

      {/* 모집기간 */}
      <div className={styles["input-group"]}>
        <h2 className={styles["title-text4"]}>모집기간</h2>
        <div className={styles["date-range"]}>
          <input
            className={styles["input-date"]}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className={styles["date-separator"]}>~</span>
          <input
            className={styles["input-date"]}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
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

      {/* 이미지 업로드 버튼 */ }
      <div className={styles["image-upload"]}>
        <label htmlFor="image-input">
          <img src={camera} alt="카메라 아이콘" className={styles["camera-icon"]} />
        </label>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          multiple  // 여러 이미지 선택 가능
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className={styles["submit-group"]}>
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          {isEditing ? '수정' : '작성'}
        </button>
      </div>
    </div >
  );
};


export default BootCamp;
