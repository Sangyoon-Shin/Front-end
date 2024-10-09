import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./WritePage.module.css"; // CSS 모듈 파일
import main_mascot from '../images/대학 심볼 횃불이.png';
import main_bell from '../images/bell.png';
import main_message from '../images/message.png';
import main_my from '../images/my.png';
import arrow from '../images/arrow.png';
import bar from '../images/bar.png';

// WritePage 컴포넌트 정의
const WritePage = () => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 각 입력 필드의 상태 관리
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(''); // 모집 시작 날짜 상태
  const [endDate, setEndDate] = useState(''); // 모집 종료 날짜 상태
  const [hashtag, setHashtag] = useState('');
  const [content, setContent] = useState('');

  // 작성 버튼 클릭 시 호출될 함수
  const handleSubmit = () => {
    // 여기에 데이터를 처리하거나 서버로 전송하는 로직을 추가할 수 있습니다.
    console.log("작성된 내용:", { title, startDate, endDate, hashtag, content });
    // 예: 작성 완료 후 게시글 목록 페이지로 이동
    navigate('/notices');  // 게시글 목록 페이지로 이동한다고 가정
  };

  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
        {/* 뒤로가기 화살표 클릭 시 이전 페이지로 이동 */}
        <div className={styles["title-group"]}>
          <img src={main_mascot} className={styles["app-main_mascot"]} alt="main_mascot" />
          <h2>INFO!</h2>
          <div className={styles["right-section"]}>
            <h2 className={styles["title-text"]}>공지사항</h2>
            <img src={main_bell} className={styles["app-main_bell"]} alt="main_bell" />
            <img src={main_message} className={styles["app-main_message"]} alt="main_message" />
            <img src={main_my} className={styles["app-main_my"]} alt="main_my" />
          </div>
        </div>

        <img src={arrow} className={styles["app-arrow"]} alt="back_arrow" onClick={() => navigate(-1)} />
        <h2 className={styles["title-text2"]}>게시글 작성</h2>

        <img src={bar} className={styles["app-bar"]} alt="bar" />

        {/* 제목 입력 */}
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

        {/* 모집기간 선택 */}
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

        {/* 해시태그 입력 */}
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

        {/* 내용 입력 */}
        <div className={styles["input-group"]}>
          <h2 className={styles["title-text6"]}>내용</h2>
          <textarea
            className={styles["textarea"]}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
          />
        </div>

        {/* 작성 버튼 */}
        <div className={styles["submit-group"]}>
          <button className={styles["submit-button"]} onClick={handleSubmit}>
            작성
          </button>
        </div>
      </header>
    </div>
  );
};

export default WritePage;