import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <div
          className={styles.button}
          style={{ position: "relative" }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default _;
