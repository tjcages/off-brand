import { useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/mobile.module.scss";
import { useSnapshot } from "valtio";
import Lenis from "@studio-freight/lenis";

import { projects } from "@/data";
import { state } from "@/store";
import { Scroll } from "@/modules";
import { useMedia, mobileBreakpoint } from "@/utils";

import Slider from "./_Slider";
import Selected from "./_Selected";

interface Props {
  scroll: Scroll | null;
}

const _ = ({ scroll }: Props) => {
  const mobile = useMedia(mobileBreakpoint);
  const snap = useSnapshot(state);
  const slider = useRef() as React.RefObject<HTMLDivElement>;
  const lenis = useRef<Lenis | null>(null);
  const selected = useRef<number>(-1);

  const handleScroll = (percent: number) => {
    const index = Math.round(percent * projects.length) - 1;
    if (index == selected.current || index >= projects.length) return;

    selected.current = index;
    if (index < 0) {
      state.currentIndex = -1;
      state.selected = null;
    } else {
      state.currentIndex = index;
      state.selected = {
        id: projects[index].id || "",
        src: projects[index].preview,
      };
    }
  };

  useEffect(() => {
    // mobile
    if (!snap.loaded) return;
    if (!slider.current) return;
    if (!mobile) return;
    const lenisScroll = new Lenis({
      wrapper: slider.current,
      orientation: "horizontal",
    });

    lenisScroll.on("scroll", (e: any) => {
      const current = e.animatedScroll;
      const max = (slider.current?.scrollWidth || 0) - window.innerWidth;
      const percent = current / max;
      handleScroll(percent);
    });
    lenis.current = lenisScroll;

    return () => {
      lenisScroll.destroy();
    };
  }, [snap.loaded, slider.current, scroll]);

  useEffect(() => {
    // desktop
    handleScroll(snap.scrollPercentage);
  }, [snap.scrollPercentage]);

  return (
    <div className={clsx(styles.main, snap.loaded && styles.visible)}>
      {projects.map((project, index) => (
        <Selected
          key={`selected-${project.id}`}
          index={index}
          project={project}
          selected={snap.loaded && snap.currentIndex == index}
        />
      ))}
      <Slider
        ref={slider}
        data={projects}
        loaded={snap.loaded}
        selected={snap.currentIndex}
        onSelect={(offset, index) => {
          if (scroll) {
            const percentage = index / projects.length;
            const current = percentage * scroll.y.limit;
            scroll.scrollTo(current);
            state.currentIndex = index;
          } else {
            const currentLeft = slider.current?.scrollLeft || 0;
            const relative = currentLeft + offset;

            if (lenis.current) {
              slider.current?.scrollTo({
                left: relative,
                behavior: "smooth",
              });
            }
          }
        }}
      />
    </div>
  );
};

export default _;
