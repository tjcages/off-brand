import styles from "./style.module.scss";

import Wave from "./Wave";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}></div>
      <div style={{ position: "relative", marginBottom: 70 }}>
        <Wave />
        <div
          className={styles.button}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default _;
