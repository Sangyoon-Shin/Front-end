import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 라우팅 관련 컴포넌트
import StartPage from './pages/StartPage';
import _ from './pages/_';
import LoginPage from './pages/LoginPage'; // .의 의미: 현재 디렉토리(src)에서 pages 폴더로 들어가서 LoginPage.js 파일을 가져온다는 것.

//소윤 
import FindIDPage from './pages/FindIDPage'; // FindID 페이지
import FindPWPage from './pages/FindPWPage'; // FindPW 페이지
import JoinPage from './pages/JoinPage'; // 회원가입 페이지
import FreepostingPage from './pages/FreepostingPage'; // 자유게시글 작성 페이지
import QuestionpostingPage from './pages/QuestionpostingPage'; // 질문게시글 작성 페이지
import FreewritePage from './pages/FreewritePage'; // 자유게시글 작성 페이지
import QuestionwritePage from './pages/QuestionwritePage'; // 질문게시글 작성 페이지
import FreeboardPage from './pages/FreeboardPage'; // 자유게시판 페이지
import QuestionboardPage from './pages/QuestionboardPage'; // 질문게시판 페이지
// 졸업생 자유/질문 게시판 
import G_freepostingPage from './pages/G_freepostingPage'; // G_ 자유게시글 작성 페이지
import G_questionpostingPage from './pages/G_questionpostingPage'; // G_ 질문게시글 작성 페이지
import G_freewritePage from './pages/G_freewritePage'; // G_ 자유게시글 작성 페이지
import G_questionwritePage from './pages/G_questionwritePage'; // G_ 질문게시글 작성 페이지
import G_freeboardPage from './pages/G_freeboardPage'; // G_ 자유게시판 페이지
import G_questionboardPage from './pages/G_questionboardPage'; // G_ 질문게시판 페이지

//상윤님
import BoardPage from './pages/BoardPage';// 게시판 메인 페이지
import QuestionCode from './pages/QuestionCode';// 코드 질문방 본문
import RoomPage from './pages/RoomPage'; // 내가속한방 추가
import Message from './pages/Message'; // 쪽지방
import ChatRoom from './pages/ChatRoom'; // 채팅방 컴포넌트 추가
import InformationCode from './pages/InformationCode'; // 정보 게시판 - 코드 질문방
import InformationContest from './pages/InformationContest'; // 대회 정보게시판
import ContestWrite from './pages/ContestWrite'; // 대회 글쓰기
import AlarmPage from './pages/AlarmPage'; // 알림페이지
import Announcement from './pages/Announcement'; // 공지사항

// 지민이가 만든 채팅방 페이지
import ClassChatRoom from './pages/ClassChatRoom'
import ClassChat from './pages/ClassChat'


// 석진이형 페이지
import NoticeBoard from './pages/NoticeBoard';
import WritePage from './pages/WritePage';
import Classroom from './pages/Classroom';
import BootCamp from './pages/BootCamp';
import Industry from './pages/Industry';
import Study from './pages/Study';
import NoticeBoot from './pages/NoticeBoot';
import Scrap from './pages/Scrap';
import My_board from './pages/My_board';
import My_message from './pages/My_message';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/StartPage" element={<StartPage />} />
        <Route path="/_" element={<_ />} /> {/* 두 번째 페이지 라우팅 */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/FindIDPage" element={<FindIDPage />} />
        <Route path="/FindPWPage" element={<FindPWPage />} />
        <Route path="/JoinPage" element={<JoinPage />} />

        <Route path="FreepostingPage" element={<FreepostingPage />} />
        <Route path="QuestionpostingPage" element={<QuestionpostingPage />} />
        <Route path="FreewritePage" element={<FreewritePage />} />
        <Route path="QuestionwritePage" element={<QuestionwritePage />} />
        <Route path="FreeboardPage" element={<FreeboardPage />} />
        <Route path="QuestionboardPage" element={<QuestionboardPage />} />

        <Route path="G_freepostingPage" element={<G_freepostingPage />} />
        <Route path="G_questionpostingPage" element={<G_questionpostingPage />} />
        <Route path="G_freewritePage" element={<G_freewritePage />} />
        <Route path="G_questionwritePage" element={<G_questionwritePage />} />
        <Route path="G_freeboardPage" element={<G_freeboardPage />} />
        <Route path="G_questionboardPage" element={<G_questionboardPage />} />


        {/* 상윤님 */}
        <Route path="/BoardPage" element={<BoardPage />} /> {/*게시판 메인 페이지 */}
        <Route path="/QuestionCode" element={<QuestionCode />} /> {/* 코드 질문방 본문 */}
        <Route path="/RoomPage" element={<RoomPage />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/InformationCode" element={<InformationCode />} /> {/* InformationCode 라우트 추가 */}
        <Route path="/InformationContest" element={<InformationContest />} />
        <Route path="/ContestWrite" element={<ContestWrite />} />
        <Route path="/AlarmPage" element={<AlarmPage />} />
        <Route path="/Announcement" element={<Announcement />} />
        <Route path="/ClassChatRoom" element={<ClassChatRoom />} />
        <Route path="/ClassChat" element={<ClassChat />} />

        {/* 석진이 형 페이지*/}
        <Route path="/Notice" element={<NoticeBoard />} />
        <Route path="/chatroom/:id" element={<ChatRoom />} /> {/* 동적 라우팅을 통한 채팅방 페이지 */}
        <Route path="/Write" element={<WritePage />} />
        <Route path="/Classroom" element={<Classroom />} />
        <Route path="/Bootcamp" element={<BootCamp />} />
        <Route path="/Industry" element={<Industry />} />
        <Route path="/Study" element={<Study />} />
        <Route path="/NoticeBoot" element={<NoticeBoot />} />
        <Route path="/Scrap" element={<Scrap />} />
        <Route path="/My_board" element={<My_board />} />
        <Route path="/My_message" element={<My_message />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;