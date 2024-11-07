import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Classroom.module.css";
import main_mascot from '../images/대학 심볼 횃불이.png';
import main_bell from '../images/bell.png';
import main_message from '../images/message.png';
import main_my from '../images/my.png';
import arrow from '../images/arrow.png';
import bar from '../images/bar.png';
import Header from './_.js';  // 상단바 컴포넌트

const Classroom = () => {
        const navigate = useNavigate();      
        const [content, setContent] = useState('');
        const [comments, setComments] = useState([]);
        const [commentContent, setCommentContent] = useState('');
        const [replyContents, setReplyContents] = useState([]);
        const [nickname, setNickname] = useState('');
        const [nicknameCount, setNicknameCount] = useState({ int: 0, short: 0, double: 0, char: 0 });
        const [isHeartFilled, setIsHeartFilled] = useState(false);
        const [isPopupOpen, setIsPopupOpen] = useState(false);
        const [replyVisible, setReplyVisible] = useState(''); // 신고 내용 저장
      
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}.${month}.${day}`;
        const [reportContent, setReportContent] = useState('');
        const [isAlertOpen, setIsAlertOpen] = useState(false);
        const handleBackClick = () => navigate(-1);

    return (
        <div className={styles.app}>
            <Header />
            <div class='app'>
        <img src={arrow} className={styles["app-arrow"]} alt="back_arrow" onClick={() => navigate(-1)} />
        <h1 className={styles["title-text2"]}>정보 게시판 - 빈 강의실</h1>

        <img src={bar} className={styles["app-bar"]} alt="bar" />

        <h1 className={styles["title-text3"]}>게시판 제목</h1>

        
      </div>

        </div>
    );
};

export default Classroom;