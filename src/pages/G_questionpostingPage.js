import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
// API에서 사용할 기본 URL과 헤더 설정

const BASE_URL = 'http://info-rmation.kro.kr/api/board';
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId'); // 이 부분이 사용자 ID를 가져옵니다.
  console.log(localStorage.getItem('userId'));

  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-USER-ID': userId, // 사용자 ID를 X-USER-ID로 추가
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 1
  };
};

const G_questionpostingPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]); // 기본값을 빈 배열로
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

  const organizeComments = (data) => {
    const commentMap = {};
  
    // 댓글 데이터를 Map으로 정리
    data.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });
  
    // 댓글과 대댓글 연결
    const structuredComments = [];
    data.forEach((comment) => {
      if (comment.parentCommentId === null) {
        // 최상위 댓글
        structuredComments.push(commentMap[comment.id]);
      } else {
        // 대댓글
        const parent = commentMap[comment.parentCommentId];
        if (parent) {
          parent.replies.push(commentMap[comment.id]);
        }
      }
    });
  
    return structuredComments;
  };
  

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
        const response = await fetch(`${BASE_URL}/free/${id}/like-status`, {
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
  }, [id]);  

  useEffect(() => { // 댓글 불러오기
    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/free/${id}/comments`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('댓글 API 응답 데이터:', data);
  
          if (data && Array.isArray(data.content)) {
            const structuredData = organizeComments(data.content);
            setComments(structuredData);
          } else {
            console.error('댓글 데이터 형식이 올바르지 않습니다.', data);
            setComments([]);
          }
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
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setContent(data.freeContents);
          setTitle(data.freeTitle);
        });
    };
    getBoard();
  }, [id]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleReplyChange = (index, e) => {
    const newReplyContents = [...replyContents];
    newReplyContents[index] = e.target.value; // 현재 입력값 저장
    setReplyContents(newReplyContents); // 상태 업데이트
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("선택된 파일:", file);
      // 파일 업로드 혹은 미리보기 로직 처리
    }
  };

  // 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (commentContent.trim() !== '') {
      const newNicknameCount = { ...nicknameCount };
      newNicknameCount[nickname] += 1;
      setNicknameCount(newNicknameCount);
  
      // 랜덤으로 anonymousId 값 설정
      let anonymousId = localStorage.getItem('anonymousId');
      
      if (!anonymousId) {
        // 'char', 'int', 'short', 'double' 중 하나를 랜덤으로 선택
        const idOptions = ['char', 'int', 'short', 'double'];
        anonymousId = idOptions[Math.floor(Math.random() * idOptions.length)];
  
        // 선택된 anonymousId를 localStorage에 저장하여 고정
        localStorage.setItem('anonymousId', anonymousId);
      }
  
      const newComment = {
        nickname: `${nickname}${newNicknameCount[nickname]}`,
        content: commentContent,  // 댓글 내용 추가
        replies: [],
      };
  
      try {
        const response = await fetch(`${BASE_URL}/free/${id}/comments/add?content=${encodeURIComponent(commentContent)}&anonymousId=${encodeURIComponent(anonymousId)}`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(newComment), // 댓글 내용은 본문에 포함
        });
  
        if (response.ok) {
          const savedComment = await response.json();  // 서버에서 저장된 댓글 데이터 반환
          
          // savedComment에 nickname 정보가 없으면 newComment에서 가져와 병합
          const mergedComment = { ...savedComment, nickname: newComment.nickname };
  
          // 댓글 목록에 추가
          setComments((prevComments) => [...prevComments, mergedComment]);  // 상태 업데이트
          setNicknameCount((prev) => ({ ...prev, [nickname]: prev[nickname] }));
          setCommentContent('');  // 입력 필드 초기화
        } else {
          console.error('댓글 추가에 실패했습니다.');
        }
      } catch (error) {
        console.error('댓글 추가 중 오류 발생:', error);
      }
    }
  };

  // 대댓글 추가 핸들러
  const handleAddReply = async (index) => {
    const replyContent = replyContents[index]; // 현재 입력된 대댓글 내용 가져오기
  
    if (!replyContent || replyContent.trim().length === 0) {
      alert("대댓글 내용을 입력하세요."); // 빈값 입력 방지
      return;
    }
  
    const newReply = {
      content: replyContent.trim(),
      parentCommentId: comments[index]?.id, // 상위 댓글의 ID
      targetType: "free",
      targetId: id, // 게시물 ID
    };
  
    console.log("전송 데이터:", newReply); // 디버깅용 로그
  
    try {
      const response = await fetch(`${BASE_URL}/free/${id}/comments/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newReply),
      });
  
      if (response.ok) {
        const savedReply = await response.json();
        console.log("저장된 대댓글:", savedReply);
  
        // 상태 업데이트
        setComments((prevComments) =>
          prevComments.map((comment, commentIndex) =>
            commentIndex === index
              ? { ...comment, replies: [...(comment.replies || []), savedReply] }
              : comment
          )
        );
  
        // 입력 필드 초기화
        const newReplyContents = [...replyContents];
        newReplyContents[index] = ""; // 초기화
        setReplyContents(newReplyContents);
      } else {
        console.log('댓글 목록:', comments);
        console.log('댓글 id 확인:', comments[index]?.id); // 부모 댓글 ID 확인
        console.log("전송 데이터:", newReply); // 디버깅용 로그

        console.error("대댓글 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("대댓글 추가 중 오류 발생:", error);
    }
  };
  

  const handleToggleReply = (index) => {
    setReplyVisible((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleHeartClick = async () => {
    const newHeartStatus = !isHeartFilled;
    setIsHeartFilled(newHeartStatus);

    try {
      const response = await fetch(`${BASE_URL}/free/${id}/like`, {
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
      console.log(`${BASE_URL}/free/${id}/like`);
      setIsHeartFilled(!newHeartStatus); // 오류 발생 시 상태 되돌림
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const getCurrentUserId = () => {
    return localStorage.getItem('userId') || 'unknownUser'; // 예: 기본값으로 'unknownUser' 반환
  };


  const submitReport = async () => {
    try {
      const reason = reportContent; // 신고 내용
      const reporterId = getCurrentUserId(); // 신고자 ID

      // URL에 파라미터로 reason과 reporterId 추가
      const url = `${BASE_URL}/free/${id}/report?reason=${encodeURIComponent(reason)}&reporterId=${encodeURIComponent(reporterId)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(), // 필요한 헤더 추가
      });

      if (response.ok) {
        setReportContent(''); // 신고 내용 초기화
        togglePopup(); // 팝업 닫기
        setIsAlertOpen(true); // 성공 알림 표시

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
              onChange={(e) => {
                setReportContent(e.target.value);
              }}
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
          disabled
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
        {
          // comments가 undefined인 경우를 대비해 안전하게 처리
          (comments || []).map((comment, index) => (
            <div key={index} className={styles["comment-item"]}>
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
                <div className={styles["textarea-container"]}>
                  <textarea
                    className={styles["textarea_reply"]}
                    value={replyContents[index] || ""}
                    onChange={(e) => handleReplyChange(index, e)}
                    placeholder="대댓글을 입력하세요."
                  />
                </div>
                <div className={styles["button-container"]}>
                  <button onClick={() => handleAddReply(index)}>대댓글 달기</button>
                </div>
              </div>
              )}

              {/* 대댓글 목록도 안전하게 접근 (옵셔널 체이닝) */}
              {comment.replies?.length > 0 && (
                <div className={styles["replies-section"]}>
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className={styles["reply-item"]}>
                      <strong>{reply.nickname}:</strong> {reply.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default G_questionpostingPage;
