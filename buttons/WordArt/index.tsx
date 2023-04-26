import Image from "next/image";
import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.blueWave}>The</div>
        <div className={styles.rainbow}>quick</div>
        <div className={styles.superheroWrap}>
          <div className={styles.superhero}>brown</div>
        </div>
        <div className={styles.outline}>fox</div>
        <div className={styles.radial}>jumps</div>
        <Image
          src="/icons/over.png"
          alt="over"
          className={styles.over}
          width={120}
          height={120}
        />
        <div className={styles.tiltWrapper}>
          <div className={styles.tilt}>the</div>
        </div>
        <div className={styles.horizon}>button</div>
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
