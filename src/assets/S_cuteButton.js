import { ReactComponent as S_cuteIcon } from '../assets/S_cute.svg'; 


const S_cute = () => {
  return (
    <button className="S_cute-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <S_cuteIcon width={40} height={40} />
    </button>
  );
};

export default S_cute;