import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ChatRoom.module.css';
import Header from './_.js'; // 상단바 컴포넌트
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import sendIcon from '../images/메시지전송버튼.png'; // 메시지 전송 아이콘 이미지
import heartIcon from '../images/하트횃불이.png';

const ChatRoom = () => {
    const { id } = useParams(); // URL에서 동적 방 ID를 가져옵니다.
    const navigate = useNavigate(); // 뒤로가기 버튼 동작을 위해 사용
    const [roomData, setRoomData] = useState(null);
    const [messages, setMessages] = useState([]); // 채팅 메시지 목록 상태 관리
    const [inputMessage, setInputMessage] = useState(''); // 입력한 메시지 상태 관리
    const messageListRef = useRef(null);

    useEffect(() => {
        
        // 하드코딩된 방 데이터 (나중에 백엔드와 연동할 때 교체)
        const dummyData = {
            1: { username: 'char1', lastMessage: '마지막 내용 1', title: '글 제목 1' },
            2: { username: 'char4', lastMessage: '마지막 내용 2', title: '글 제목 2' },
            3: { username: 'float2', lastMessage: '마지막 내용 3', title: '글 제목 3' },
            4: { username: 'int2', lastMessage: '마지막 내용 4', title: '글 제목 4' },
            5: { username: 'char3', lastMessage: '마지막 내용 5', title: '글 제목 5' },
        };

        // 방 ID에 해당하는 데이터 가져오기
        const currentRoomData = dummyData[id];
        setRoomData(currentRoomData);

        // 임시 채팅 메시지 초기값 설정 (하드코딩된 값)
        setMessages([
            { id: 1, text: '안녕하세요', sender: 'char1', time: '01:01', type: 'received' },
            { id: 2, text: '안녕하세요', sender: 'me', time: '01:01', type: 'sent' },
            { id: 3, text: '전 임베짱입니다 ㅋ', sender: 'char1', time: '01:01', type: 'received' },
        ]);

        
         /* 백엔드 연동용 코드 (주석 해제하여 사용)*/
        /* const fetchRoomData = async () => {
            try {
                const response = await fetch(`https://your-backend-api.com/api/chatrooms/${id}`);
                if (!response.ok) {
                    throw new Error('방 정보를 불러오는데 실패했습니다.');
                }
                const data = await response.json();
                setRoomData(data);
            } catch (error) {
                console.error('방 정보를 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://your-backend-api.com/api/chatrooms/${id}/messages`);
                if (!response.ok) {
                    throw new Error('메시지 목록을 불러오는데 실패했습니다.');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('메시지 목록 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchRoomData();
        fetchMessages();
        */
    }, [id]); 
    

    useEffect(() => {
        // 새로운 메시지가 추가되면 스크롤을 가장 하단으로 이동
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    // 메시지 전송 핸들러
    const handleSendMessage = async () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                text: inputMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSentByMe: true,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage('');

            /* 백엔드 연동용 코드 (주석 해제하여 사용)*/
            try {
                const response = await fetch('https://your-backend-api.com/api/chatrooms/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        roomId: id,
                        text: inputMessage,
                    }),
                });

                if (!response.ok) {
                    throw new Error('메시지 전송에 실패했습니다.');
                }

                console.log('메시지가 성공적으로 전송되었습니다.');
            } catch (error) {
                console.error('메시지 전송 중 오류가 발생했습니다:', error);
                alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
            }
            
        }
    };

    // 엔터키로 메시지 전송하는 핸들러
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (!roomData) {
        return <div>Loading...</div>; // 데이터가 없을 때 로딩 상태 표시
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>쪽지</h2>
                <div className={styles.headerRow}>
                    {/* 왼쪽 나가기 버튼 */}
                    <img
                        src={CommunicationRoom_goBack}
                        className={styles.goBackButton}
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}
                    />
                    {/* 사용자 이름 및 글 제목 */}
                    <div className={styles.roomHeaderInfo}>
                        <span className={styles.roomUsername}>{roomData.username}</span>
                        <span className={styles.separator}>|</span>
                        <span className={styles.roomTitle}>{roomData.title}</span>
                    </div>
                </div>

                {/* 기존 메시지 스타일 유지 */}
                <div className={styles.messageList} ref={messageListRef}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${message.isSentByMe ? styles.sentMessage : styles.receivedMessage}`}
                        >
                            <span className={styles.messageText}>{message.text}</span>
                            <span className={styles.messageTime}>{message.time}</span>
                        </div>
                    ))}
                </div>

                {/* 채팅 입력창 - 화면 하단 고정 */}
                <div className={styles.inputContainer}>
                    <img src={heartIcon} alt="Icon" className={styles.heartIcon} />
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown} // 엔터키로 메시지 전송
                        placeholder="입력하세요..."
                        className={styles.inputField}
                    />
                    <button className={styles.sendButton} onClick={handleSendMessage}>
                        <img src={sendIcon} alt="전송" className={styles.sendIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;