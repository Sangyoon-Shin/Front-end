import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Chat.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import sendIcon from '../images/메시지전송버튼.png';
import heartIcon from '../images/하트횃불이.png';

import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기

import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함

const Chat = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageListRef = useRef(null);

    useEffect(() => {
        const dummyMessages = {
            1: [{ id: 1, text: '컴퓨터 과학 입문 수업에 오신 것을 환영합니다!', sender: 'Prof', time: '10:00' }],
            2: [{ id: 1, text: '웹 개발 기초 수업에 오신 것을 환영합니다!', sender: 'Prof', time: '10:00' }],
            3: [{ id: 1, text: '알고리즘 심화 수업에 오신 것을 환영합니다!', sender: 'Prof', time: '10:00' }],
        };
        setMessages(dummyMessages[classId] || []);
    }, [classId]);
// 반응형 페이지 처리를 위한 useMediaQuery 사용
const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages.length]);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: 'me',
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
            <div className={styles.container}>
              {/* 상단바 */}
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
              </header>
        
              <div className={styles.content}>
                <div className={`${styles.headerRow} ${isDesktop ? styles.desktopHeaderRow : styles.mobileHeaderRow}`}>
                  <img
                    src={CommunicationRoom_goBack}
                    alt="뒤로가기"
                    className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : styles.mobileGoBackButton}`}
                    onClick={() => navigate(-1)}
                  />
                  <h2 className={`${styles.sectionTitle} ${isDesktop ? styles.desktopSectionTitle : styles.mobileSectionTitle}`}>수업 소통방</h2>
                </div>
        
                <div className={`${styles.classInfo} ${isDesktop ? styles.desktopClassInfo : styles.mobileClassInfo}`}>
                  <span>데이터 베이스</span>
                  <span>인원 : ___</span>
                </div>
        
                <div className={styles.messageList} ref={messageListRef}>
                  {messages.map((msg) => (
                    <div key={msg.id} className={msg.sender === 'me' ? styles.sentMessage : styles.receivedMessage}>
                      <span className={styles.messageText}>{msg.text}</span>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                  ))}
                </div>
        
                <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : styles.mobileInputContainer}`}>
                  <img src={heartIcon} alt="Icon" className={`${styles.heartIcon} ${isDesktop ? styles.desktopHeartIcon : styles.mobileHeartIcon}`} />
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="입력하세요…"
                    className={`${styles.inputField} ${isDesktop ? styles.desktopInputField : styles.mobileInputField}`}
                  />
                  <button onClick={handleSendMessage} className={`${styles.sendButton} ${isDesktop ? styles.desktopSendButton : styles.mobileSendButton}`}>
                    <img src={sendIcon} alt="전송" className={styles.sendIcon} />
                  </button>
                </div>
              </div>
            </div>
          );
        
        
};

export default Chat;
