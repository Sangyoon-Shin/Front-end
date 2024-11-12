import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js';  // 상단바 컴포넌트
import styles from './Message.module.css';
import menuIcon from '../images/메뉴버튼.png';

const Message = () => {
    // 하드코딩된 방 목록 (백엔드 연동 시 주석 처리)
    
    const [messages, setMessages] = useState([
        { id: 1, username: 'char1', title: '글 제목 1', lastMessage: '마지막 내용 1' },
        { id: 2, username: 'char4', title: '글 제목 2', lastMessage: '마지막 내용 2' },
        { id: 3, username: 'float2', title: '글 제목 3', lastMessage: '마지막 내용 3' },
        { id: 4, username: 'int2', title: '글 제목 4', lastMessage: '마지막 내용 4' },
        { id: 5, username: 'char3', title: '글 제목 5', lastMessage: '마지막 내용 5' },
    ]); // 하드코딩된 메시지 목록
    
    
    // 백엔드와 연동할 때 사용할 초기 상태
    /* const [messages, setMessages] = useState([]); // 메시지 목록 상태 관리 */
    const [visibleMessages, setVisibleMessages] = useState(4); // 처음에는 4개의 메시지만 표시
    const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
    const navigate = useNavigate();

    /*
     // 백엔드와 연동할 때 사용할 코드
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://your-backend-api.com/api/messages');
                if (!response.ok) {
                    throw new Error('메시지 목록을 불러오는데 실패했습니다.');
                }
                const data = await response.json();
                setMessages(data); // 메시지 목록 상태 업데이트
            } catch (error) {
                console.error('메시지 목록 불러오는 중 오류가 발생했습니다:', error);
            }
        };
        fetchMessages();
    }, []); */

    // 방 클릭 시 해당 채팅방으로 이동하는 함수
    const handleRoomClick = (id) => {
        navigate(`/chatroom/${id}`); // 방 ID를 기반으로 동적 경로로 이동
    };

    // 더보기 버튼 클릭 시 화면에 보이는 메시지 수를 증가시키는 함수
    const handleLoadMore = () => {
        setVisibleMessages((prevVisibleMessages) => prevVisibleMessages + 4);
    };

    // 메뉴 버튼 클릭 시 삭제 메뉴 표시
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);

    const toggleMenu = (id) => {
        setMenuOpenId(menuOpenId === id ? null : id);
    };

    // 삭제 확인 모달 열기
    const handleDeleteClick = (id, event) => {
        event.stopPropagation(); // 삭제하기 버튼 클릭 시 이벤트 전파 방지
        setSelectedMessageId(id);
        setShowDeleteModal(true);
    };

    // 삭제 확인 모달에서 삭제 버튼 클릭 시
    const handleConfirmDelete = () => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== selectedMessageId));
        setShowDeleteModal(false);
        setSelectedMessageId(null);
    };

    // 삭제 확인 모달에서 취소 버튼 클릭 시
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedMessageId(null);
    };

    return (
        <div className={`${styles.container} ${isDesktop ? styles.desktopContainer : ''}`}>
            <Header />
            <div className={`${styles.content} ${isDesktop ? styles.desktopContent : ''}`}>
                <h2 className={styles.sectionTitle}>쪽지</h2>
                <div className={styles.messageList}>
                    {messages.slice(0, visibleMessages).map((message) => (
                        <div
                            key={message.id}
                            className={styles.messageItem}
                            onClick={() => handleRoomClick(message.id)} // 방 클릭 시 이동하도록 수정
                        >
                            <div className={styles.messageInfo}>
                                <div className={styles.headerInfo}>
                                    <span className={styles.nickname}>{message.username}</span>
                                    <span className={styles.title}>{message.title}</span>
                                </div>
                                <span className={styles.lastMessage}>{message.lastMessage}</span>
                            </div>
                            <img
                                src={menuIcon}
                                className={styles.menuIcon}
                                alt="메뉴"
                                onClick={(e) => {
                                    e.stopPropagation(); // 메뉴 클릭 시 방 클릭 이벤트 무시
                                    toggleMenu(message.id);
                                }}
                            />
                            {menuOpenId === message.id && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={(e) => handleDeleteClick(message.id, e)} // 삭제하기 클릭 시 이벤트 전파 방지
                                    >
                                        삭제하기
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {visibleMessages < messages.length && (
                    <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                        더보기
                    </button>
                )}

                {/* 삭제 확인 모달 */}
                {showDeleteModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <p>삭제하시겠습니까?</p>
                            <div className={styles.modalButtons}>
                                <button className={styles.cancelButton} onClick={handleCancelDelete}>
                                    취소
                                </button>
                                <button className={styles.deleteConfirmButton} onClick={handleConfirmDelete}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;

