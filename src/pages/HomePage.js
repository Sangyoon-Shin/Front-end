/*import React from 'react';*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./HomePage.module.css";
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import competitionImage1 from '../images/com1.png'; // 대회 이미지 1 (추가)
import competitionImage2 from '../images/com2.png'; // 대회 이미지 2 (추가)
import competitionImage3 from '../images/com3.png'; // 대회 이미지 3 (추가)
import PlusButton from '../assets/MoreButton'; // 플러스 버튼 컴포넌트 import

import S_cute from '../assets/S_cuteButton'; //스크랩



const HomePage = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false);  // 드롭다운 상태 관리
  const [activeTab, setActiveTab] = useState('정보게시판'); // Default active tab

  const navigate = useNavigate(); // useNavigate 훅 선언

  // 버튼 클릭 시 이동할 링크
  const handlePlusClick2 = () => {
    navigate('/add-code-question');  // 추가 질문 페이지로 이동
  };

  // 질문 항목 클릭 시 이동할 링크
  const handleQuestionClick = (questionId) => {
    navigate(`/code-question/${questionId}`);  // 질문 상세 페이지로 이동
  };


  // PlusButton 클릭 시 링크로 이동하는 함수
  const handlePlusClick = (link) => {
    navigate(link); // 페이지 이동
  };



  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  // Render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case '정보게시판':
        return (
          <>
         {/*   <div className={styles.infoheader}>
             <h2 className={styles.comtext}>코드 정보</h2>
             <PlusButton className={styles.plusButton}/>
            </div> */}


          {/* 코드 정보 섹션 */}


    <div className={styles.container}>
      <div className={styles.infoheader}>
      <h2 className={styles.comtext}>코드 질문</h2>
        <a href="/new-link" className={styles.plusButtonLink}>
          <PlusButton className={styles.plusButton} />
        </a>
      </div>
      

      <div className={styles.postList}>
        <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
          <span className={styles.index}>1</span>
          <span className={styles.question}>[C언어] 정렬 오류</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
          <span className={styles.index}>2</span>
          <span className={styles.question}>[JS] 런타임 에러</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>
      </div>
    </div>



    <div className={styles.container}>
      <div className={styles.infoheader}>
      <h2 className={styles.comtext}>빈 강의실 현황</h2>
        <a href="/room-status" className={styles.plusButtonLink}>
          <PlusButton className={styles.plusButton} />
        </a>
      </div>
      

      <div className={styles.postList}>
        <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
          <span className={styles.index}>1</span>
          <span className={styles.question}>A동 210호</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
          <span className={styles.index}>2</span>
          <span className={styles.question}>B동 530호</span>
          
          <S_cute className={styles.S_cute} />
        </div>
      </div>
    </div>






    <div className={styles.container}>
      <div className={styles.infoheader}>
      <h2 className={styles.comtext}>자기 개발</h2>
        <a href="/self-development" className={styles.plusButtonLink}>
          <PlusButton className={styles.plusButton} />
        </a>
      </div>
      

      <div className={styles.postList}>
        <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
          <span className={styles.index}>1</span>
          <span className={styles.question}>[부트 캠프] SSAFY</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
          <span className={styles.index}>2</span>
          <span className={styles.question}>[산업 연계] CJ 클라우드 네트워크스</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
          <span className={styles.index}>3</span>
          <span className={styles.question}>[스터디 모집] 운영체제 스터디 모집</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

      </div>
    </div>



          </>
        );
      // Handle other tabs here
      case '자유 게시판':
        return (
          <>
 
 
 <div className={styles.container}>
      <div className={styles.infoheader}>
      <h2 className={styles.comtext}>자유 게시판</h2>
        <a href="/self-development" className={styles.plusButtonLink}>
          <PlusButton className={styles.plusButton} />
        </a>
      </div>
      

      <div className={styles.postList}>
        <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
          <span className={styles.index2}>HOT</span>
          <span className={styles.question}>[부트 캠프] SSAFY</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
          <span className={styles.index2}>HOT</span>
          <span className={styles.question}>[산업 연계] CJ 클라우드 네트워크스</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
          <span className={styles.index2}>HOT</span>
          <span className={styles.question}>[스터디 모집] 운영체제 스터디 모집</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

      </div>
    </div>


    <div className={styles.container}>
      <div className={styles.infoheader}>
      <h2 className={styles.comtext}>질문 게시판</h2>
        <a href="/self-development" className={styles.plusButtonLink}>
          <PlusButton className={styles.plusButton} />
        </a>
      </div>
      

      <div className={styles.postList}>
        <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
          <span className={styles.index2}>HOT</span>
          <span className={styles.question}>[부트 캠프] SSAFY</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
          <span className={styles.index2}>HOT</span>
          <span className={styles.question}>[산업 연계] CJ 클라우드 네트워크스</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

        <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
          <span className={styles.index2}>HOT</span>
          <span className={styles.question}>[스터디 모집] 운영체제 스터디 모집</span>
          <span className={styles.date}>2024.01.01</span>
          <S_cute className={styles.S_cute} />
        </div>

      </div>
    </div>


            
          </>
        );
      case '소통 채팅방':
        return (
          <>
            <h2>자기 개발</h2>
            <div className={styles.selfDevelopment}>
              <div className={styles.developmentItem}>
                <span>[부트 캠프] SSAFY</span>
                <span>2024.01.01</span>
              </div>
              <div className={styles.developmentItem}>
                <span>[산업 연계] CJ 클라우드 네트워크스</span>
                <span>2024.01.01</span>
              </div>
              <div className={styles.developmentItem}>
                <span>[스터디 모집] 운영체제 스터디 모집</span>
              </div>
              <a href="/self-development" className={styles.moreLink}>+</a>
            </div>
          </>
        );
      default:
        return null;
    }
  };



  return (
    <div className={styles.app}>
      {/* 상단바 */}
      
      <header className={styles["app-header"]}>
        <div className={styles["title-group"]}>
          <img src={main_mascot} className={styles["app-main_mascot"]} alt="main_mascot" />
          <h2>INFO!</h2>
          <div className={styles["right-section"]}>
            <div className={styles["mascot-logo"]}></div>
            <h2 className={styles["title-text"]}>공지사항</h2>
            <img src={main_bell} className={styles["app-main_bell"]} alt="main_bell" />
            <img src={main_message} className={styles["app-main_message"]} alt="main_message" />
            <img src={main_my} className={styles["app-main_my"]} alt="main_my" />
            {/* 드롭다운 메뉴 */}
            {dropdownVisible && (
              <div className={styles["dropdown-menu"]}>
                <a href="/scrap">스크랩</a>
                <a href="/write-post">작성 게시글</a>
                <a href="/write-comment">작성 댓글</a>
                <a href="/user-auth">사용자 권한 인증</a>
                <a href="/logout" className={styles["logout"]}>로그아웃</a>
              </div>
            )}
          
          </div>
        </div>
      </header>

      {/* 대회 정보 부분 */}
      <div className={styles.comheader}>
      <h2 className={styles.comtext}>대회 정보</h2>
        <a href="/com" className={styles.plusButtonLink}>
          <PlusButton className={styles.plusButton} />
        </a>
      </div>

      {/* 대회 정보 이미지 부분 */}
      <div className={styles.competitions}>
        <a className={styles.competitionItem} href="https://example.com/competition1" target="_blank" rel="noopener noreferrer">
          <img src={competitionImage1} className={styles.competitionImage} alt="대회 1" />
        </a>
        <a className={styles.competitionItem} href="https://example.com/competition2" target="_blank" rel="noopener noreferrer">
          <img src={competitionImage2} className={styles.competitionImage} alt="대회 2" />
        </a>
        <a className={styles.competitionItem} href="https://example.com/competition3" target="_blank" rel="noopener noreferrer">
          <img src={competitionImage3} className={styles.competitionImage} alt="대회 3" />
        </a>
      </div>


      {/* 탭 네비게이션 */}
      <div className={styles.tabContainer}>
        <button
          className={activeTab === '정보게시판' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab('정보게시판')}
        >
          정보게시판
        </button>
        <button
          className={activeTab === '자유 게시판' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab('자유 게시판')}
        >
          자유 게시판
        </button>
        <button
          className={activeTab === '소통 채팅방' ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab('소통 채팅방')}
        >
          소통 채팅방
        </button>
      </div>

      {/* 탭 내용 */}
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>


      {/* 하단바 추가 */}
      <div className={styles.footer}>
        <div className={styles.footerItem}>
          <span>문의하기</span>
          <a href="mailto:abcd@gmail.com">abcd@gmail.com</a>
        </div>
        <div className={styles.footerItem}>
          <span>개인정보처리방침</span>
        </div>
      </div>





    </div>
  );
};

export default HomePage;
