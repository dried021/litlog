import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 스크롤바 숨김
    document.body.style.overflow = 'hidden';

    // 맨 위로 자동 스크롤
    window.scrollTo(0, 0);

    // 딜레이 후 스크롤바 다시 보임
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 300); 

    return () => clearTimeout(timer); 
  }, [pathname]);

  return null;
};

export default ScrollTop;
