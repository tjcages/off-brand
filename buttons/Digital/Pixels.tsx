import { useState, useEffect } from "react";
import styles from "./style.module.scss";

const Pixels = () => {
  const [ready, set] = useState(false);
  const pixels = Array.from(Array(130).keys());

  const randomNumber = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    set(true);
  }, []);

  return ready ? (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.dotGrid}
    >
      <pattern
        id="dot-grid"
        x="0"
        y="0"
        width="64"
        height="64"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        {pixels.map((dot, index) => {
          const x = 3 + (index % 8) * 8;
          const y = 3 + Math.floor(index / 8) * 8;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width="2"
              height="2"
              fill="#4f566b"
              opacity="0.25"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${randomNumber(0.25, 1)}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-grid)"></rect>
    </svg>
  ) : null;
};

export default Pixels;
