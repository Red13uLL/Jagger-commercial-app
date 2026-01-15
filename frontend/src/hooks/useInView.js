import { useEffect, useRef, useState } from 'react';

export const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};
