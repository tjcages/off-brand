import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import gsap from "gsap";
import styles from "@/styles/mobile.module.scss";
import { useMedia, mobileBreakpoint } from "@/utils";
import { ProjectProps } from "@/data";
import { state } from "@/store";

export type Ref = HTMLDivElement;
interface Props {
  data: ProjectProps[];
  loaded: boolean;
  selected: number;
  onSelect: (offset: number, index: number) => void;
}

const _ = forwardRef<Ref, Props>(
  ({ data, loaded, selected, onSelect }, ref) => {
    const mobile = useMedia(mobileBreakpoint);

    // update items
    useEffect(() => {
      state.items = data;
    }, []);

    useEffect(() => {
      if (!loaded) return;
      const tl = gsap.timeline();
      tl.to("#project", {
        x: "0%",
        y: "0%",
        delay: 0.5,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
      });
    }, [loaded]);

    return (
      <div
        ref={ref}
        className={styles.content}
        data-scroll="0"
        onClick={(e) => {
          if (selected == -1) return;
          if (state.hoverProject == state.selected?.id) {
            state.hoverProject = null;
          } else {
            if (!mobile) return;
            // detect if click within the middle 60% height of the screen
            const middle =
              e.clientY > window.innerHeight * 0.2 &&
              e.clientY < window.innerHeight * 0.8;
            if (!middle) return;

            state.hoverProject = state.selected?.id ?? null;
            state.position = {
              x: e.clientX,
              y: e.clientY,
            };
          }
        }}
      >
        <div className={styles.slider}>
          <div className={styles.spacer} />
          {data.map((project, index) => (
            <div
              key={project.id}
              className={styles.container}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                if (rect) onSelect(mobile ? rect.left : rect.top, index);
              }}
            >
              <Image
                id="project"
                className={styles.project}
                priority
                src={project.preview}
                alt={project.name}
                width={200}
                height={100}
              />
            </div>
          ))}
          <div className={clsx(styles.spacer, styles.large)} />
        </div>
      </div>
    );
  }
);

export default _;
