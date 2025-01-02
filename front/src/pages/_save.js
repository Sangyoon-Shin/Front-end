import React from 'react';
import styles from './_save.module.css'; // CSS 모듈 파일을 import

import back_logo from '../images/뒷모습 횃불이.png';  // 로고 이미지 불러오기


const _save = () => {
  return (
    <div className={styles.container}>
      {/* 로고와 텍스트 */}
      <div className={styles["group-info"]}>
        <div className={styles.logo}>
          <img src={back_logo} className={styles["app-back_logo"]} alt="back_logo" />
          <h1 className={styles.title}>INFO</h1>
        </div>
      </div>


      {/* 아이디 찾기 폼 */}
      <div className={styles.formContainer}>
            <h1>아이디 찾기</h1>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" placeholder="이름" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="이메일" />
          <button className={styles.inputBtn}>인증번호 받기</button>
        </div>

        {/* 닫기 버튼 */}
        <button className={styles.closeBtn}>닫기</button>
      </div>
    </div>
  );
};

export default _save;
