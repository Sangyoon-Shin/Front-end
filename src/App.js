import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 라우팅 관련 컴포넌트
import StartPage from './pages/StartPage'
import _ from './pages/_'
import LoginPage from './pages/LoginPage'
import FindIDPage from './pages/FindIDPage'
import FindPWPage from './pages/FindPWPage'
import JoinPage from './pages/JoinPage'


import _save from './pages/_save'




function App() {
  return (
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="/_" element={<_ />} />  {/* 두 번째 페이지 라우팅 */}
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/FindIDPage" element={<FindIDPage />} />
            <Route path="/FindPWPage" element={<FindPWPage />} />
            <Route path="/JoinPage" element={<JoinPage />} />

            <Route path="_save" element={<_save />} />


    </Routes>
    </BrowserRouter>
  );
}

export default App;