import { useEffect } from 'react';

/**
 * Executa uma função ao clicar fora de um elemento.
 * @param ref useRef onde clicar fora dispara um função.
 * @param callback ao clicar fora do ref, dispara essa função.
 */
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
