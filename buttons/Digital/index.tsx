import styles from "./style.module.scss";

import Pixels from "./Pixels";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <Pixels />
      </div>
      <div
        className={styles.button}
        style={{ position: "relative", marginBottom: 70 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className={styles.border}
        >
          <rect
            x="2"
            y="2"
            width="98%"
            height="95%"
            rx="24"
            ry="24"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4,4"
          ></rect>
        </svg>
        {children}
      </div>
    </>
  );
};

export default _;
