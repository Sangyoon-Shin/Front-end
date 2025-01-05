import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Scrap.module.css';
import Header from './_.js'; // 상단바 컴포넌트
import arrow from '../images/arrow.png';
import bar from '../images/bar.png';
import IconScrap from '../images/횃불이스크랩.png';
import IconUnscrap from '../images/횃불이스크랩X.png';

const Scrap = () => {
    const [posts, setPosts] = useState([]); // 게시물 데이터를 관리
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 메시지 관리
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState('대회정보'); // 현재 선택된 상위 탭
    const [selectedSubTab, setSelectedSubTab] = useState('부트캠프'); // 자기개발방 하위 탭

    // 엔드포인트 매핑
    const endpoints = {
        '대회정보': '/api/board/scraps/competition',
        '코드 질문방': '/api/board/scraps/coding',
        '자기 개발방': '/api/board/scraps/study',
        '자유 게시판': '/api/board/scraps/free',
    };

    // 헤더에 토큰 추가를 위한 준비
    const getHeaders = () => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId'); // 이 부분이 사용자 ID를 가져옵니다.
        return {
          Authorization: `Bearer ${accessToken}`,
          'X-USER-ID': userId, // 사용자 ID를 X-USER-ID로 추가
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 1,
        };
      };

    // 게시물 데이터 가져오기
    const fetchPosts = async (tab, subTab, options = {}) => {
        let url = '/api/board/scraps';
      
        // Main tab별 엔드포인트 처리
        if (tab === '대회 정보') {
          url = '/api/board/scraps/contest';
        } else if (tab === '코드 질문방') {
          url = '/api/board/scraps/quest';
        } else if (tab === '자유 게시판') {
          url = '/api/board/scraps/free';
        } else if (tab === '자기 개발방') {
          const studyIDMap = {
            '부트캠프': 'bootcamp',
            '스터디': 'study',
            '산업 연계': 'industry',
          };
          const studyId = studyIDMap[subTab];
      
          if (studyId) {
            url = `/api/board/scraps/study?studyId=${studyId}`;
          } else {
            console.error('잘못된 자기개발방 하위 탭입니다.');
            return;
          }
        }
      
        // Optional query parameters 처리
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit);
        if (options.lastId) params.append('lastId', options.lastId);
      
        const finalUrl = params.toString() ? `${url}&${params.toString()}` : url;
      
        try {
          const response = await fetch(finalUrl, {
            method: 'GET',
          });
      
          if (!response.ok) {
            throw new Error('API 요청 실패');
          }
      
          const result = await response.json();
      
          // 데이터 처리
          if (tab === '자기 개발방' && result.studies) {
            console.log('자기개발방 스크랩 데이터:', result.studies);
            return result.studies;
          } else if (result.data) {
            console.log('스크랩 데이터:', result.data);
            return result.data;
          } else {
            console.warn('데이터를 찾을 수 없습니다.');
            return [];
          }
        } catch (error) {
          console.error('API 요청 에러:', error);
          return [];
        }
      };
      

    // 초기 데이터 가져오기
    useEffect(() => {
        if (selectedTab === '자기 개발방') {
            fetchPosts(selectedTab, selectedSubTab);
        } else {
            fetchPosts(selectedTab);
        }
    }, [selectedTab, selectedSubTab]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handleSubTabChange = (subTab) => {
        setSelectedSubTab(subTab);
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const toggleScrap = async (id, scrapped) => {
        try {
            const response = await fetch(`/api/board/scraps/${selectedTab}/${id}`, {
                method: 'PATCH',
                headers: getHeaders(),
                body: JSON.stringify({ scrapped: !scrapped }),
            });

            if (!response.ok) {
                throw new Error('스크랩 상태를 업데이트하는 데 실패했습니다.');
            }

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === id ? { ...post, scrapped: !scrapped } : post
                )
            );
        } catch (err) {
            console.error(err.message);
            alert('스크랩 상태 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류 발생: {error}</div>;
    }

    const mainTabs = ['대회정보', '코드 질문방', '자기 개발방', '자유 게시판'];
    const subTabs = ['부트캠프', '스터디', '산업 연계'];

    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.appHeader}>
                <img src={arrow} className={styles['app-arrow']} alt="back_arrow" onClick={() => navigate(-1)} />
                <h1 className={styles['title-text2']}>스크랩</h1>
                <img src={bar} className={styles['app-bar']} alt="bar" />
            </div>

            <div className={styles.classroomContainer}>
                {/* 상위 탭 */}
                <div className={styles.floorNav}>
                    {mainTabs.map((tab) => (
                        <span
                            key={tab}
                            className={`${styles.floor} ${selectedTab === tab ? styles.activeFloor : ''}`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </span>
                    ))}
                </div>

                {/* "자기개발방" 하위 탭 */}
                {selectedTab === '자기 개발방' && (
                    <div className={styles.subTabNav}>
                        {subTabs.map((subTab) => (
                            <span
                                key={subTab}
                                className={`${styles.subTab} ${selectedSubTab === subTab ? styles.activeSubTab : ''}`}
                                onClick={() => handleSubTabChange(subTab)}
                            >
                                {subTab}
                            </span>
                        ))}
                    </div>
                )}

                {/* 게시물 목록 */}
                <div className={styles.postList}>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.postItem}>
                            <div className={styles.postInfo}>
                                <span
                                    className={styles.postTitle}
                                    onClick={() => handlePostClick(post.id)}
                                >
                                    {selectedTab === '자기 개발방'
                                        ? post.studyTitle
                                        : selectedTab === '자유 게시판'
                                        ? post.freeTitle
                                        : post.questTitle}
                                </span>
                                <span className={styles.postDate}>
                                    {new Date(
                                        selectedTab === '자기 개발방'
                                            ? post.startTime
                                            : selectedTab === '자유 게시판'
                                            ? post.freeCreatedTime
                                            : post.questCreatedTime
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <img
                                src={post.scrap ? IconScrap : IconUnscrap}
                                alt={post.scrap ? '스크랩됨' : '스크랩안됨'}
                                className={styles.scrapIcon}
                                onClick={() => toggleScrap(post.id, post.scrap)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Scrap;
