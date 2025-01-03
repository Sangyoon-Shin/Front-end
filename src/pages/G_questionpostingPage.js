import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./G_questionpostingPage.module.css";
import main_mascot from '../images/대학 심볼 횃불이.png';
import main_bell from '../images/bell.png';
import main_message from '../images/message.png';
import main_my from '../images/my.png';
import arrow from '../images/arrow.png';
import scrab from '../images/스크랩횃불이.png';
import heart from '../images/heart.png';
import filledHeart from '../images/filledheart.png';
import bar from '../images/bar.png';
import Header from './G_.js';  // 상단바 컴포넌트
// import Header from './Header'; // import the Header component

const BASE_URL = 'http://<your-domain>/api/board';  // 백엔드 API URL 설정

// 인증 헤더 가져오는 함수
const getAuthHeaders = () => {
  const userId = localStorage.getItem('userId');  // 저장된 userId 가져오기
  const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-USER-ID': userId,  // 요청 헤더에 userId 추가
    'Content-Type': 'application/json',
  };
};

const G_questionpostingPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [replyContents, setReplyContents] = useState([]);
  const [nickname, setNickname] = useState('');
  const [nicknameCount, setNicknameCount] = useState({ int: 0, short: 0, double: 0, char: 0 });
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [replyVisible, setReplyVisible] = useState({});  // 대댓글 가시성 상태 관리

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

  // API 호출해서 퀘스트 작성시 필요한 기본 폼 정보 가져오기
  useEffect(() => {
    const fetchHeartStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quest/save`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        if (response.ok) {
          const data = await response.json();
          // 데이터를 처리할 수 있으면 여기에 로직 추가
        } else {
          console.error('퀘스트 폼 데이터 불러오기 실패');
        }
      } catch (error) {
        console.error('퀘스트 폼 데이터 불러오는 중 오류 발생:', error);
      }
    };

    fetchHeartStatus();
  }, []);

  useEffect(() => {
    if (!nickname) {
      const types = ['int', 'short', 'double', 'char'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setNickname(randomType);
    }
  }, [nickname]);

  const handleContentChange = (e) => setContent(e.target.value);
  const handleCommentChange = (e) => setCommentContent(e.target.value);
  const handleReplyChange = (index, e) => {
    const newReplyContents = [...replyContents];
    newReplyContents[index] = e.target.value;
    setReplyContents(newReplyContents);
  };

  const handleAddComment = async () => {
    if (commentContent.trim() !== '') {
      const newNicknameCount = { ...nicknameCount };
      newNicknameCount[nickname] += 1;
      setNicknameCount(newNicknameCount);

      const newComment = { nickname: `${nickname}${newNicknameCount[nickname]}`, content: commentContent, replies: [] };
      
      try {
        const response = await fetch(`${BASE_URL}/quest/save`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newComment),
        });

        if (response.ok) {
          const savedComment = await response.json();
          setComments([...comments, savedComment]);
          setNicknameCount((prev) => ({ ...prev, [nickname]: prev[nickname] + 1 }));
          setCommentContent('');
        } else {
          console.error('댓글 추가에 실패했습니다.');
        }
      } catch (error) {
        console.error('댓글 추가 중 오류 발생:', error);
      }
    }
  };

  const handleAddReply = async (index) => {
    if (replyContents[index].trim() !== '') {
      const updatedComments = [...comments];
      const newNicknameCount = { ...nicknameCount };
      newNicknameCount[nickname] += 1;
      setNicknameCount(newNicknameCount);

      const newReply = {
        nickname: `${nickname}${newNicknameCount[nickname]}`,
        content: replyContents[index],
      };

      try {
        const response = await fetch(`${BASE_URL}/quest/${comments[index].id}/replies`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newReply),
        });

        if (response.ok) {
          const savedReply = await response.json();
          updatedComments[index].replies.push(savedReply);
          setComments(updatedComments);
          setNicknameCount((prev) => ({ ...prev, [nickname]: prev[nickname] + 1 }));

          const newReplyContents = [...replyContents];
          newReplyContents[index] = '';
          setReplyContents(newReplyContents);
          setReplyVisible((prev) => ({ ...prev, [index]: false }));
        } else {
          console.error('대댓글 추가에 실패했습니다.');
        }
      } catch (error) {
        console.error('대댓글 추가 중 오류 발생:', error);
      }
    }
  };

  const handleToggleReply = (index) => {
    setReplyVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleHeartClick = async () => {
    setIsHeartFilled(!isHeartFilled);
    try {
      const response = await fetch(`${BASE_URL}/quest/like`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isHeartFilled }),
      });

      if (!response.ok) {
        console.error('좋아요 상태 업데이트에 실패했습니다.');
        setIsHeartFilled(!isHeartFilled);
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류 발생:', error);
      setIsHeartFilled(!isHeartFilled);
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const submitReport = async () => {
    try {
      const response = await fetch(`${BASE_URL}/report`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content: reportContent }),
      });

      if (response.ok) {
        setReportContent('');
        togglePopup();
        setIsAlertOpen(true);
        setTimeout(() => {
          setIsAlertOpen(false);
        }, 3000);
      } else {
        console.error('신고 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('신고 제출 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles["content"]}>
        <img src={arrow} className={styles["app-arrow"]} alt="back_arrow" onClick={() => navigate(-1)} />
        <h1 className={styles["title-text2"]}>질문게시판</h1>

        <img src={bar} className={styles["app-bar"]} alt="bar" />
        <h1 className={styles["title-text3"]}>게시판 제목</h1>

        <div className={styles["right-section"]}>
          <img src={main_message} className={styles["app-main_message2"]} alt="main_message" />
          <img src={scrab} className={styles["app-main_message3"]} alt="main_message" />
        </div>

        <h2 className={styles["title-text4"]}>작성일: {formattedDate}</h2>
        <div className={styles["report"]}>
          <button onClick={togglePopup} className={styles["report-button"]}>신고하기</button>
        </div>
      </div>

      {isPopupOpen && (
        <div className={styles["popup"]}>
          <div className={styles["popup-inner"]}>
            <h3>신고하기</h3>
            <p>신고 내용을 입력하세요:</p>
            <textarea className={styles["popup-textarea"]} onChange={(e) => setReportContent(e.target.value)} />
            <div className={styles["popup-button-container"]}>
              <button onClick={togglePopup} className={styles["popup-close"]}>닫기</button>
              <button onClick={submitReport} className={styles["popup-receive"]}>제출</button>
            </div>
          </div>
        </div>
      )}

      {isAlertOpen && (
        <div className={styles["alert-popup"]}>제출이 완료되었습니다.</div>
      )}

      <div className={styles["content-input"]}>
        <textarea
          className={styles["textarea"]}
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요."
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) console.log("선택된 파일:", file);
        }}
      />

      <div className={styles["heart"]}>
        <img
          src={isHeartFilled ? filledHeart : heart}
          className={styles["app-heart"]}
          alt="heart"
          onClick={handleHeartClick}
        />
      </div>

      <div className={styles["content-input2"]}>
        <textarea
          className={styles["textarea2"]}
          value={commentContent}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요."
        />
      </div>

      <div className={styles["reply-button"]}>
        <button onClick={handleAddComment}>댓글 달기</button>
      </div>

      <div className={styles["comments-section"]}>
        {comments.map((comment, index) => (
          <div key={index} className={styles["comment-item"]}>
            <strong>{comment.nickname}:</strong> {comment.content}
            <div className={styles["reply-container"]}>
              <button className={styles["toggle-reply-button"]} onClick={() => handleToggleReply(index)}>
                {replyVisible[index] ? '대댓글 숨기기' : '대댓글 달기'}
              </button>
            </div>

            {replyVisible[index] && (
              <div className={styles["reply-input"]}>
                <textarea
                  className={styles["textarea_reply"]}
                  value={replyContents[index] || ''}
                  onChange={(e) => handleReplyChange(index, e)}
                  placeholder="대댓글을 입력하세요."
                />
                <button onClick={() => handleAddReply(index)}>대댓글 달기</button>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div className={styles["replies-section"]}>
                {comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className={styles["reply-item"]}>
                    <strong>{reply.nickname}:</strong> {reply.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default G_questionpostingPage;
