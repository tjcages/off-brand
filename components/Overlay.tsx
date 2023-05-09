import styles from "@/styles/overlay.module.scss";

const _ = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.dots} />
        <div className={styles.dots} />
        <div className={styles.dots} />
        <div className={styles.dots} />
      </div>
    </div>
  );
};

export default _;
