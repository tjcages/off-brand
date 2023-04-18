import React from "react";
import styles from "./retro.module.scss";
import logo from "./logo.module.scss";

const Scene = () => {
  return (
    <div className={styles.scene}>
      <div className={styles.top}>
        <div className={styles.sun}></div>
        <div className={logo.container}>
          <div className={logo.triangle}></div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomOverlay}></div>
      </div>
    </div>
  );
};

export default Scene;
