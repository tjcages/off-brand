import React from "react";
import styles from "./retro.module.scss";
import logo from "./logo.module.scss";

const Scene = () => {
  return (
    <div className={styles.scene}>
      <div className={styles.top}>
        <div className={styles.startails}>
          <div className={styles.startailR}></div>
          <div className={styles.startailL}></div>
          <div className={styles.startailM}></div>
        </div>
        <div className={styles.topLines}></div>
        <div className={styles.sun}></div>
        <div className={logo.container}>
          <div className={logo.triangle}></div>
          <div className={logo.kodeText}></div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.m0}></div>
        <div className={styles.m1}></div>
        <div className={styles.m2}></div>
        <div className={styles.bottomOverlay}></div>
      </div>
    </div>
  );
};

export default Scene;
