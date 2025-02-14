import { useEffect, useRef, useState } from "react";

const useLocalStorage = (state: any, storageKey: string) => {
  const [storedData, setStoredData] = useState<any>({
    data: null,
    loading: true,
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    const strData = localStorage.getItem(storageKey);
    try {
      if (strData !== null) {
        setStoredData({ data: JSON.parse(strData), loading: false });
      } else {
        setStoredData({ data: null, loading: false });
      }
    } catch {
      setStoredData({ data: strData || null, loading: false });
    }
  }, [storageKey]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (typeof state === "object" && state !== null) {
      const storedState = localStorage.getItem(storageKey);
      const parsedState = storedState ? JSON.parse(storedState) : null;

      if (JSON.stringify(parsedState) !== JSON.stringify(state)) {
        localStorage.setItem(storageKey, JSON.stringify(state));
      }
    } else if (state === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, state.toString());
    }
  }, [state, storageKey]);

  return { storedData: storedData.data, loading: storedData.loading };
};

export default useLocalStorage;
