/* eslint-disable no-param-reassign */
import { useRef } from 'react';

const useScroll = () => {
  const ref = useRef<HTMLUListElement>(null);
  const x = useRef(0);
  const moveTo = (direction: string) => {
    if (!ref.current) return;

    const maxWidth = ref.current ? ref.current.scrollWidth : 0;
    const vWidth = ref.current ? ref.current.clientWidth : 0;

    switch (direction) {
      case 'next':
        if (x.current >= maxWidth - ref.current.clientWidth) return;
        x.current = Math.min(
          x.current + vWidth * 0.75,
          maxWidth - ref.current.clientWidth,
        );
        break;
      case 'prev':
        if (x.current <= 0) return;
        x.current = Math.max(x.current - vWidth * 0.75, 0);
        break;
      case 'init':
        x.current = 0;
        break;
      case 'end':
        x.current = maxWidth - ref.current.clientWidth;
        break;
      default:
        break;
    }
    ref.current.scrollLeft = x.current;
  };

  return { ref, moveTo };
};

export default useScroll;
