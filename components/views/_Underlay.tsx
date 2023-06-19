import Image from "next/image";
import { useSnapshot } from "valtio";
import styles from "@/styles/underlay.module.scss";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <div
      className={`${styles.main} ${
        snap.view == "intro"
          ? styles.intro
          : snap.view == "grid"
          ? styles.visible
          : ""
      }`}
    >
      <Image src="/imgs/logo.png" alt="logo" width={800} height={400} />
      {/* <h3>Bring order to your creative universe</h3>
      <button onClick={() => (state.view = "grid")}>Enter</button> */}

      <div className={styles.notice}>
        <h5>(1 - {snap.items.length})</h5>
        <h5>
          Saved projects, mixed VIDEO & IMAGES, generated for COSMOS creatives &
          collaborators.
        </h5>
      </div>
    </div>
  );
};

export default _;
