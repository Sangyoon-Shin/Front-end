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
const BASE_URL = 'rmation-chat.kro.kr';

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

const Makechat = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 게시글 ID를 URL에서 가져옴 (수정 시 사용)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [files, setFiles] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [images, setImages] = useState([]);  // 이미지 배열로 수정


  const [Mode, setMode] = useState('');
  const [IsTel, setIsTel] = useState('');

  // 특정 게시글 데이터 가져오기 (수정 모드일 경우)
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/Room/${postId}`, {
        headers: { ...getAuthHeaders(), 'ngrok-skip-browser-warning': 1 },
      });
      const { roomName, description, mode, isTel, hashTag } = response.data;
      setTitle(roomName);
      setContent(description);
      setHashtag(hashTag);
      setMode(mode);
      setIsTel(isTel);
    } catch (error) {
      console.error('Error fetching post data:', error);
      alert('게시글 정보를 불러오는 데 실패했습니다.');
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // FileList를 배열로 변환
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('roomName', title);
    formData.append('description', content);
    formData.append('mode', 'Opened');
    formData.append('isTel', 'True');
    formData.append('hashTag', hashtag);


    // 파일이 있을 경우에만 추가
    if (files && files.length > 0) {
    //  files.forEach((file) => formData.append('freeFile', file)); // 'freeFile'은 서버에서 요구하는 키 이름
    }

    try {
      const url = isEditing ? `${BASE_URL}/Room` : `${BASE_URL}/Room`;
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
      <h2 className={styles["title-text2"]}>{isEditing ? '게시글 수정' : '소통채팅방 개설'}</h2>

      <img src={bar} className={styles["app-bar"]} alt="bar" />

      <div className={styles["input-group"]}>
        <h2 className={styles["title-text3"]}>채팅방 이름</h2>
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
        <h2 className={styles["title-text6"]}>채팅방 설명</h2>
        <textarea
          className={styles["textarea"]}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요."
        />
      </div>


      <div className={styles["submit-group"]}>
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          {isEditing ? '수정' : '채팅방 개설'}
        </button>
      </div>
    </div>
  );
};

export default Makechat;