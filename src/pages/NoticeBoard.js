import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const NoticeBoard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [replyContents, setReplyContents] = useState([]); // 대댓글 내용을 위한 배열 추가
  const [nickname, setNickname] = useState('');
  const [nicknameCount, setNicknameCount] = useState({ int: 0, short: 0, double: 0, char: 0 });
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [replyVisible, setReplyVisible] = useState({}); // 대댓글 입력창 가시성을 위한 객체

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;

  useEffect(() => {
    if (!nickname) {
      const types = ['int', 'short', 'double', 'char'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setNickname(randomType);
    }
  }, [nickname]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleReplyChange = (index, e) => {
    const newReplyContents = [...replyContents];
    newReplyContents[index] = e.target.value; // 해당 인덱스의 대댓글 내용 업데이트
    setReplyContents(newReplyContents);
  };

  const handleAddComment = () => {
    if (commentContent.trim() !== '') {
      const newNicknameCount = { ...nicknameCount };
      newNicknameCount[nickname] += 1;
      setNicknameCount(newNicknameCount);

      // 댓글에 replies 배열 추가
      setComments([...comments, { nickname: `${nickname}${newNicknameCount[nickname]}`, content: commentContent, replies: [] }]);
      setReplyContents([...replyContents, '']); // 대댓글 배열에 빈 문자열 추가
      setCommentContent('');
    }
  };

  const handleAddReply = (index) => {
    if (replyContents[index].trim() !== '') {
      const updatedComments = [...comments];
      const newNicknameCount = { ...nicknameCount };
      newNicknameCount[nickname] += 1;
      setNicknameCount(newNicknameCount);

      updatedComments[index].replies.push({ nickname: `${nickname}${newNicknameCount[nickname]}`, content: replyContents[index] });
      setComments(updatedComments);

      const newReplyContents = [...replyContents];
      newReplyContents[index] = ''; // 대댓글 입력 후 해당 인덱스 초기화
      setReplyContents(newReplyContents);
      setReplyVisible((prev) => ({ ...prev, [index]: false })); // 대댓글 입력창 숨기기
    }
  };

  const handleToggleReply = (index) => {
    setReplyVisible((prev) => ({ ...prev, [index]: !prev[index] })); // 대댓글 입력창의 가시성 토글
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // 팝업 창 열기/닫기
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("선택된 파일:", file);
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
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
        <h2 className={styles["title-text2"]}>게시판</h2>

        <img src={bar} className={styles["app-bar"]} alt="bar" />

        <h2 className={styles["title-text3"]}>게시판 제목</h2>
        <img src={main_message} className={styles["app-main_message2"]} alt="main_message" />
        <img src={scrab} className={styles["app-main_message3"]} alt="main_message" />

        <h2 className={styles["title-text4"]}>작성일: {formattedDate}</h2>

        {/* 신고하기 버튼 */}
        <button onClick={togglePopup} className={styles["report-button"]}>
          신고하기
        </button>

        {/* 팝업 창 */}
        {isPopupOpen && (
          <div className={styles["popup"]}>
            <div className={styles["popup-inner"]}>
              <h3>신고하기</h3>
              <p>신고 내용을 입력하세요:</p>

              <textarea className={styles["popup-textarea"]} />

              {/* 버튼들을 감싸는 컨테이너 */}
              <div className={styles["popup-button-container"]}>
              <button onClick={togglePopup} className={styles["popup-close"]}>닫기</button>
                <button onClick={togglePopup} className={styles["popup-receive"]}>제출</button>
              </div>
            </div>
          </div>
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
          onChange={handleFileChange}
        />

        <img
          src={isHeartFilled ? filledHeart : heart}
          className={styles["app-heart"]}
          alt="heart"
          onClick={handleHeartClick}
        />

        <div className={styles["content-input2"]}>
          <textarea
            className={styles["textarea2"]}
            value={commentContent}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
          />
        </div>

        <button onClick={handleAddComment}>
          댓글 달기
        </button>

        <div className={styles["comments-section"]}>
          {comments.map((comment, index) => (
            <div key={index} className={styles["comment-item"]}>
              <strong>{comment.nickname}:</strong> {comment.content}

              {/* 대댓글 입력 UI */}
              <div className={styles["reply-container"]}>
                <button className={styles["toggle-reply-button"]} onClick={() => handleToggleReply(index)}>
                  {replyVisible[index] ? '대댓글 숨기기' : '대댓글 달기'}
                </button>
              </div>

              {/* 대댓글 입력창 */}
              {replyVisible[index] && (
                <div className={styles["reply-input"]}>
                  <textarea
                    className={styles["textarea_reply"]}
                    value={replyContents[index] || ''} // 해당 인덱스의 대댓글 내용
                    onChange={(e) => handleReplyChange(index, e)}
                    placeholder="대댓글을 입력하세요."
                  />
                  <button onClick={() => handleAddReply(index)}>대댓글 달기</button>
                </div>
              )}

              {/* 대댓글 표시 */}
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
      </header>
    </div>
  );
};

export default NoticeBoard;
