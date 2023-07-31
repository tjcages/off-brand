import { useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/mobile.module.scss";
import { useSnapshot } from "valtio";
import Lenis from "@studio-freight/lenis";

import { projects } from "@/data";
import { state } from "@/store";

import Slider from "./_Slider";
import Selected from "./_Selected";

const _ = () => {
  const snap = useSnapshot(state);
  const slider = useRef() as React.RefObject<HTMLDivElement>;
  const scroll = useRef<Lenis | null>(null);
  const selected = useRef<number>(-1);

  const handleScroll = (e: any) => {
    const current = e.animatedScroll;
    const max = (slider.current?.scrollWidth || 0) - window.innerWidth;
    const percent = current / max;
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
    if (!snap.loaded) return;
    if (!slider.current) return;

    const lenis = new Lenis({
      wrapper: slider.current,
      orientation: "horizontal",
    });

    lenis.on("scroll", handleScroll);
    scroll.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [snap.loaded, slider.current]);

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
        onSelect={(offset) => {
          const currentLeft = slider.current?.scrollLeft || 0;
          const relative = currentLeft + offset;

          if (scroll.current) {
            slider.current?.scrollTo({
              left: relative,
              behavior: "smooth",
            });
          }
        }}
      />
    </div>
  );
};

export default _;
