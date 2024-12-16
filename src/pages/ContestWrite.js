import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js';  // 상단바 컴포넌트
import styles from './ContestWrite.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import PlusIcon from '../images/plusIcon.png'; // 이미지 첨부 플러스 아이콘

const ContestWrite = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('언어 선택');
    const [title, setTitle] = useState('');
    const [hashTag, setHashTag] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내부에서 호출

    // 반응형 처리를 위한 useMediaQuery 사용
    const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // 게시글 업로드 처리 로직 작성
        alert('게시글이 업로드되었습니다.');
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
                    {/* 왼쪽 나가기 버튼 */}
                    <img
                        src={CommunicationRoom_goBack}
                        className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : ''}`}
                        alt="뒤로가기"
                        onClick={() => navigate(-1)}  /* 뒤로 가기 동작 추가 */
                    />
                    {/* 페이지 타이틀 */}
                    <p className={styles.subtitle}>정보 게시판 - 대회</p>
                    <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>
                        게시글 작성
                    </h1>
                </div>

                {/* 폼 입력 부분 */}
                <div className={styles.form}>

                    {/* 제목 입력 */}
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder=""
                            className={styles.inputField}
                        />
                    </div>
                    
                    {/* 제목 입력 */}
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>모집기간</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder=""
                            className={styles.inputField}
                        />
                    </div>

                    {/* 해시태그 입력 */}
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>해시태그</label>
                        <input
                            type="text"
                            value={hashTag}
                            onChange={(e) => setHashTag(e.target.value)}
                            placeholder="#해시태그"
                            className={styles.inputField}
                        />
                    </div>

                    {/* 내용 입력 */}
                    <div className={styles.inputContainer}>
                        <label className={styles.inputLabel}>내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="<가이드라인>
                            오류 부분, 궁금한 점을 표시하고 상세히 적어주세요!"
                            className={styles.textarea}
                        />
                    </div>

                    {/* 게시글 올리기 버튼 */}
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        게시글 올리기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContestWrite;
