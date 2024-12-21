import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 라우팅 관련 컴포넌트
import StartPage from './pages/StartPage'
import _ from './pages/_'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

import RoomPage from './pages/RoomPage'
import ClassRoom from './pages/ClassRoom'
import FreeRoom from './pages/FreeRoom'
import Profileedit from './pages/Profileedit'
import Myprofile from './pages/Myprofile'
import ChatPreview from './pages/ChatPreview'
import Otherprofile from './pages/Otherprofile'
import { UserProvider } from './pages/UserContext'; //유저 프로필
import User_auth from './pages/User_auth'


import Chat from './pages/Chat'


import G_HomePage from './pages/G_HomePage'





function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<StartPage/>} />
            <Route path="/_" element={<_ />} />  {/* 두 번째 페이지 라우팅 */}

            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/HomePage" element={<HomePage />} />

            {/*소통방 */}
            <Route path="/RoomPage" element={<RoomPage />} />

            
            <Route path="/ClassRoom" element={<ClassRoom />} />
    
            <Route path="/FreeRoom" element={<FreeRoom />} />


           
            <Route path="/Profileedit" element={<Profileedit />} />

            <Route path="/Myprofile" element={<Myprofile />} />

            <Route path="/ChatPreview" element={<ChatPreview />} />

            <Route path="/Otherprofile" element={<Otherprofile />} />

            <Route path="/User_auth" element={<User_auth />} />

            
            <Route path="/G_HomePage" element={<G_HomePage />} />

            <Route path="/Chat/" element={<Chat />} />

    </Routes>
    </BrowserRouter>
    
    </UserProvider>
  );
}

export default App;