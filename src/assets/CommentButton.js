import { ReactComponent as CommentIcon } from '../assets/Comment.svg'; // 경로 수정


const Comment = () => {
  return (
    <button className="Comment-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <CommentIcon width={90} height={90} /> {/* 버튼 테두리 제거 */}
    </button>
  );
};

export default Comment;