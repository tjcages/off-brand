import { useSnapshot } from "valtio";
import styles from "@/styles/underlay.module.scss";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <section
      className={`${styles.main} ${snap.view == "grid" ? styles.visible : ""}`}
    >
      <h4
        style={{
          visibility:
            snap.view == "linear" && snap.selected ? "hidden" : "visible",
        }}
      >
        Off_Brand
      </h4>
      <h4>[0 → 1]</h4>
      <h4>Creative Studio, New York City</h4>
    </section>
  );
};

export default _;
