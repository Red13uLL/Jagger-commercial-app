import { useEffect, useRef, useState } from 'react';

export const usePulse = (value) => {
  const [active, setActive] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setActive(true);
      const timeout = setTimeout(() => setActive(false), 350);
      prevValue.current = value;
      return () => clearTimeout(timeout);
    }
    prevValue.current = value;
  }, [value]);

  return active;
};
