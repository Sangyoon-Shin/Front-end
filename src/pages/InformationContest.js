import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함
import axiosInstance from '../utils/api';
import Header from './_.js';  // 상단바 컴포넌트
import styles from './InformationContest.module.css';
import CommunicationRoom_goBack from '../images/왼쪽 나가기 버튼.png';
import SearchIcon from '../images/돋보기아이콘.png';  // 돋보기 아이콘
import IconScrap from '../images/횃불이스크랩.png';
import IconUnscrap from '../images/횃불이스크랩X.png';

const InformationContest = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // 드롭다운 상태 관리
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 관리
    const [scrapStatus, setScrapStatus] = useState({}); // 각 게시물의 스크랩 상태 관리
    const [topLikedPosts, setTopLikedPosts] = useState([]); // 좋아요 10개 이상 게시물
    const [posts, setPosts] = useState([]); // 게시물 목록 상태 관리
    const [sortType, setSortType] = useState('latest'); // 초기 정렬 상태는 'latest'
    const [initialPosts, setInitialPosts] = useState([]); // 최초 데이터 로드한 거 저장시키기
    
  
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

  // 게시물 목록 조회 - 백엔드 연동
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await axiosInstance.get('http://info-rmation.kro.kr/api/board/competition', {// page와 size 추가
          params: { page, size }, // 페이지와 사이즈를 쿼리 파라미터로 추가
          headers: {
            'ngrok-skip-browser-warning': 'true', // 경고 페이지를 우회하는 헤더 추가
          },
        });

        const data = response.data; // Axios는 자동으로 JSON을 파싱합니다.

        if (!data.content || data.content.length === 0) {
          console.warn('게시물이 없습니다.');
          setPosts([]); // 빈 데이터로 상태 초기화
          return;
        }

        setPosts(data.content); // 게시물 데이터 설정
        setInitialPosts(response.data.content); // 초기 데이터 저장
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
        console.log('게시물 데이터:', data);
      } catch (error) {
        console.error('게시물 목록을 불러오는 중 오류가 발생했습니다:', error);
        alert('게시물 데이터를 불러오는데 문제가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    // 좋아요 10개 이상 게시물 가져오기
    const fetchTopLikedPosts = async () => {
      try {
        const response = await axiosInstance.get('http://info-rmation.kro.kr/api/board/competition/top-liked', {
          headers: {
            'ngrok-skip-browser-warning': 'true', // 경고 페이지를 우회하는 헤더 추가
          },
        });
        if (response.status === 200) {
          console.log(response)
          setTopLikedPosts(response.data.map((post) => post.id)); // 좋아요 10개 이상 게시물의 ID만 저장
        } else {
          setTopLikedPosts([]); // 데이터가 없는 경우 빈 배열로 초기화
        }
      } catch (error) {
        console.error('좋아요 상위 게시물을 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchPosts();
    fetchTopLikedPosts();
  }, [page, size]); // page와 size 변경 시 재호출

  const toggleScrap = async (id) => {
    try {
      const response = await axiosInstance.post(`http://info-rmation.kro.kr/api/board/free/${id}/competition`, {
        headers: {
          'ngrok-skip-browser-warning': 'true', // 경고 페이지를 우회하는 헤더 추가
        },

      });

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

  // 검색 입력값을 변경하는 함수
  const handleSearch = async () => {
    console.log('검색 버튼 클릭됨');
    if (searchTerm.trim() !== '') {
      try {
        console.log(`검색어: ${searchTerm}`);
        const response = await axiosInstance.get('http://info-rmation.kro.kr/api/board/competiton', {
          params: {
            searchKeyword: searchTerm, // 검색어 전달
            page: 0,
            size: 10,
          },
          headers: {
            'ngrok-skip-browser-warning': 'true', // 경고 페이지를 우회하는 헤더 추가
          },
        });

        const data = response.data;
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

  const handlePostClick = (postId) => {
    navigate(`/competiton/${postId}`); // 해당 게시물 상세 페이지로 이동

  };

  // 정렬 버튼 클릭 시 호출
  const handleSort = async (type) => {
    setSortType(type); // 정렬 상태 업데이트

    if (type === 'latest') {
      setPosts(initialPosts); // 초기 데이터로 복원
      return;
    }

    try {
      const params = {
        page: 0,
        size: 10,
        searchKeyword: '', // 필요 시 값 설정
        contentKeyword: '', // 필요 시 값 설정
        hashtagKeyword: '', // 필요 시 값 설정
        typeKeyword: '', // 필요 시 값 설정
      };

      const response = await axiosInstance.get('http://info-rmation.kro.kr/api/board/competiton/sort-by-likes', {
        params,
        headers: {
          'ngrok-skip-browser-warning': 'true', // 필요 시 유지
        },
      });

      const data = response.data;

      if (!data || !data.content) {
        throw new Error('API 응답이 올바르지 않습니다.');
      }

      setPosts(data.content); // 정렬된 데이터로 게시물 목록 업데이트
    } catch (error) {
      console.error('정렬 데이터 로드 중 오류 발생:', error);
      alert('정렬된 데이터를 가져오는 중 오류가 발생했습니다.');
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
              onChange={handleSearchChange}
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
              {/* HOT 표시 (좋아요 10개 이상 게시물) */}
              {topLikedPosts.includes(post.id) && (
                <span className={styles.hotTag}>HOT</span>
              )}

              {/* 게시물 제목 및 정보 */}
              <div className={styles.postInfo}>
                <span
                  className={styles.postTitle}
                  onClick={() => handlePostClick(post.id)} // 게시물 제목 클릭 시 상세 페이지로 이동
                >
                  {post.competitionTitle || '제목 없음'} {/* 백엔드 데이터의 키에 맞춰 수정, 기본값 처리 */}
                </span>
                <span className={styles.postDate}>
                  {post.competitionCreatedTime
                    ? new Date(post.competitionCreatedTime).toLocaleDateString() // 작성 날짜 표시
                    : '날짜 없음'}
                </span>
              </div>

              {/* 스크랩 상태 아이콘 */}
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${styles.pageButton} ${page === pageNumber - 1 ? styles.activePageButton : ''}`} // 현재 페이지 강조
              onClick={() => setPage(pageNumber - 1)} // 페이지 번호 업데이트
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