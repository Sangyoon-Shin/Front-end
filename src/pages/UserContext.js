import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // 로컬 스토리지에서 사용자 프로필 불러오기
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      // name이 없으면 기본값 '닉네임' 설정
      if (!userProfile.name) {
        userProfile.name = '닉네임';
      }
      setUser(userProfile);
    } else {
      setUser({ name: '닉네임' });
    }
  }, []);

  const updateUser = (newUser) => {
    // name이 없으면 기본값 '닉네임' 설정
    if (!newUser.name) {
      newUser.name = '닉네임';
    }
    setUser(newUser);
    localStorage.setItem('userProfile', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
