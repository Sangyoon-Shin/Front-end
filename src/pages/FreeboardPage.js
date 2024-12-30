import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js';  // 상단바 컴포넌트
import axiosInstance from '../utils/api';
import styles from './FreeboardPage.module.css';  // BoardPage용 CSS 파일
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import DownMenu from '../images/아래방향메뉴선택.png';
import SearchIcon from '../images/돋보기아이콘.png';  // 돋보기 아이콘
import IconScrap from '../images/횃불이스크랩.png';
import IconUnscrap from '../images/횃불이스크랩X.png';

// API에서 사용할 기본 URL과 헤더 설정
const BASE_URL = 'https://bcefb2d9d162.ngrok.app/';
// 실제 Bearer 토큰을 코드에 하드코딩해서 사용
const getAuthHeaders = () => {
  // 실제 Bearer 토큰 값으로 수정
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjIwMjIwMTY1OSIsInJvbGUiOiJTVFVERU5UIiwiaWF0IjoxNzM1MjEwNTcxLCJleHAiOjE3Mzg0NTA1NzF9.AkO3lrnl3Kh86nWp04xs8LTE1EQbu1RGjfu8aV_3LPA";
  const userId = localStorage.getItem('userId'); // 사용자 ID를 로컬스토리지에서 가져옴
  return {
    'Authorization': `Bearer ${accessToken}`,  // Bearer 토큰을 Authorization 헤더에 포함
    'X-USER-ID': userId, // 사용자 ID를 X-USER-ID 헤더에 포함
    'Content-Type': 'application/json',
  };
};



const FreeboardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // 드롭다운 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [scrapStatus, setScrapStatus] = useState({}); // 각 게시물의 스크랩 상태 관리
  const [posts, setPosts] = useState([]); // 게시물 목록 상태 관리
  const [sortType, setSortType] = useState('latest'); // 초기 정렬 상태는 'latest'
  const navigate = useNavigate();  // useNavigate 훅을 컴포넌트 내부에서 호출

  // 반응형 처리를 위한 useMediaQuery 사용
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  // 백엔드에서 게시물 목록 불러오기
  useEffect(() => {
    // 페이지 로드 시 백엔드에서 게시물 목록을 불러옴
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); 
        const response = await fetch('https://bcefb2d9d162.ngrok.app/api/board/free', { headers: { 'ngrok-skip-browser-warning': 1,'Authorization': `Bearer ${accessToken}` } });
        if (!response.ok) {
          throw new Error('게시물 목록을 불러오는데 실패했습니다.');
        }
        // 'response.json()'으로 데이터를 받아옴
        const data = await response.json(); // 여기가 수정된 부분입니다.
        console.log(data);
        setPosts(data.content);  // 게시물 목록 상태 업데이트
      } catch (error) {
        console.error('게시물 목록을 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchPosts();

  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // 드롭다운 토글
  };

  const handleBoardChange = (boardName) => {
    if (boardName === '질문 게시판') {
      navigate('/QuestionboardPage/'); // 질문 게시판으로 이동
    }
    setMenuOpen(false);  // 메뉴 닫기
  };

  const toggleScrap = async (id) => {
    // 스크랩 상태를 업데이트하는 요청을 보냄
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
        [id]: !prevState[id], // 기존 스크랩 상태를 반전
      }));

      console.log('스크랩 상태가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('스크랩 상태 업데이트 중 오류가 발생했습니다:', error);
      alert('스크랩 상태 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 검색어 상태 업데이트
  };

  // 검색 버튼을 클릭했을 때 호출되는 함수
  const handleSearch = async () => {
    console.log('검색 버튼 클릭됨');
    const accessToken = localStorage.getItem('accessToken'); 
    if (searchTerm.trim() !== '') {
      try {
        const baseUrl = new URL('https://bcefb2d9d162.ngrok.app/api/board/free');
        baseUrl.searchParams.append('searchKeyword', searchTerm);
        baseUrl.searchParams.append('page', '0');
        baseUrl.searchParams.append('size', '10');
  
        console.log(`검색어: ${searchTerm}`);
        const response = await fetch(baseUrl.toString(), {
      
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': 1, // ngrok 관련 헤더 추가
          },
          method:'get'
        });

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('검색 결과:', data);
        // 검색 결과를 게시물 목록으로 업데이트 (명세서에 따른 구조 반영)
        setPosts(data.content); // 'content' 필드가 검색 결과로 가정        
        alert('검색이 완료되었습니다. 결과가 화면에 표시됩니다.');
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류가 발생했습니다:', error);
        if (error.message.includes('Unexpected token')) {
          alert('서버에서 올바른 데이터를 반환하지 않았습니다. 서버 로그를 확인하세요.');
        } else {
          alert('검색 결과를 불러오는 중 오류가 발생했습니다.');
        }
      }
    } else {
      alert('검색어를 입력해주세요.');
    }
  };



  const handlePostClick = (postId) => {
    navigate(`/FreepostingPage/${postId}`);  // 해당 게시물 상세 페이지로 이동
  };

  // 정렬 버튼 클릭 시 정렬 상태 업데이트
  // 정렬 버튼 클릭 시 정렬 상태 업데이트
  const handleSort = (type) => {
    setSortType(type);

    let sortedPosts;
    if (type === 'latest') {
      // 최신순으로 정렬: 먼저 HOT 1~3개를 최신순으로, 나머지 최신순으로 정렬
      sortedPosts = [...posts]
        .filter((post) => post.freeLike >= 10)  // HOT 게시물 필터링 (좋아요 10개 이상)
        .sort((a, b) => new Date(b.freeCreatedTime) - new Date(a.freeCreatedTime)); // 최신순으로 정렬

      // HOT 게시물 1개 또는 3개만 보여주기
      const topHotPosts = sortedPosts.slice(0, 3);  // 상위 3개만 표시

      const nonHotPosts = [...posts]
        .filter((post) => post.freeLike < 10)  // HOT이 아닌 게시물 필터링
        .sort((a, b) => new Date(b.freeCreatedTime) - new Date(a.freeCreatedTime)); // 최신순으로 정렬

      setPosts([...topHotPosts, ...nonHotPosts]); // HOT 게시물(최대 3개) + 나머지 게시물 최신순으로 결합
    } else if (type === 'recommend') {
      // 추천순으로 정렬: 먼저 HOT 1~3개를 추천순으로, 나머지 추천순으로 정렬
      sortedPosts = [...posts]
        .filter((post) => post.freeLike >= 10)  // HOT 게시물 필터링 (좋아요 10개 이상)
        .sort((a, b) => b.freeLike - a.freeLike); // 좋아요 순으로 정렬

      // HOT 게시물 1개 또는 3개만 보여주기
      const topHotPosts = sortedPosts.slice(0, 3);  // 상위 3개만 표시

      const nonHotPosts = [...posts]
        .filter((post) => post.freeLike < 10)  // HOT이 아닌 게시물 필터링
        .sort((a, b) => b.freeLike - a.freeLike); // 좋아요 순으로 정렬

      setPosts([...topHotPosts, ...nonHotPosts]); // HOT 게시물(최대 3개) + 나머지 게시물 추천순으로 결합
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
          <div
            className={`${styles.dropdownMenu} ${isDesktop ? styles.desktopDropdownMenu : ''}`}
          >
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
            onClick={() => navigate('/FreewritePage')}
          >
            글쓰기
          </button>

          <div className={`${styles.searchBar} ${isDesktop ? styles.desktopSearchBar : ''}`}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange} // 기존 함수명을 새 함수명으로 교체
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
              {post.freeLike >= 10 && <span className={styles.hotTag}>HOT</span>} {/* 좋아요가 10개 이상일 때 HOT 태그 표시 */}
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

export default FreeboardPage;
