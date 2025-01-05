import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './G_.js';  // 상단바 컴포넌트
import styles from './FreeboardPage.module.css';  // BoardPage용 CSS 파일
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import DownMenu from '../images/아래방향메뉴선택.png';
import SearchIcon from '../images/돋보기아이콘.png';  // 돋보기 아이콘
import IconScrap from '../images/횃불이스크랩.png';
import IconUnscrap from '../images/횃불이스크랩X.png';

// API에서 사용할 기본 URL과 헤더 설정
const BASE_URL = 'https://your-backend-api.com/api/board';
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId'); // 이 부분이 사용자 ID를 가져옵니다.
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-USER-ID': userId, // 사용자 ID를 X-USER-ID로 추가
    'Content-Type': 'application/json',
  };
};


const G_freeboardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // 드롭다운 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [scrapStatus, setScrapStatus] = useState({}); // 각 게시물의 스크랩 상태 관리
  const [posts, setPosts] = useState([]); // 게시물 목록 상태 관리
  const [sortType, setSortType] = useState('latest'); // 초기 정렬 상태는 'latest'

  const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내부에서 호출

  // 반응형 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  // 게시물 목록을 백엔드에서 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/free`, {
          method: 'GET',
          headers: getAuthHeaders(), // 인증 헤더 추가
        });

        if (!response.ok) {
          throw new Error('게시물 목록을 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setPosts(data.content); // 게시물 목록 상태 업데이트
        const initialScrapStatus = {};
        data.content.forEach(post => {
          initialScrapStatus[post.id] = post.isScraped; // 스크랩 상태 초기화
        });
        setScrapStatus(initialScrapStatus); // 스크랩 상태 업데이트
      } catch (error) {
        console.error('게시물 목록 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // 드롭다운 토글
  };

  const handleBoardChange = (boardName) => {
    if (boardName === '질문 게시판') {
      navigate('/G_questionboardPage/'); // 질문 게시판으로 이동
    }
    setMenuOpen(false);  // 메뉴 닫기
  };

  const toggleScrap = async (id) => {
    // 백엔드에 스크랩 상태를 업데이트하는 요청 보내기
    try {
      const response = await fetch(`${BASE_URL}/free/scrap`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          postId: id,
          scrapStatus: !scrapStatus[id], // 새로운 스크랩 상태 전송
        }),
      });

      if (!response.ok) {
        throw new Error('스크랩 상태 업데이트에 실패했습니다.');
      }

      // 서버 응답이 성공적일 경우 상태 업데이트
      setScrapStatus((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));

      console.log('스크랩 상태가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('스크랩 상태 업데이트 중 오류가 발생했습니다:', error);
      alert('스크랩 상태 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 검색 입력값을 변경하는 함수
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 버튼을 클릭했을 때 호출되는 함수
  const handleSearch = async () => {
    console.log('검색 버튼 클릭됨');
    if (searchTerm.trim() !== '') {
      try {
        const response = await fetch(`${BASE_URL}/free/search?query=${encodeURIComponent(searchTerm)}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('검색 결과를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setPosts(data.content); // 검색 결과를 게시물 목록으로 업데이트
        alert('검색이 완료되었습니다. 결과가 화면에 표시됩니다.');
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류가 발생했습니다:', error);
        alert('검색 결과를 불러오는 중 오류가 발생했습니다.');
      }
    } else {
      alert('검색어를 입력해주세요.');
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);  // 해당 게시물 상세 페이지로 이동
  };

  // 정렬 버튼 클릭 시 정렬 상태 업데이트
  const handleSort = (type) => {
    setSortType(type);
    if (type === 'latest') {
      // 최신순으로 정렬
      setPosts((prevPosts) =>
        [...prevPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    } else if (type === 'recommend') {
      // 추천순으로 정렬 (좋아요 개수 기준)
      setPosts((prevPosts) =>
        [...prevPosts].sort((a, b) => b.likes - a.likes)
      );
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
          <img
            src={CommunicationRoom_goBack}
            className={`${styles.goBackButton} ${isDesktop ? styles.desktopGoBackButton : ''}`}
            alt="뒤로가기"
            onClick={() => navigate(-1)}  /* 뒤로 가기 동작 추가 */
          />
          <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>자유 게시판</h1>
          <img
            src={DownMenu}
            className={`${styles.downMenuButton} ${isDesktop ? styles.desktopDownMenuButton : ''}`}
            alt="게시판 선택"
            onClick={toggleMenu}
          />
        </div>

        {menuOpen && (
          <div className={`${styles.dropdownMenu} ${isDesktop ? styles.desktopDropdownMenu : ''}`}>
            <div
              className={`${styles.menuItem} ${isDesktop ? styles.desktopMenuItem : ''}`}
              onClick={() => handleBoardChange('질문 게시판')}
            >
              질문 게시판
            </div>
          </div>
        )}

        <div className={`${styles.controlPanel} ${isDesktop ? styles.desktopControlPanel : ''}`}>
          <button
            className={`${styles.writeButton} ${isDesktop ? styles.desktopWriteButton : ''}`}
            onClick={() => navigate('/G_freewritePage')} // 글쓰기 페이지로 이동
          >
            글쓰기
          </button>

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
              onClick={handleSearch}
            />
          </div>

          <div className={`${styles.sortButtons} ${isDesktop ? styles.desktopSortButtons : ''}`}>
            <button
              className={`${styles.sortButton} ${styles.latestSortButton} ${isDesktop ? styles.desktopLatestSortButton : ''}`}
              onClick={() => handleSort('latest')}
            >
              최신순
            </button>
            <button
              className={`${styles.sortButton} ${styles.recommendSortButton} ${isDesktop ? styles.desktopRecommendSortButton : ''}`}
              onClick={() => handleSort('recommend')}
            >
              추천순
            </button>
          </div>
        </div>

        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              {post.id <= 3 && <span className={styles.hotTag}>HOT</span>}
              <div className={styles.postInfo}>
                <span
                  className={styles.postTitle}
                  onClick={() => handlePostClick(post.id)}
                >
                  {post.freeTitle}
                </span>
                <span className={styles.postDate}>{post.freeCreatedTime.slice(0, 10)}</span>
              </div>
              <img
                src={scrapStatus[post.id] ? IconScrap : IconUnscrap}
                alt={scrapStatus[post.id] ? '스크랩됨' : '스크랩안됨'}
                className={styles.scrapIcon}
                onClick={() => toggleScrap(post.id)}
              />
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {[1, 2, 3, 4, 5].map((pageNumber) => (
            <button
              key={pageNumber}
              className={styles.pageButton}
              onClick={() => navigate(`/board/page/${pageNumber}`)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default G_freeboardPage;
