import { ReactComponent as WriteIcon } from '../assets/Write.svg'; // 경로 수정


const Write = () => {
  return (
    <button className="write-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <WriteIcon width={80} height={80} /> {/* 버튼 테두리 제거 */}
    </button>
  );
};

export default Write;
  