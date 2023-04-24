import styles from "./style.module.scss";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <video autoPlay loop muted playsInline src="/textures/nyan.mp4" />
      </div>
      <div
        className={styles.button}
        style={{ position: "relative", marginBottom: -4 }}
      >
        {children}
      </div>
    </>
  );
};

export default _;
