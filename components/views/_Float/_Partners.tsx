import { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { partners } from "@/data";

const float = "partners";

const _ = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (snap.hover == float) {
      gsap.to(`#cover-${float}`, {
        scaleX: "100%",
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      });
    } else {
      gsap.to(`#cover-${float}`, {
        scaleX: "0%",
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.inOut",
        overwrite: true,
      });
    }
  }, [snap.hover]);

  return (
    <div
      id={`stack-${float}`}
      className={clsx(styles.stack, snap.hover == float && styles.active)}
    >
      {partners.map((partner, i) => (
        <div key={`${float}-${i}`} className={styles.container}>
          <div id={`cover-${float}`} className={styles.cover} />
          <h5>{partner.position}</h5>
          <Image
            className={styles.arrow}
            src="/imgs/icons/arrow-light.png"
            alt="arrow"
            width={32}
            height={32}
          />
          <h5>{partner.name}</h5>
        </div>
      ))}
    </div>
  );
};

export default _;
