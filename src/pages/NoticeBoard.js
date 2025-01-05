import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./NoticeBoard.module.css";
import main_mascot from '../images/대학 심볼 횃불이.png';
import main_bell from '../images/bell.png';
import main_message from '../images/message.png';
import main_my from '../images/my.png';
import arrow from '../images/arrow.png';
import scrab from '../images/스크랩횃불이.png';
import heart from '../images/heart.png';
import filledHeart from '../images/filledheart.png';
import bar from '../images/bar.png';
import Header from './_.js';  // 상단바 컴포넌트

// API에서 사용할 기본 URL과 헤더 설정
// 필요하다면 뒤쪽 슬래시(/)는 빼도 되고, 그에 따라 경로에 '/'를 붙여줄 수 있음
const BASE_URL = 'https://bcefb2d9d162.ngrok.app/api/board';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId'); // 이 부분이 사용자 ID를 가져옵니다.
  return {
    Authorization: `Bearer ${accessToken}`,
    'X-USER-ID': userId, // 사용자 ID를 X-USER-ID로 추가
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 1,
  };
};

const NoticeBoard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [replyContents, setReplyContents] = useState([]);
  const [nickname, setNickname] = useState('');
  const [nicknameCount, setNicknameCount] = useState({
    int: 0,
    short: 0,
    double: 0,
    char: 0,
  });

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [replyVisible, setReplyVisible] = useState({});

  // 날짜 포맷
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;

  // 뒤로가기
  const handleBackClick = () => navigate(-1);

  // 컴포넌트 마운트 시 랜덤 닉네임 선택
  useEffect(() => {
    const types = ['int', 'short', 'double', 'char'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setNickname(randomType);
  }, []);

  // 1) 특정 게시글 정보 가져오기
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${BASE_URL}/free/${id}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          console.error('게시글 불러오기에 실패했습니다.');
          return;
        }
        const data = await response.json();
        // 서버에서 반환하는 필드명에 따라 수정
        setTitle(data.freeTitle);
        setContent(data.freeContents);
      } catch (error) {
        console.error('게시글 불러오는 중 오류 발생:', error);
      }
    };

    // 2) 댓글 목록 불러오기
    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/free/${id}/comments`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          console.error('댓글 불러오기에 실패했습니다.');
          return;
        }
        const data = await response.json();
        // 서버에서 반환하는 JSON 구조에 맞춰 수정
        setComments(data.comments || []);
      } catch (error) {
        console.error('댓글 불러오는 중 오류 발생:', error);
      }
    };

    // 3) 좋아요(하트) 상태 불러오기
    const fetchHeartStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/free/${id}/like-status`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        if (response.ok) {
          const data = await response.json();
          setIsHeartFilled(data.liked); // 서버로부터 불러온 좋아요 상태
        } else {
          console.error('좋아요 상태 불러오기에 실패했습니다.');
        }
      } catch (error) {
        console.error('좋아요 상태 불러오는 중 오류 발생:', error);
      }
    };

    fetchBoard();
    fetchComments();
    fetchHeartStatus();
  }, [id]);

  // 게시글 내용 수정(자유 게시판에서 수정 기능을 원한다면)
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 파일 업로드
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('선택된 파일:', file);
      // 필요하면 서버 업로드 로직
    }
  };

  // 4) 좋아요 토글
  const handleHeartClick = async () => {
    const newHeartStatus = !isHeartFilled;
    setIsHeartFilled(newHeartStatus);

    try {
      const response = await fetch(`${BASE_URL}/free/${id}/like`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ liked: newHeartStatus }),
      });
      if (!response.ok) {
        console.error('좋아요 요청에 실패했습니다.');
        setIsHeartFilled(!newHeartStatus); // 요청 실패 시 되돌림
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류 발생:', error);
      setIsHeartFilled(!newHeartStatus); // 오류 발생 시 되돌림
    }
  };

  // 댓글 입력
  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글 등록
  const handleAddComment = async () => {
    if (commentContent.trim() === '') return;

    try {
      // 댓글 작성 API
      const requestData = {
        content: commentContent,
        userId: nickname, // 간단히 nickname 사용
        targetType: 'Free', // 자유게시판
        targetId: id, // 게시글 ID
      };

      const response = await fetch(`${BASE_URL}/free/${id}/comments/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        console.error('댓글 추가에 실패했습니다.');
        return;
      }
      const savedComment = await response.json();
      setComments([...comments, savedComment]);
      setCommentContent('');
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
    }
  };

  // 대댓글 입력
  const handleReplyChange = (index, e) => {
    const newReplyContents = [...replyContents];
    newReplyContents[index] = e.target.value;
    setReplyContents(newReplyContents);
  };

  // 대댓글 등록
  const handleAddReply = async (index) => {
    if (!replyContents[index] || replyContents[index].trim() === '') return;

    const updatedComments = [...comments];
    const newNicknameCount = { ...nicknameCount };
    newNicknameCount[nickname] += 1;
    setNicknameCount(newNicknameCount);

    try {
      const parentCommentId = updatedComments[index].id;

      // 대댓글 작성 API
      const requestData = {
        content: replyContents[index],
        userId: nickname,
        targetType: 'Free',
        targetId: id, // 게시글 ID
        parentCommentId: parentCommentId,
      };

      const response = await fetch(`${BASE_URL}/free/${id}/comments/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.error('대댓글 추가에 실패했습니다.');
        return;
      }
      const savedReply = await response.json();
      // 현재 댓글 배열에서 해당 댓글에 replies 배열이 없을 수도 있으니 확인
      if (!updatedComments[index].replies) {
        updatedComments[index].replies = [];
      }
      updatedComments[index].replies.push(savedReply);
      setComments(updatedComments);

      // 입력창 초기화 + 닫기
      const newReplyContents = [...replyContents];
      newReplyContents[index] = '';
      setReplyContents(newReplyContents);
      setReplyVisible((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error('대댓글 추가 중 오류 발생:', error);
    }
  };

  // 대댓글 입력창 토글
  const handleToggleReply = (index) => {
    setReplyVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // 신고하기 팝업 열기/닫기
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // 신고 제출
  const submitReport = async () => {
    try {
      const response = await fetch(`${BASE_URL}/free/${id}/report`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content: reportContent }),
      });

      if (!response.ok) {
        console.error('신고 제출에 실패했습니다.');
        return;
      }

      setReportContent('');
      togglePopup();
      setIsAlertOpen(true);

      setTimeout(() => {
        setIsAlertOpen(false);
      }, 3000);
    } catch (error) {
      console.error('신고 제출 중 오류 발생:', error);
    }
  };


