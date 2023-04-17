import { useEffect } from "react";
import styles from "@/styles/buttons/_bubbleGum.module.scss";
import Gum from "./Gum";

const _ = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    new Gum();
  }, []);

  return (
    <div className={styles.main}>
      <svg
        className={styles.animation}
        id="animation"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <g id="g" filter="url(#goo)"></g>
      </svg>
      {children}
    </div>
  );
};

export default _;
