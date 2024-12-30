/*import React from 'react';*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./G_HomePage.module.css";

import main_mascot from '../images/졸업생횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기
import PlusButton from '../assets/MoreButton'; // 플러스 버튼 컴포넌트 import

import S_cute from '../assets/S_cuteButton'; //스크랩

import { useMediaQuery } from 'react-responsive'; // 반응형 페이지 만들기 위함

const G_HomePage = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false);  // 드롭다운 상태 관리
  const [activeTab, setActiveTab] = useState('자유 게시판'); // Default active tab
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); //logout
  const navigate = useNavigate(); // useNavigate 훅 선언

 // 반응형 페이지 처리를 위한 useMediaQuery 사용
 const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  // 질문 항목 클릭 시 이동할 링크
  const handleQuestionClick = (questionId) => {
    navigate(`/page/${questionId}`);  // 질문 상세 페이지로 이동
  };


  // PlusButton 클릭 시 링크로 이동하는 함수
  const handlePlusClick = (link) => {
    navigate(link); // 페이지 이동
  };

//로그아웃
  const handleLogoutClick = (e) => { 
    e.preventDefault(); 
    setIsLogoutModalOpen(true); 
  }; 
  
  const handleLogoutConfirm = () => { 
    setIsLogoutModalOpen(false); navigate('/Start'); 
  }; 
  
  const handleLogoutCancel = () => { 
    setIsLogoutModalOpen(false);
  };

 

{/*
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }; */}

    // 드롭다운 메뉴 토글 함수
    const toggleDropdown = () => {
      setDropdownVisible((prev) => !prev);
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case '자유 게시판':
                return (
                  <>
         
         
         <div className={styles.container}>
           
              
        
              <div className={styles.postList}>
                <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
                  <span className={styles.index2}>1</span>
                  <span className={styles.question}>[카카오] 데이터베이스설계자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
                <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
                  <span className={styles.index2}>2</span>
                  <span className={styles.question}>[SK] AI - LLM 개발자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
                <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
                  <span className={styles.index2}>3</span>
                  <span className={styles.question}>[카카오] 데이터베이스설계자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>

                <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
                  <span className={styles.index2}>4</span>
                  <span className={styles.question}>[SK] AI - LLM 개발자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
                <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
                  <span className={styles.index2}>5</span>
                  <span className={styles.question}>[카카오] 데이터베이스설계자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>

                <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
                  <span className={styles.index2}>6</span>
                  <span className={styles.question}>[SK] AI - LLM 개발자</span>
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
         
         <div className={styles.container}>
            
              
        
              <div className={styles.postList}>
                <div className={styles.postItem} onClick={() => handleQuestionClick(1)}>
                  <span className={styles.index2}>1</span>
                  <span className={styles.question}>[카카오] 데이터베이스설계자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
                <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
                  <span className={styles.index2}>2</span>
                  <span className={styles.question}>[SK] AI - LLM 개발자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
                <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
                  <span className={styles.index2}>3</span>
                  <span className={styles.question}>[카카오] 데이터베이스설계자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>

                <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
                  <span className={styles.index2}>4</span>
                  <span className={styles.question}>[SK] AI - LLM 개발자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
                <div className={styles.postItem} onClick={() => handleQuestionClick(3)}>
                  <span className={styles.index2}>5</span>
                  <span className={styles.question}>[카카오] 데이터베이스설계자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>

                <div className={styles.postItem} onClick={() => handleQuestionClick(2)}>
                  <span className={styles.index2}>6</span>
                  <span className={styles.question}>[SK] AI - LLM 개발자</span>
                  <span className={styles.date}>2024.01.01</span>
                  <S_cute className={styles.S_cute} />
                </div>
        
        
              </div>
            </div>
        
                   
                  </>
               
                );
              default:
                return null;
            }
          };


  // 게시판 데이터 (예시 데이터)
  const hotPosts = [
    {
      id: 1,
      title: "임베디드 취업률 실화냐..",
      description: "임베디드 취업률 법학과보다 낮아서 교수님께 한 소리 들었다.",
    },
    {
      id: 2,
      title: "정보대 앞 토끼..",
      description: "정보대 앞 토끼.. 왜 안 보이냐...",
    },
  ];

  const questionPosts = [
    {
      id: 3,
      title: "과 CC 다 말리던데... 하면 안돼요?",
      description: "이번에 입학했는데 과 CC 하면 안돼요?",
    },
    {
      id: 4,
      title: "코딩 언어 뭐가 좋을까요?",
      description:
        "학교에서 C언어 주로 배우는데... 요즘 파이썬이랑 자바스크립트... 쓰는... 더보기",
    },
  ];

  // 댓글 달기 버튼 클릭 시 해당 게시판으로 이동
  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };


          

    return (
      <div className={styles.app}>
        {/* 상단바 */}
        <header className={`${styles["app-header"]} ${isDesktop ? styles.desktopHeader : ''}`}>
          <div className={`${styles["title-group"]} ${isDesktop ? styles.desktopTitleGroup : ''}`}>
            <img
              src={main_mascot}
              className={styles["app-main_mascot"]}
              alt="main_mascot"
              onClick={() => navigate("/HomePage")}
            />
            <h2 onClick={() => navigate("/HomePage")} style={{ cursor: "pointer" }}>
              INFO!
            </h2>
  
            {/* 오른쪽 섹션 */}
            <div className={`${styles["right-section"]} ${isDesktop ? styles.desktopRightSection : ''}`}>
              <h2
                className={styles["title-text"]}
                onClick={() => navigate("/notice")}
                style={{ cursor: "pointer" }}
              >
                공지사항
              </h2>
              <img
                src={main_bell}
                className={styles["app-main_bell"]}
                alt="main_bell"
                onClick={() => navigate("/notification")}
              />
              <img
                src={main_message}
                className={styles["app-main_message"]}
                alt="main_message"
                onClick={() => navigate("/message")}
              />
              <img
                src={main_my}
                className={styles["app-main_my"]}
                alt="main_my"
                onClick={toggleDropdown}
              />
            </div>
          </div>
        </header>
  
        {/* 탭 네비게이션 */}
        <div className={`${styles.tabContainer} ${isDesktop ? styles.desktopTabContainer : ''}`}>
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
          <a href="/self-development" className={styles.plusButtonLink}>
            <PlusButton className={styles.plusButton} />
          </a>
        </div>
  
        {/* 탭 내용 */}
        <div className={`${styles.tabContent} ${isDesktop ? styles.desktopTabContent : ''}`}>
          {renderTabContent()}
        </div>
  
        {/* 게시판 컨테이너 */}
        <div className={`${styles.container} ${isDesktop ? styles.desktopContainer : ''}`}>
          <h1 className={styles.title}>재학생들의 자유게시판</h1>
  
          <section>
            <h4 className={styles.subtitle}>〈핫한 게시판〉</h4>
            <div className={styles.postList2}>
              {hotPosts.map((post) => (
                <div key={post.id} className={styles.post}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDescription}>{post.description}</p>
                  <button
                    className={styles.commentButton}
                    onClick={() => handleNavigate(post.id)}
                  >
                    댓글 달기
                  </button>
                </div>
              ))}
            </div>
          </section>
  
          <section>
            <h4 className={styles.subtitle}>〈질문 게시판〉</h4>
            <div className={styles.postList2}>
              {questionPosts.map((post) => (
                <div key={post.id} className={styles.post}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDescription}>{post.description}</p>
                  <button
                    className={styles.commentButton}
                    onClick={() => handleNavigate(post.id)}
                  >
                    댓글 달기
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
  
        {/* 하단바 */}
        <div className={`${styles.footer} ${isDesktop ? styles.desktopFooter : ''}`}>
          <div className={styles.footerItem}>
            <span>문의하기 </span>
            <a href="mailto:abcd@gmail.com">abcd@gmail.com</a>
          </div>
          <div className={styles.footerItem}>
            <span>개인정보처리방침</span>
          </div>
        </div>
      </div>
    );
};

export default G_HomePage;
