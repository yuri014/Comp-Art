import { useCallback, useMemo, useState } from 'react';
import { ISnackbar } from '@interfaces/Generics';

interface IUserSnackbar {
  showSnackbar: ISnackbar;
  setShowSnackbar: (state: ISnackbar) => void;
  clearSnackbar: () => void;
}

const useSnackbar = (): IUserSnackbar => {
  const initialSnackbarState: ISnackbar = useMemo(
    () => ({
      variant: 'error',
      message: '',
    }),
    [],
  );

  const [showSnackbar, setSnackbar] = useState<ISnackbar>(initialSnackbarState);

  const setShowSnackbar = useCallback(
    (state: ISnackbar) => {
      if (initialSnackbarState) {
        setSnackbar(state);
      }
    },
    [initialSnackbarState],
  );

  const clearSnackbar = () => setShowSnackbar(initialSnackbarState);

  return { showSnackbar, setShowSnackbar, clearSnackbar };
};

export default useSnackbar;
