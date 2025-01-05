import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ClassChatRoom.module.css';
import Header from './_.js';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import sendIcon from '../images/메시지전송버튼.png';
import heartIcon from '../images/하트횃불이.png';

const ClassChatRoom = () => {
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
            <Header />
            <div className={styles.content}>
                <div className={styles.headerRow}>
                    <img
                        src={CommunicationRoom_goBack}
                        alt="뒤로가기"
                        className={styles.goBackButton}
                        onClick={() => navigate(-1)}
                    />
                    <h2 className={styles.sectionTitle}>수업 소통방</h2>
                </div>

                <div className={styles.classInfo}>
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

                <div className={styles.inputContainer}>
                    <img src={heartIcon} alt="Icon" className={styles.heartIcon} />
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="입력하세요…"
                        className={styles.inputField}
                    />
                    <button onClick={handleSendMessage} className={styles.sendButton}>
                        <img src={sendIcon} alt="전송" className={styles.sendIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassChatRoom;
