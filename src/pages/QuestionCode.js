import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js';  // 상단바 컴포넌트
import styles from './QuestionCode.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import PlusIcon from '../images/plusIcon.png'; // 이미지 첨부 플러스 아이콘

const QuestionCode = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('언어 선택');
    const [title, setTitle] = useState('');
    const [hashTag, setHashTag] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내부에서 호출

    // 반응형 처리를 위한 useMediaQuery 사용
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

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
                    <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>
                        코드 질문방
                    </h1>
                </div>

                {/* 폼 입력 부분 */}
                <div className={`${styles.form} ${isDesktop ? styles.desktopForm : ''}`}>
                    {/* 언어 선택 */}
                    <div className={`${styles.languageSelectionContainer} ${isDesktop ? styles.desktopLanguageSelectionContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>언어 선택</label>
                        <div className={`${styles.languageSelection} ${isDesktop ? styles.desktopLanguageSelection : ''}`}>
                            {['C/C++', 'C#', 'JAVA', 'Python', '기타'].map((language) => (
                                <button
                                    key={language}
                                    className={`${styles.languageButton} ${selectedLanguage === language ? styles.activeLanguageButton : ''}`}
                                    onClick={() => handleLanguageChange(language)}
                                >
                                    {language}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* 제목 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder=""
                            className={`${styles.inputField} ${isDesktop ? styles.desktopInputField : ''}`}
                        />
                    </div>

                    {/* 해시태그 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>해시태그</label>
                        <input
                            type="text"
                            value={hashTag}
                            onChange={(e) => setHashTag(e.target.value)}
                            placeholder="#해시태그"
                            className={`${styles.inputField} ${isDesktop ? styles.desktopInputField : ''}`}
                        />
                    </div>

                    {/* 이미지 첨부 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>이미지 첨부</label>
                        <div className={`${styles.imageUpload} ${isDesktop ? styles.desktopImageUpload : ''}`}>
                            <label htmlFor="imageUploadInput">
                                <img src={PlusIcon} alt="이미지 첨부" className={styles.plusIcon} />
                            </label>
                            <input
                                id="imageUploadInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.imageInput}
                            />
                        </div>
                    </div>

                    {/* 내용 입력 */}
                    <div className={`${styles.inputContainer} ${isDesktop ? styles.desktopInputContainer : ''}`}>
                        <label className={`${styles.languageSelectionLabel} ${isDesktop ? styles.desktopLanguageSelectionLabel : ''}`}>내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요..."
                            className={`${styles.textarea} ${isDesktop ? styles.desktopTextarea: ''}`}
                        />
                    </div>

                    {/* 게시글 올리기 버튼 */}
                    <button className={`${styles.submitButton} ${isDesktop ? styles.desktopSubmitButton: ''}`} onClick={handleSubmit}>
                        게시글 올리기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCode;
