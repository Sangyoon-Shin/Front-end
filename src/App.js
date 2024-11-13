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



//상윤님
import BoardPage from './pages/BoardPage';// 게시판 메인 페이지
import InformationCode from './pages/InformationCode';// 정보 게시판 - 코드 질문방
import QuestionCode from './pages/QuestionCode';// 코드 질문방 본문

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

        {/* 상윤님 */}
        <Route path="/BoardPage" element={<BoardPage />} /> {/*게시판 메인 페이지 */}
        <Route path="/InformationCode" element={<InformationCode />} /> {/* 정보 게시판 - 코드 질문방 */}
        <Route path="/QuestionCode" element={<QuestionCode />} /> {/* 코드 질문방 본문 */}

        {/* 석진님 */}
        <Route path="/Notice" element={<NoticeBoard />} />{/*게시판 */}
        <Route path="/Write" element={<WritePage />} />{/* 게시글 쓰기 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;