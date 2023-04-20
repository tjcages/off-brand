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
          <div className={styles.back}>Notes</div>
          <h5>The buy button</h5>
          <div className={styles.plus}>
            <Image src="/icons/plus.svg" alt="arrow" width={10} height={10} />
          </div>
        </div>
        <div className={styles.torn} />
      </div>
      <div
        className={styles.button}
        style={{ position: "relative" }}
      >
        {children}
      </div>
    </>
  );
};

export default _;
