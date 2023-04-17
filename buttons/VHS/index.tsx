import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
}

const Scanlines = () => (
  <div className={styles.scanlines}></div> // Use the style module syntax
);

const IntroWrap = () => (
  <div className={styles.introWrap}>
    <div className={styles.noise}></div>
    <div className={`${styles.noise} ${styles.noiseMoving}`}></div>{" "}
    <div className={styles.play} data-splitting>
      PLAY
    </div>
    <div className={styles.time}>--:--</div>
    <div className={styles.recordSpeed}>SLP 0:00:00</div>
  </div>
);

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <Scanlines />
        <IntroWrap />
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
