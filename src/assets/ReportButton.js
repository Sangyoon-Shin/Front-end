import { ReactComponent as ReportIcon } from '../assets/Report.svg'; 


const Report = () => {
  return (
    <button className="Report-btn" style={{ border: 'none', background: 'none', padding: 0 }}>
      <ReportIcon width={60} height={60} />
    </button>
  );
};

export default Report;