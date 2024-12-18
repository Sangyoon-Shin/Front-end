import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js';  // 상단바 컴포넌트
import styles from './InformationContest.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import SearchIcon from '../images/돋보기아이콘.png';  // 돋보기 아이콘
import IconScrap from '../images/횃불이스크랩.png';
import IconUnscrap from '../images/횃불이스크랩X.png';
  
const InformationContest = () => {
  const [posts, setPosts] = useState([]); // 게시물 목록 상태 관리
  const [scrapStatus, setScrapStatus] = useState({}); // 각 게시물의 스크랩 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [sortType, setSortType] = useState('latest'); // 초기 정렬 상태는 'latest'
  const navigate = useNavigate();  // 페이지 이동을 위한 navigate 훅 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' }); // 반응형 페이지 처리를 위한 미디어쿼리

  // 게시물 목록 조회 - 백엔드 연동
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/board/competition?page=0&size=10');
        if (!response.ok) {
          throw new Error('게시물 목록을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setPosts(data.content); // 게시물 목록 상태 업데이트
      } catch (error) {
        console.error('게시물 목록 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchPosts();
  }, []);

  const toggleScrap = async (id) => {
    // 스크랩 상태 토글 - 백엔드 연동
    try {
      const response = await fetch(`/api/board/competition/${id}/scrap`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('스크랩 상태 업데이트에 실패했습니다.');
      }

      setScrapStatus((prevState) => ({
        ...prevState,
        [id]: !prevState[id]
      }));
    } catch (error) {
      console.error('스크랩 상태 업데이트 중 오류가 발생했습니다:', error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/competition/${postId}`);  // 해당 게시물 상세 페이지로 이동
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        const response = await fetch(`/api/board/competition?searchKeyword=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('검색 결과를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setPosts(data.content); // 검색 결과로 게시물 목록 업데이트
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류가 발생했습니다:', error);
      }
    } else {
      alert('검색어를 입력해주세요.');
    }
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
          <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>대회 정보</h1>
        </div>

        {/* 컨트롤 패널 (글쓰기 버튼, 검색창, 정렬 버튼) */}
        <div className={`${styles.controlPanel} ${isDesktop ? styles.desktopControlPanel : ''}`}>
          {/* 글쓰기 버튼 */}
          <button
            className={`${styles.writeButton} ${isDesktop ? styles.desktopWriteButton : ''}`}
            onClick={() => navigate('/ContestWrite')} // 글쓰기 페이지로 이동
          >
            글쓰기
          </button>

          {/* 검색창 */}
          <div className={`${styles.searchBar} ${isDesktop ? styles.desktopSearchBar : ''}`}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className={`${styles.searchInput} ${isDesktop ? styles.desktopSearchInput : ''}`}
              placeholder="검색어 입력"
            />
            <img
              src={SearchIcon}
              className={`${styles.searchIcon} ${isDesktop ? styles.desktopSearchIcon : ''}`}
              alt="검색"
              onClick={handleSearch} // 돋보기 아이콘 클릭 시 검색
            />
          </div>

          {/* 정렬 버튼들 */}
          <div className={`${styles.sortButtons} ${isDesktop ? styles.desktopSortButtons : ''}`}>
            <button
              className={`${styles.sortButton} ${styles.latestSortButton} ${isDesktop ? styles.desktopLatestSortButton : ''}`}
              onClick={() => setSortType('latest')}
            >
              최신순
            </button>
            <button
              className={`${styles.sortButton} ${styles.recommendSortButton} ${isDesktop ? styles.desktopRecommendSortButton : ''}`}
              onClick={() => setSortType('recommend')}
            >
              추천순
            </button>
          </div>
        </div>

        {/* 게시물 목록 */}
        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postInfo}>
                <span
                  className={styles.postTitle}
                  onClick={() => handlePostClick(post.id)} // 게시물 제목 클릭 시 상세 페이지로 이동
                >
                  {post.competitionTitle}
                </span>
                <span className={styles.postDate}>{new Date(post.createdTime).toLocaleDateString()}</span>
              </div>
              {/* 스크랩 버튼 */}
              <img
                src={scrapStatus[post.id] ? IconScrap : IconUnscrap}
                alt={scrapStatus[post.id] ? '스크랩됨' : '스크랩안됨'}
                className={styles.scrapIcon}
                onClick={() => toggleScrap(post.id)}  // 스크랩 상태 변경 및 백엔드 전송
              />
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          {[1, 2, 3, 4, 5].map((pageNumber) => (
            <button
              key={pageNumber}
              className={styles.pageButton}
              onClick={() => navigate(`/informationcode/page/${pageNumber}`)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationContest;
