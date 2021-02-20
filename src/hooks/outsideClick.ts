import { useEffect } from 'react';

const useOutsideClick = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
): void => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback, ref]);
};

export default useOutsideClick;
