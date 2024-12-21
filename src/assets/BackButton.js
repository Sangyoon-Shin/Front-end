import { ReactComponent as BackIcon } from '../assets/Back.svg'; 


const Back = () => {
  return (
    <button className="Back-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <BackIcon width={40} height={40} />
    </button>
  );
};

export default Back;