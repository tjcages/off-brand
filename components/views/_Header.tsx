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
        <h5>Collection</h5>
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
        <h5>News</h5>
        <div className={styles.v}>
          <h5>AWS 2022</h5>
          <h5>Forgotten Spaces</h5>
          <h5>Lookbook</h5>
        </div>
      </div>

      <div className={clsx(styles.v, styles.spaced)}>
        <h5>Information</h5>
        <div className={styles.v}>
          <h5>Brooklyn, New York</h5>
          <h5>6:00PM EST</h5>
        </div>
      </div>

      <div className={clsx(styles.v, styles.spaced)}>
        <h5>Cart</h5>
        <div className={styles.v}>
          <h5>(0)</h5>
        </div>
      </div>
    </header>
  );
};

export default _;
