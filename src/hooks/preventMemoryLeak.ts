import { useEffect, useState } from 'react';

/**
 * Use esse hook caso ter algum problema de vazamento de memória
 * @returns {bool} isMount
 */
const usePreventMemoryLeak = (): boolean => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
    return () => {
      setIsMount(false);
    };
  }, []);

  return isMount;
};

export default usePreventMemoryLeak;
