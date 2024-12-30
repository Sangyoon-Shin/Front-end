import { ReactComponent as DelIcon } from '../assets/Del.svg'; 


const Del = () => {
  return (
    <button className="Del-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <DelIcon width={60} height={60} />
    </button>
  );
};

export default Del;