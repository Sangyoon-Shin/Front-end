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
const BASE_URL = 'http://<your-domain>/api/board';
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');  // accessToken을 로컬스토리지에서 가져옴
  const userId = localStorage.getItem('userId');  // 저장된 userId 가져오기
  return {
    'Authorization': `Bearer ${accessToken}`,
    'X-USER-ID': userId,
    'Content-Type': 'application/json',
  };
};

const G_questionboardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // 드롭다운 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [scrapStatus, setScrapStatus] = useState({}); // 각 게시물의 스크랩 상태 관리
  const [posts, setPosts] = useState([]); // 게시물 목록 상태 관리
  const [sortType, setSortType] = useState('latest'); // 초기 정렬 상태는 'latest'

  const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내부에서 호출

  // 반응형 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  // 게시물 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quest`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          throw new Error('게시물 목록을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setPosts(data.content);  // 게시물 목록 상태 업데이트
        const initialScrapStatus = {};
        data.content.forEach((post) => {
          initialScrapStatus[post.id] = post.scrap;  // 게시물의 초기 스크랩 상태 설정
        });
        setScrapStatus(initialScrapStatus);  // 스크랩 상태 설정
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
    if (boardName === '자유 게시판') {
      navigate('/G_freeboardPage/'); // 자유게시판으로 이동
    }
    setMenuOpen(false);  // 메뉴 닫기
  };

  const toggleScrap = async (id) => {
    // 백엔드에 스크랩 상태를 업데이트하는 요청 보내기
    try {
      const response = await fetch(`${BASE_URL}/quest/${id}/scrap`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('스크랩 상태 업데이트에 실패했습니다.');
      }

      // 서버 응답이 성공적일 경우 상태 업데이트
      setScrapStatus((prevState) => ({
        ...prevState,
        [id]: !prevState[id],  // 기존 상태를 반대로 변경
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
        console.log(`검색어: ${searchTerm}`);
        const response = await fetch(`${BASE_URL}/quest?searchKeyword=${encodeURIComponent(searchTerm)}`, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error('검색 결과를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        console.log('검색 결과:', data);
        setPosts(data.content);  // 검색 결과를 게시물 목록으로 업데이트
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
        [...prevPosts].sort((a, b) => new Date(b.questCreatedTime) - new Date(a.questCreatedTime))
      );
    } else if (type === 'recommend') {
      // 추천순으로 정렬 (좋아요 개수 기준)
      setPosts((prevPosts) =>
        [...prevPosts].sort((a, b) => b.questLike - a.questLike)
      );
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
          <h1 className={`${styles.pageTitle} ${isDesktop ? styles.desktopPageTitle : ''}`}>
            질문 게시판
          </h1>
          {/* 드롭다운 버튼 (이미지로 표시) */}
          <img
            src={DownMenu}
            className={`${styles.downMenuButton} ${isDesktop ? styles.desktopDownMenuButton : ''}`}
            alt="게시판 선택"
            onClick={toggleMenu}
          />
        </div>

        {/* 드롭다운 메뉴 */}
        {menuOpen && (
          <div
            className={`${styles.dropdownMenu} ${isDesktop ? styles.desktopDropdownMenu : ''}`}
          >
            <div
              className={`${styles.menuItem} ${isDesktop ? styles.desktopMenuItem : ''}`}
              onClick={() => handleBoardChange('자유 게시판')}
            >
              자유 게시판
            </div>
          </div>
        )}

        {/* 컨트롤 패널 (글쓰기 버튼, 검색창, 정렬 버튼) */}
        <div className={`${styles.controlPanel} ${isDesktop ? styles.desktopControlPanel : ''}`}>
          {/* 글쓰기 버튼 */}
          <button
            className={`${styles.writeButton} ${isDesktop ? styles.desktopWriteButton : ''}`}
            onClick={() => navigate('/G_questionwritePage')} // 글쓰기 페이지로 이동
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

        {/* 게시물 목록 */}
        <div className={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              {/* HOT 표시 (상단 3개의 게시물) */}
              {post.questLike > 10 && <span className={styles.hotTag}>HOT</span>}
              {/* 게시물 제목 및 정보 */}
              <div className={styles.postInfo}>
                <span
                  className={styles.postTitle}
                  onClick={() => handlePostClick(post.id)} // 게시물 제목 클릭 시 상세 페이지로 이동
                >
                  {post.questTitle}
                </span>
                <span className={styles.postDate}>{new Date(post.questCreatedTime).toLocaleDateString()}</span>
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

export default G_questionboardPage;
