import { useEffect } from "react";
import styles from "./style.module.scss";
import Gum from "./Gum";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  useEffect(() => {
    new Gum();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <svg
          className={styles.animation}
          id="animation"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          preserveAspectRatio="xMidYMid slice"
        >
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
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
      </div>
      <div
        className={styles.button}
        style={{ position: "relative", marginBottom: 70 }}
      >
        {children}
      </div>
    </>
  );
};

export default _;
