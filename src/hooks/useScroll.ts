/* eslint-disable no-param-reassign */
import React, { useState } from 'react';

const useScroll = (
  ref: React.RefObject<HTMLUListElement>,
  viewWidth: number,
) => {
  const maxWidth = ref.current ? ref.current.scrollWidth : 0;
  const vWidth = ref.current ? ref.current.offsetWidth : 0;

  console.log(maxWidth, vWidth);
  const [currentX, setCurrentX] = useState(0);

  const moveNext = () => {
    if (!ref.current) return;

    setCurrentX(currentX + 1);
    ref.current.scrollLeft = currentX;
  };

  return { moveNext };
};

export default useScroll;
