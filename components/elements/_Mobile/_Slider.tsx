import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import gsap from "gsap";
import styles from "@/styles/mobile.module.scss";

import { ProjectProps } from "@/data";

export type Ref = HTMLDivElement;
interface Props {
  data: ProjectProps[];
  loaded: boolean;
  onSelect: (offset: number) => void;
}

const _ = forwardRef<Ref, Props>(({ data, loaded, onSelect }, ref) => {
  useEffect(() => {
    if (!loaded) return;
    const tl = gsap.timeline();
    tl.to("#project", {
      y: "0%",
      delay: 0.5,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out",
    });
  }, [loaded]);

  return (
    <div ref={ref} className={styles.content}>
      <div className={styles.slider}>
        <div className={styles.spacer} />
        {data.map((project) => (
          <div key={project.id} className={styles.container}>
            <Image
              id="project"
              className={styles.project}
              priority
              src={project.preview}
              alt={project.name}
              width={200}
              height={100}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                if (rect) onSelect(rect.left);
              }}
            />
          </div>
        ))}
        <div className={clsx(styles.spacer, styles.large)} />
      </div>
    </div>
  );
});

export default _;