return (
  <div>
    <Header />
    <div className={styles["content"]}>
      <img
        src={arrow}
        className={styles["app-arrow"]}
        alt="back_arrow"
        onClick={handleBackClick}
      />
      <h1 className={styles["title-text2"]}>자유 게시판</h1>
      <img src={bar} className={styles["app-bar"]} alt="bar" />

      <h1 className={styles["title-text3"]}>{title || "게시판 제목"}</h1>

      <div className={styles["right-section"]}>
        {/* 첫 번째 이미지 */}
        <div
          className={styles["hover-image"]}
          onClick={() => navigate("/ChatRoom")} // 원하는 페이지로 이동
        >
          <img
            src={main_message}
            className={styles["app-main_message2"]}
            alt="main_message"
          />
        </div>

        {/* 두 번째 이미지 */}
        <div
          className={styles["hover-image"]}
          onClick={() => navigate("/scrap")} // 스크랩 페이지로 이동
        >
          <img
            src={scrab}
            className={styles["app-main_message3"]}
            alt="scrab"
          />
        </div>
      </div>

      <h2 className={styles["title-text4"]}>작성일: {formattedDate}</h2>

      <div className={styles["report"]}>
        <button onClick={togglePopup} className={styles["report-button"]}>
          신고하기
        </button>
      </div>
    </div>

    {isPopupOpen && (
      <div className={styles["popup"]}>
        <div className={styles["popup-inner"]}>
          <h3>신고하기</h3>
          <p>신고 내용을 입력하세요:</p>
          <textarea
            className={styles["popup-textarea"]}
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
          />
          <div className={styles["popup-button-container"]}>
            <button onClick={togglePopup} className={styles["popup-close"]}>
              닫기
            </button>
            <button onClick={submitReport} className={styles["popup-receive"]}>
              제출
            </button>
          </div>
        </div>
      </div>
    )}

    {isAlertOpen && (
      <div className={styles["alert-popup"]}>제출이 완료되었습니다.</div>
    )}

    {/* 자유게시판 내용(수정 가능 시) */}
    <div className={styles["content-input"]}>
      <textarea
        className={styles["textarea"]}
        value={content}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요."
      />
    </div>

    {/* 파일 업로드 */}
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      accept="image/*"
      onChange={handleFileChange}
    />

    {/* 좋아요 하트 */}
    <div className={styles["heart"]}>
      <img
        src={isHeartFilled ? filledHeart : heart}
        className={styles["app-heart"]}
        alt="heart"
        onClick={handleHeartClick}
      />
    </div>

    {/* 댓글 입력 */}
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

    {/* 댓글 목록 */}
    <div className={styles["comments-section"]}>
      {comments.map((comment, index) => (
        <div key={index} className={styles["comment-item"]}>
          {/* 서버에서 nickname 대신 userId로 넘길 수도 있음 */}
          <strong>{comment.nickname}:</strong> {comment.content}
          <div className={styles["reply-container"]}>
            <button
              className={styles["toggle-reply-button"]}
              onClick={() => handleToggleReply(index)}
            >
              {replyVisible[index] ? "대댓글 숨기기" : "대댓글 달기"}
            </button>
          </div>

          {replyVisible[index] && (
            <div className={styles["reply-input"]}>
              <textarea
                className={styles["textarea_reply"]}
                value={replyContents[index] || ""}
                onChange={(e) => handleReplyChange(index, e)}
                placeholder="대댓글을 입력하세요."
              />
              <button onClick={() => handleAddReply(index)}>대댓글 달기</button>
            </div>
          )}

          {/* 대댓글 목록 */}
          {comment.replies && comment.replies.length > 0 && (
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

export default NoticeBoard;
