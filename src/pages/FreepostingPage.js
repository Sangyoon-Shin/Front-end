import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./FreepostingPage.module.css";
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
const BASE_URL = 'http://info-rmation.kro.kr/board';
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId'); // 이 부분이 사용자 ID를 가져옵니다.
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-USER-ID': userId, // 사용자 ID를 X-USER-ID로 추가
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 1
  };
};


const FreepostingPage = () => {
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
  const [replyVisible, setReplyVisible] = useState(''); // 신고 내용 저장
  const [title, setTitle] = useState('');
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;
  const [reportContent, setReportContent] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleBackClick = () => navigate(-1);
  const { id } = useParams();

  // 새로고침 시 로컬 스토리지에서 상태를 불러옵니다.
  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    const savedHeartStatus = localStorage.getItem('isHeartFilled');
    const savedNicknameCount = localStorage.getItem('nicknameCount');
    const savedReplyVisible = localStorage.getItem('replyVisible');

    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedHeartStatus) setIsHeartFilled(JSON.parse(savedHeartStatus));
    if (savedNicknameCount) setNicknameCount(JSON.parse(savedNicknameCount));
    if (savedReplyVisible) setReplyVisible(JSON.parse(savedReplyVisible));
  }, []);

  // 댓글 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // 좋아요 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem('isHeartFilled', JSON.stringify(isHeartFilled));
  }, [isHeartFilled]);

  // 닉네임 카운트가 변경될 때마다 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem('nicknameCount', JSON.stringify(nicknameCount));
  }, [nicknameCount]);

  // 대댓글 입력창 가시성 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem('replyVisible', JSON.stringify(replyVisible));
  }, [replyVisible]);

  useEffect(() => {
    if (!nickname) {
      const types = ['int', 'short', 'double', 'char'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setNickname(randomType);
    }
  }, [nickname]);

  useEffect(() => {
    const fetchHeartStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/like-status`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          const data = await response.json();
          setIsHeartFilled(data.liked); // 서버로부터 불러온 좋아요 상태 반영
        } else {
          console.error('좋아요 상태 불러오기에 실패했습니다.');
        }
      } catch (error) {
        console.error('좋아요 상태 불러오는 중 오류 발생:', error);
      }
    };

    fetchHeartStatus();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/free/comments`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments); // 서버에서 가져온 댓글을 상태로 설정
        } else {
          console.error('댓글 불러오기에 실패했습니다.');
        }
      } catch (error) {
        console.error('댓글 불러오는 중 오류 발생:', error);
      }
    };

    fetchComments();
    const getBoard = async () => {
      const accessToken = localStorage.getItem('accessToken');
      console.log(id);
      fetch(`http://info-rmation.kro.kr/api/board/free/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': 1
        }
      }).then((res) => {
          return res.json();
      }).then((data) => {
        console.log(data);
          setContent(data.freeContents);
          setTitle(data.freeTitle);
      });
    }
    getBoard();
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleReplyChange = (index, e) => {
    const newReplyContents = [...replyContents];
    newReplyContents[index] = e.target.value;
    setReplyContents(newReplyContents);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("선택된 파일:", file);
      // Process the file here, for example, upload it to the server or preview it
    }
  };


  
  const handleAddComment = async () => {
    if (commentContent.trim() !== '') {
      const newNicknameCount = { ...nicknameCount };
      newNicknameCount[nickname] += 1;
      setNicknameCount(newNicknameCount);

      const newComment = {
        nickname: `${nickname}${newNicknameCount[nickname]}`,
        content: commentContent,
        replies: [],
      };

      try {
        const response = await fetch(`${BASE_URL}/free/comments`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newComment),
        });

        if (response.ok) {
          const savedComment = await response.json(); // 서버에서 저장된 댓글 데이터 반환
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
        const response = await fetch(`${BASE_URL}/free/comments/${index}/replies`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newReply),
        });

        if (response.ok) {
          const savedReply = await response.json(); // 서버에서 저장된 대댓글 데이터 반환
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
    const newHeartStatus = !isHeartFilled;
    setIsHeartFilled(newHeartStatus);

    try {
      const response = await fetch(`${BASE_URL}/free/like`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isHeartFilled: newHeartStatus }),
      });

      if (!response.ok) {
        console.error('좋아요 요청에 실패했습니다.');
        setIsHeartFilled(!newHeartStatus); // 요청 실패 시 상태 되돌림
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류 발생:', error);
      setIsHeartFilled(!newHeartStatus); // 오류 발생 시 상태 되돌림
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const submitReport = async () => {
    try {
      const response = await fetch(`${BASE_URL}/free/report`, {
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

export default FreepostingPage;
