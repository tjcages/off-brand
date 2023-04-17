import styles from "./style.module.scss";

import Player from "./Player";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <Player />
      </div>
      <div
        className={styles.button}
        style={{ position: "relative", marginTop: 50 }}
      >
        {children}
      </div>
    </>
  );
};

export default _;
