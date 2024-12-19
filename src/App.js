import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 라우팅 관련 컴포넌트
import StartPage from './pages/StartPage'
import _ from './pages/_'
import LoginPage from './pages/LoginPage'

import FindIDPage from './pages/FindIDPage'
import FindPWPage from './pages/FindPWPage'
import JoinPage from './pages/JoinPage'
import _save from './pages/_save'

import FreepostingPage from './pages/FreepostingPage';
import QuestionpostingPage from './pages/QuestionpostingPage';
import FreewritePage from './pages/FreewritePage';
import QuestionwritePage from './pages/QuestionwritePage';
import FreeboardPage from './pages/FreeboardPage';
import QuestionboardPage from './pages/QuestionboardPage';

import G_freepostingPage from './pages/G_freepostingPage';
import G_questionpostingPage from './pages/G_questionpostingPage';
import G_freewritePage from './pages/G_freewritePage';
import G_questionwritePage from './pages/G_questionwritePage';
import G_freeboardPage from './pages/G_freeboardPage';
import G_questionboardPage from './pages/G_questionboardPage';


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


//석진님
import NoticeBoard from './pages/NoticeBoard'; //게시판
import WritePage from './pages/WritePage'; //게시글 쓰기



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/_" element={<_ />} />  {/* 두 번째 페이지 라우팅 */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/FindIDPage" element={<FindIDPage />} />
        <Route path="/FindPWPage" element={<FindPWPage />} />
        <Route path="/JoinPage" element={<JoinPage />} />
        <Route path="_save" element={<_save />} />

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

        {/* 석진님 */}
        <Route path="/Notice" element={<NoticeBoard />} />{/*게시판 */}
        <Route path="/Write" element={<WritePage />} />{/* 게시글 쓰기 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;