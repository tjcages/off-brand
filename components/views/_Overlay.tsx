import { useEffect } from "react";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import styles from "@/styles/overlay.module.scss";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (!snap.loaded) return;
    gsap.to("#overlay", {
      scaleY: 0,
      duration: 1,
      ease: "expo.inOut",
    });
  }, [snap.loaded]);

  return <div id="overlay" className={styles.main} />;
};

export default _;
