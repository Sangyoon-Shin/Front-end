import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 라우팅 관련 컴포넌트
import StartPage from './pages/StartPage';
import _ from './pages/_';
import LoginPage from './pages/LoginPage'; // .의 의미: 현재 디렉토리(src)에서 pages 폴더로 들어가서 LoginPage.js 파일을 가져온다는 것.

// 내가속한방 추가
import RoomPage from './pages/RoomPage';


// 게시판 메인 페이지
import BoardPage from './pages/BoardPage';

// 쪽지방
import Message from './pages/Message';

// 채팅방 컴포넌트 추가
import ChatRoom from './pages/ChatRoom';

// 정보 게시판 - 코드 질문방
import InformationCode from './pages/InformationCode';

// 코드 질문방 본문
import QuestionCode from './pages/QuestionCode';

// 대회 정보게시판
import InformationContest from './pages/InformationContest';

// 대회 글쓰기
import ContestWrite from './pages/ContestWrite';

// 석진이형 페이지
import NoticeBoard from './pages/NoticeBoard';

// 알림페이지
import AlarmPage from './pages/AlarmPage';

// 공지사항
import Announcement from './pages/Announcement';

// 지민이가 만든 채팅방 페이지
import ClassChatRoom from './pages/ClassChatRoom'
import ClassChat from './pages/ClassChat'

// 질문게시판
import QuestionboardPage from './pages/QuestionboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/_" element={<_ />} /> {/* 두 번째 페이지 라우팅 */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RoomPage" element={<RoomPage />} />
        <Route path="/BoardPage" element={<BoardPage />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/InformationCode" element={<InformationCode />} /> {/* InformationCode 라우트 추가 */}
        <Route path="/QuestionCode" element={<QuestionCode />} />
        <Route path="/InformationContest" element={<InformationContest />} />
        <Route path="/ContestWrite" element={<ContestWrite />} />
        <Route path="/AlarmPage" element={<AlarmPage />} />
        <Route path="/Announcement" element={<Announcement />} />
        <Route path="/ClassChatRoom" element={<ClassChatRoom />} />
        <Route path="/ClassChat" element={<ClassChat />} />
        <Route path="/QuestionboardPage" element={<QuestionboardPage />} />






        {/* 석진이 형 페이지*/}

        <Route path="/Notice" element={<NoticeBoard />} />

        <Route path="/chatroom/:id" element={<ChatRoom />} /> {/* 동적 라우팅을 통한 채팅방 페이지 */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;