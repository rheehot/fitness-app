/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';

const useScroll = (ref: React.RefObject<HTMLUListElement>) => {
  const x = useRef(0);
  const moveTo = (direction: string) => {
    if (!ref.current) return;

    const maxWidth = ref.current ? ref.current.scrollWidth : 0;
    const vWidth = ref.current ? ref.current.clientWidth : 0;

    switch (direction) {
      case 'next':
        if (x.current >= maxWidth - ref.current.clientWidth) return;
        x.current = Math.min(
          x.current + vWidth,
          maxWidth - ref.current.clientWidth,
        );
        break;
      case 'prev':
        if (x.current <= 0) return;
        x.current = Math.max(x.current - vWidth, 0);
        break;
      case 'end':
        x.current = maxWidth - ref.current.clientWidth;
        break;
      default:
        break;
    }
    ref.current.scrollLeft = x.current;
  };

  return { moveTo };
};

export default useScroll;
