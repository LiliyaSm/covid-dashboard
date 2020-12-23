import { useState, useEffect } from 'react';

const useResize = () => {
  const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return width;
};

export default useResize;
