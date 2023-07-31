import { useRef, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/mobile.module.scss";
import { useSnapshot } from "valtio";
import Lenis from "@studio-freight/lenis";

import { projects, ProjectProps } from "@/data";
import { state } from "@/store";

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
    if (index == selected.current || index > projects.length) return;

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
    if (!slider.current) return;
    const lenis = new Lenis({
      wrapper: slider.current,
      orientation: "horizontal",
      smoothTouch: true,
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on("scroll", handleScroll);
    scroll.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [slider.current]);

  return (
    <div className={clsx(styles.main, snap.loaded && styles.visible)}>
      <Selected
        index={selected.current}
        selected={
          selected.current !== null && selected.current >= 0
            ? projects[selected.current]
            : null
        }
      />
      <div ref={slider} className={styles.slider}>
        <div className={styles.spacer} />
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={styles.project}
            onClick={(e) => {
              const offset = e.currentTarget.getBoundingClientRect().left;
              const currentLeft = slider.current?.scrollLeft || 0;
              const relative = currentLeft + offset;

              if (scroll.current) {
                console.log(e.target);
                slider.current?.scrollTo({
                  left: relative,
                  behavior: "smooth",
                });
              }
            }}
          >
            <Image
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
};

interface SelectedProps {
  index?: number;
  selected: ProjectProps | null;
}

const Selected = ({ selected, index }: SelectedProps) => {
  return (
    <div className={clsx(styles.selected, selected !== null && styles.open)}>
      {selected &&
        (selected.content && selected.content.length ? (
          selected.content[0].type == "video" ? (
            <Video
              id={`video-${index}`}
              src={selected.content[0].src}
              fallback={selected.preview}
            />
          ) : (
            <Image
              id={`video-${index}`}
              src={selected.content[0].src}
              alt={selected.name}
              width={1000}
              height={1000}
            />
          )
        ) : (
          <Image
            id={`video-${index}`}
            src={selected.preview}
            alt={selected.name}
            width={1000}
            height={1000}
          />
        ))}
    </div>
  );
};

interface VideoProps {
  id: string;
  src: string;
  fallback: string;
}

const Video = ({ id, src, fallback }: VideoProps) => {
  return (
    <video id={id} loop muted playsInline autoPlay>
      <source src={src} type="video/mp4" />
      <Image src={fallback} alt="video" width={1000} height={1000} />
    </video>
  );
};

export default _;
