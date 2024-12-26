import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './My_board.module.css';
import Header from './_.js'; // 상단바 컴포넌트
import arrow from '../images/arrow.png';
import bar from '../images/bar.png';
import menuIcon from '../images/메뉴버튼.png';

const My_board = () => {

    const navigate = useNavigate();
    const [visibleMessages, setVisibleMessages] = useState(4); // 처음에는 4개의 메시지만 표시
    const [messages, setMessages] = useState([]); // 메시지 목록 상태 관리 

    // 방 클릭 시 해당 채팅방으로 이동하는 함수
    const handleRoomClick = (id) => {
        navigate(`/chatroom/${id}`); // 방 ID를 기반으로 동적 경로로 이동
    };

    // 백엔드에서 메시지 목록을 받아오는 함수
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://bcefb2d9d162.ngrok.app/api/mypage/my-posts', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjIwMjIwMTY1OSIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzM1MTk1MjU3LCJleHAiOjE3Mzg0MzUyNTd9.swBkh1kaXDEzW04G04llXKt-hB2B8c1XvuXpjuQbv3o', // 실제 토큰으로 변경
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // data.codings 배열에서 필요한 정보만 추출하여 상태에 저장
                    const extractedMessages = data.codings.map(item => ({
                        id: item.id,
                        userID: item.userID,
                        codingTitle: item.codingTitle,
                        codingCreatedTime: item.codingCreatedTime,
                    }));
                    setMessages(extractedMessages); // 필요한 데이터만 상태에 저장
                } else {
                    console.error('메시지 목록을 가져오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };

        fetchMessages();
    }, []);

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
        <div className={styles.app}>
            <Header />
            <div className={styles.appHeader}>
                <img src={arrow} className={styles['app-arrow']} alt="back_arrow" onClick={() => navigate(-1)} />
                <h1 className={styles['title-text2']}>작성 게시글</h1>
                <img src={bar} className={styles['app-bar']} alt="bar" />
            </div>
            <div className={styles.messageList}>
                {messages.slice(0, visibleMessages).map((message) => (
                    <div
                        key={message.id}
                        className={styles.messageItem}
                        onClick={() => handleRoomClick(message.id)} // 방 클릭 시 이동하도록 수정
                    >
                        <div className={styles.messageInfo}>
                            <div className={styles.headerInfo}>
                                <span className={styles.nickname}>{message.userID}</span>
                                <span className={styles.title}>{message.codingTitle || '제목 없음'}</span>
                            </div>
                            <span className={styles.Time}>{new Date(message.codingCreatedTime).toLocaleString()}</span>
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
    );
};

export default My_board;
