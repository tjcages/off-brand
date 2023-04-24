import { useState, useLayoutEffect, useRef } from "react";

export const useParentSize = () => {
  const parentRef = useRef<any>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const handlSetSize = () => {
      if (parentRef.current) {
        setWidth(parentRef.current.offsetWidth || 0);
        setHeight(parentRef.current.offsetHeight || 0);
      }
    };

    function handleResize() {
      handlSetSize();
    }

    window.addEventListener("resize", handleResize);

    handlSetSize();
  }, []);

  return [parentRef, { width, height }];
};