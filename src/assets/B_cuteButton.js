import { ReactComponent as B_cuteIcon } from '../assets/B_cute.svg'; 


const B_cute = () => {
  return (
    <button className="B_cute-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <B_cuteIcon width={40} height={40} />
    </button>
  );
};

export default B_cute;