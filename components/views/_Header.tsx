import clsx from "clsx";
import styles from "@/styles/header.module.scss";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  return (
    <header className={styles.main}>
      <h5>OB</h5>
      <div className={clsx(styles.v, styles.spaced)}>
        <h5>"Collective"</h5>
        <div className={styles.h}>
          <h5
            className={clsx(snap.view == "grid" && styles.selected)}
            onClick={() => (state.view = "grid")}
          >
            Grid
          </h5>
          <h5 style={{ lineHeight: 0.9 }}>/</h5>
          <h5
            className={clsx(snap.view == "linear" && styles.selected)}
            onClick={() => (state.view = "linear")}
          >
            Linear
          </h5>
        </div>
      </div>

      <div className={clsx(styles.v, styles.spaced)}>
        <h5>"Featuring"</h5>
        <div className={styles.v}>
          <h5>Product Marketing</h5>
          <h5>Design Engineering</h5>
          <h5>Launch Strategy</h5>
        </div>
      </div>

      <div className={clsx(styles.v, styles.spaced)}>
        <h5>"Information"</h5>
        <div className={styles.v}>
          <h5>Brooklyn, New York</h5>
          <h5>San Francisco, California</h5>
        </div>
      </div>

      <div className={clsx(styles.v, styles.spaced)}>
        <h5>"Partners"</h5>
        <div className={styles.v}>
          <h5>(006)</h5>
        </div>
      </div>
    </header>
  );
};

export default _;
