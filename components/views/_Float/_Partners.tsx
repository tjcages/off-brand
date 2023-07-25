import { useRef, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/float.module.scss";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { partners } from "@/data";

const float = "partners";
const margin = 20;

const _ = () => {
  const snap = useSnapshot(state);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const lastPosition = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    if (snap.hover == float) {
      gsap.to(`#cover-${float}`, {
        width: "auto",
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      });
    } else {
      gsap.to(`#cover-${float}`, {
        width: "0%",
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.inOut",
        overwrite: true,
      });
    }
  }, [snap.hover]);

  useEffect(() => {
    let x = snap.position.x;
    let y = snap.position.y;

    // enable hover over float
    if (lastPosition.current.x && lastPosition.current.y) {
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;

      // decrease movement if moving down & left
      if (dx < 0.5 && dy > 0.5) {
        const rect = ref.current.getBoundingClientRect();
        if (Math.abs(dx) > rect.width || Math.abs(dy) > rect.height) return;

        gsap.to(ref.current, {
          x: x - dx / 1.2 - window.innerWidth - margin,
          y: y - dy / 1.2 + margin,
          duration: 2,
          ease: "expo.out",
        });
        return;
      } else {
        gsap.to(ref.current, {
          x: x - window.innerWidth - margin,
          y: y + margin,
          duration: 1,
          ease: "expo.out",
        });
      }
    }
    lastPosition.current = snap.position;
  }, [snap.position.x, snap.position.y, snap.hover]);

  return (
    <div
      ref={ref}
      id={`cover-${float}`}
      className={clsx(
        styles.stack,
        styles.right,
        snap.hover == float && styles.active
      )}
      onMouseEnter={() => {
        document.body.style.cursor = "crosshair";
        state.hover = float;
      }}
      onMouseLeave={() => {
        document.body.style.cursor = "grab";
        state.hover = null;
      }}
    >
      {partners.map((partner, i) => (
        <Link
          key={`${float}-${i}`}
          id={`cover-${float}`}
          href={partner.href}
          target="_blank"
          className={styles.container}
        >
          <h5>{partner.position}</h5>
          <Image
            className={styles.arrow}
            src="/imgs/icons/arrow-light.png"
            alt="arrow"
            width={32}
            height={32}
          />
          <h5>{partner.name}</h5>
        </Link>
      ))}
    </div>
  );
};

export default _;
