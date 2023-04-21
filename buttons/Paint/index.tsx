import Image from "next/image";
import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <h5>Paint</h5>
          <div className={styles.controls}>
            <button className={styles.btn}>
              <svg
                width="19"
                height="3"
                viewBox="0 0 19 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="19" height="3" fill="#353535" />
              </svg>
            </button>
            <button className={styles.btn}>
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="16"
                  height="13"
                  stroke="#353535"
                  strokeWidth="3"
                />
              </svg>
            </button>
            <button className={styles.btn}>x</button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.options}>
            <h5>File</h5>
            <h5>Edit</h5>
            <h5>View</h5>
            <h5>Help</h5>
          </div>
          <div className={styles.window}>
            <div className={styles.toolbar}>
              <div className={styles.lines} />
              <div className={styles.square} />
              <div className={styles.lines} />
              <h5>untitled</h5>
              <div className={styles.lines} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.button}
        style={{ position: "relative", marginBottom: -32 }}
      >
        {children}
        <div className={styles.wrapper}>
          <div className={styles.square} />
          <div className={styles.square} />
          <div className={styles.square} />
          <div className={styles.square} />
        </div>
      </div>
    </>
  );
};

export default _;
