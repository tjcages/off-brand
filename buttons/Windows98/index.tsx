import styles from "./style.module.scss";

import internet from "./_internet";
import documents from "./_documents";
import minesweeper from "./_minesweeper";
import recycle from "./_recycle";

interface Props {
  children: React.ReactNode;
}

const _ = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.desktopItem}>
          <img src={internet} alt="Internet icon" />
          <div className={styles.text}>Internet</div>
        </div>
        <div className={styles.desktopItem}>
          <img src={documents} alt="Documents icon" />
          <div className={styles.text}>Documents</div>
        </div>
        <div className={styles.desktopItem}>
          <img src={minesweeper} alt="Minesweeper icon" />
          <div className={styles.text}>Minesweeper</div>
        </div>
        <div className={styles.desktopItem}>
          <img src={recycle} alt="Recycle icon" />
          <div className={styles.text}>Recycle Bin</div>
        </div>
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
