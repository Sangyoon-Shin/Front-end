import { ReactComponent as SearchIcon } from '../assets/search.svg'; // search.svg 파일을 React 컴포넌트로 


const SearchButton = () => { 

  return (
    //CSS 클래스: search-btn을 사용하여 버튼에 스타일을 적용할 수 있게 함.
    // 버튼의 테두리, 배경색, 패딩 제거
    // 임포트한 아이콘 렌더링 후 아이콘 크기 설정
    <button className="search-btn" style={{ border: 'none', background: 'none', padding: 0 }}> 
      <SearchIcon width={40} height={40} /> 
    </button>
  );
};

export default SearchButton;
// 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄. 