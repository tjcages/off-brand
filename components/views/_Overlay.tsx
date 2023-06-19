import Image from "next/image";
import styles from "@/styles/overlay.module.scss";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <div
      className={`${styles.main} ${
        snap.view !== "intro" ? styles.visible : ""
      }`}
    >
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

      <Image
        className={`${styles.selected} ${
          snap.view == "linear" ? styles.visible : ""
        }`}
        src={snap.selected}
        alt=""
        width={1000}
        height={2000}
      />
    </div>
  );
};

export default _;
