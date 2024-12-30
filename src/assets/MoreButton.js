import { ReactComponent as MoreIcon } from '../assets/More.svg'; 


const More = () => {
  return (
    <button className="More-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <MoreIcon width={30} height={30} />
    </button>
  );
};

export default More;