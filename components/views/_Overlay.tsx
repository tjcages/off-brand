import styles from "@/styles/overlay.module.scss";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  console.log(snap.view);

  return (
    <div className={styles.main}>
      <button
        onClick={() => (state.view = snap.view == "grid" ? "linear" : "grid")}
      >
        <div className={styles.grid}>
          <div className={styles.square} />
          <div className={styles.square} />
          <div className={styles.square} />
          <div className={styles.square} />
        </div>
      </button>
    </div>
  );
};

export default _;
