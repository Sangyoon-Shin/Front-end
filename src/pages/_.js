
import React from 'react';

import styles from './_.module.css';
import main_mascot from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
//import main_info from '../images/대학 심볼 횃불이.png';  // 로고 이미지 불러오기
import main_bell from '../images/bell.png';  // 로고 이미지 불러오기
import main_message from '../images/message.png';  // 로고 이미지 불러오기
import main_my from '../images/my.png';  // 로고 이미지 불러오기


//검색, 쪽지, MY 아이콘 , 공지사항, 홰불이 
// 알림 업데이트 이건 어떻게 하지? ㅜ 

const _ = () => {
  return (
    <div className={styles.app}>
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
        </div>
        </div>

      </header>
    </div>
  );
};

export default _;


/*
// 클릭 시 실행될 함수 정의
const onTextClick = () => {
  alert("Div가 클릭되었습니다!");
};

return (
  <div className={styles.div} onClick={onTextClick}>
    클릭할 수 있는 텍스트입니다!
  </div>
);

*/