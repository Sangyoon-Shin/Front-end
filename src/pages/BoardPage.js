import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import Header from './_.js'; // 상단바 컴포넌트
import styles from './BoardPage.module.css'; // BoardPage용 CSS 파일
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import DownMenu from '../images/아래방향메뉴선택.png';
import SearchIcon from '../images/돋보기아이콘.png'; // 돋보기 아이콘
import IconScrap from '../images/횃불이스크랩.png';
import IconUnscrap from '../images/횃불이스크랩X.png';

const BoardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // 드롭다운 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
  const [scrapStatus, setScrapStatus] = useState({}); // 각 게시물의 스크랩 상태 관리
  const [posts, setPosts] = useState([]); // 게시물 목록 상태 관리
  const [sortType, setSortType] = useState('latest'); // 초기 정렬 상태는 'latest'

  // 페이징 및 추가 필터링 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [size, setSize] = useState(10); // 페이지당 항목 수
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [hashtagKeyword, setHashtagKeyword] = useState(''); // 해시태그 필터
  const [typeKeyword, setTypeKeyword] = useState(''); // 타입 필터

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 상태

  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 호출
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  // 게시물 목록을 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch('https://ecc6-106-101-130-133.ngrok-free.app/api/board/coding', {// page와 size 추가
          // ?page=${page}&size=${size} -> 이거 써야할때 넣어주기
          headers: {
            'ngrok-skip-browser-warning': 'true', // 경고 페이지를 우회하는 헤더 추가
          },
        });

        if (!response.ok) {
          throw new Error('게시물 목록을 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setPosts(data.content); // 게시물 데이터 설정
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
        console.log(data);

        // 데이터 가공 후 상태 업데이트
        setPosts(data.content); // `content` 배열만 저장
      } catch (error) {
        console.error('게시물 목록을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchPosts();
  }, [page, size]); // page와 size 변경 시 재호출

  // 스크랩 토글 함수
  const toggleScrap = async (id) => {
    try {
      // 백엔드에 스크랩 상태를 업데이트하는 요청 보내기
      const response = await fetch(
        `https://ecc6-106-101-130-133.ngrok-free.app/api/board/coding/${id}/scrap`, // 명세서에 따른 엔드포인트
        {
          method: 'POST', // POST 메서드 사용
          headers: {
            'ngrok-skip-browser-warning': 'true', // 경고 페이지 우회
          },
        }
      );

      if (!response.ok) {
        throw new Error('스크랩 상태 업데이트에 실패했습니다.');
      }

      // 성공적으로 응답을 받은 경우 상태를 업데이트
      setScrapStatus((prevState) => ({
        ...prevState,
        [id]: !prevState[id], // 현재 상태를 토글
      }));

      console.log('스크랩 상태가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('스크랩 상태 업데이트 중 오류가 발생했습니다:', error);
      alert('스크랩 상태 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };


  // 좋아요 토글 함수
  const toggleLike = async (id) => {
    try {
      const response = await fetch(`/api/board/free/${id}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json(); // API 응답에서 좋아요 상태를 받아오기
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id ? { ...post, likeCount: data.likeCount } : post
          )
        );
      } else {
        throw new Error('좋아요 상태 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('좋아요 상태 업데이트 중 오류 발생:', error);
      alert('좋아요 상태 업데이트에 실패했습니다.');
    }
  };

  // 검색 입력값을 변경하는 함수
  const handleSearch = async () => {
    console.log('검색 버튼 클릭됨');
    if (searchTerm.trim() !== '') {
      try {
        console.log(`검색어: ${searchTerm}`);
        const response = await fetch(
          `https://ecc6-106-101-130-133.ngrok-free.app/api/board/coding?searchKeyword=${encodeURIComponent(searchTerm)}`,
          {
            headers: {
              'ngrok-skip-browser-warning': 'true', // 경고 페이지를 우회하는 헤더 추가
            },
          }
        );

        if (!response.ok) {
          throw new Error('검색 결과를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        console.log('검색 결과:', data);

        // 검색 결과를 게시물 목록으로 업데이트 (명세서에 따른 구조 반영)
        setPosts(data.content); // 'content' 필드가 검색 결과로 가정

        alert('검색이 완료되었습니다. 결과가 화면에 표시됩니다.');
      } catch (error) {
        console.error('검색 결과를 불러오는 중 오류가 발생했습니다:', error);
        alert('검색 결과를 불러오는 중 오류가 발생했습니다.');
      }
    } else {
      alert('검색어를 입력해주세요.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 검색어 상태 업데이트
  };

  // 정렬 버튼 클릭 시 호출
  const handleSort = async (type) => {
    setSortType(type); // 정렬 상태 업데이트

    try {
      let url = 'https://ecc6-106-101-130-133.ngrok-free.app/api/board/coding';

      if (type === 'recommend') {
        // 추천순 정렬 엔드포인트
        url = 'https://ecc6-106-101-130-133.ngrok-free.app/api/board/coding/sort-by-likes';

      }

      const response = await fetch(url, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error('정렬된 데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setPosts(data.content); // 정렬된 데이터로 게시물 목록 업데이트
    } catch (error) {
      console.error('정렬 데이터 로드 중 오류 발생:', error);
      alert('정렬된 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };


  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen); // 드롭다운 메뉴 열기/닫기 토글
  };

  const handleBoardChange = (boardName) => {
    if (boardName === '질문 게시판') {
      navigate('/QuestionBoardPage/'); // 질문 게시판으로 이동
    }
    setMenuOpen(false); // 메뉴 닫기
  };



  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // 해당 게시물 상세 페이지로 이동
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={`${styles.titleContainer} ${isDesktop ? styles.desktopTitleContainer : ''}`}>
          {/* 왼쪽 나가기 버튼 */}
          <img
            src={CommunicationRoom_goBack}
            className={`${styles.goBackButton} ${isDesktop ? styles["desktopGoBackButton"] : ''}`}
            alt="뒤로가기"
            onClick={() => navigate(-1)} /* 뒤로 가기 동작 추가 */
          />
          {/* 페이지 타이틀 */}
          <h1 className={`${styles.pageTitle} ${isDesktop ? styles["desktopPageTitle"] : ''}`}>
            자유 게시판
          </h1>
          {/* 드롭다운 버튼 */}
          <img
            src={DownMenu}
            className={`${styles.downMenuButton} ${isDesktop ? styles["desktopDownMenuButton"]: ''}`}
            alt="게시판 선택"
            onClick={toggleMenu}
          />
        </div>

        {/* 드롭다운 메뉴 */}
        {menuOpen && (
          <div className={`${styles.dropdownMenu} ${isDesktop ? styles.desktopDropdownMenu : ''}`}>
            <div
              className={`${styles.menuItem} ${isDesktop ? styles["desktopMenuItem"] : ''}`}
              onClick={() => handleBoardChange('질문 게시판')}
            >
              질문 게시판
            </div>
          </div>
        )}

        {/* 컨트롤 패널 */}
        <div className={`${styles.controlPanel} ${isDesktop ? styles["desktopControlPanel"] : ''}`}>
          {/* 글쓰기 버튼 */}
          <button
            className={`${styles.writeButton} ${isDesktop ? styles["desktopWriteButton"]: ''}`}
            onClick={() => navigate('/write')} // 글쓰기 페이지로 이동
          >
            글쓰기
          </button>

          {/* 검색창 */}
          <div className={`${styles.searchBar} ${isDesktop ? styles.desktopSearchBar : ''}`}>
            <input
              type="text"
              value={searchTerm} // 상태에서 가져온 검색 키워드
              onChange={handleSearchChange} // 기존 함수명을 새 함수명으로 교체
              className={`${styles.searchInput} ${isDesktop ? styles.desktopSearchInput : ''}`}
              placeholder="검색어 입력"
            />
            <img
              src={SearchIcon}
              className={`${styles.searchIcon} ${isDesktop ? styles.desktopSearchIcon : ''}`}
              alt="검색"
              onClick={handleSearch} // 검색 버튼 클릭 시 호출
            />
          </div>

          {/* 정렬 버튼들 */}
          <div className={`${styles.sortButtons} ${isDesktop ? styles.desktopSortButtons : ''}`}>
            <button
              className={`${styles.latestSortButton} ${styles.latestSortButton} ${isDesktop ? styles.desktopLatestSortButton : ''} ${sortType === 'latest' ? styles.activeSortButton : ''}`}
              onClick={() => handleSort('latest')} // handleSort 함수 호출
            >
              최신순
            </button>

            {/* 추천순 정렬 버튼 */}
            <button
              className={`${styles.recommendSortButton} ${styles.recommendSortButton} ${isDesktop ? styles.desktopRecommendSortButton : ''} ${sortType === 'recommend' ? styles.activeSortButton : ''}`}
              onClick={() => handleSort('recommend')} // handleSort 함수 호출
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
              {post.id <= 3 && <span className={styles.hotTag}>HOT</span>}
              {/* 게시물 제목 및 정보 */}
              <div className={styles.postInfo}>
                <span
                  className={styles.postTitle}
                  onClick={() => handlePostClick(post.id)} // 게시물 제목 클릭 시 상세 페이지로 이동
                >
                  {post.title}
                </span>
                <span className={styles.postDate}>{post.createdTime}</span>
              </div>
              {/* 스크랩 버튼 */}
              <img
                src={scrapStatus[post.id] ? IconScrap : IconUnscrap}
                alt={scrapStatus[post.id] ? '스크랩됨' : '스크랩안됨'}
                className={styles.scrapIcon}
                onClick={() => toggleScrap(post.id)} // 스크랩 상태 변경 및 백엔드 전송
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
              onClick={() => setPage(pageNumber - 1)} // 페이지 번호를 변경
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default BoardPage;
