import Image from "next/image";
import { useSnapshot } from "valtio";
import styles from "@/styles/underlay.module.scss";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);

  return (
    <div
      className={`${styles.main} ${snap.view == "grid" ? styles.visible : ""}`}
    >
      <Image src="/imgs/logo.png" alt="logo" width={800} height={400} />
      <h3>Bring order to your creative universe</h3>
      <button>Enter</button>
    </div>
  );
};

export default _;
