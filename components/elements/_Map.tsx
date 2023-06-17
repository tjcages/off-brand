import { useRef, createRef, useEffect } from "react";
import { motion } from "framer-motion";
import { state } from "@/store";
import data from "@/data";
import styles from "@/styles/map.module.scss";
import { useSnapshot } from "valtio";

const _ = () => {
  const snap = useSnapshot(state);
  const mapRef = useRef() as any;
  const mapPosRef = useRef() as any;

  const mapPosRect = useRef() as any;

  useEffect(() => {
    if (!mapRef.current || !mapPosRef.current) return;

    mapPosRect.current = mapPosRef.current.getBoundingClientRect();
  }, []);

  return (
    <div
      ref={mapRef}
      className={styles.map}
      style={{
        width: snap.map.width * 10 + "px",
        height: snap.map.height * 10 + "px",
        opacity: snap.view == "grid" ? 0.7 : 0,
      }}
    >
      <div className={styles.container}>
        {snap.items.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.4 + i / 15, duration: 0.4 },
            }}
            className={styles.item}
            style={{
              width: project.width * 10 + "px",
              height: project.height * 10 + "px",
              top: (1 - project.y) * 10 + "px",
              left: project.x * 10 + "px",
            }}
          ></motion.div>
        ))}
      </div>
      <motion.div
        ref={mapPosRef}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.6 + data.length / 10 },
        }}
        className={styles.position}
        style={{
          width: snap.mapPos.width * 10 + "px",
          height: snap.mapPos.height * 10 + "px",
          top: snap.mapPos.top * 100 + "%",
          left: snap.mapPos.left * 100 + "%",
        }}
      />
    </div>
  );
};

export default _;
