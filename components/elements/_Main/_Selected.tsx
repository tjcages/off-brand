import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/mobile.module.scss";
import { ProjectProps } from "@/data";
import { state } from "@/store";
import { useMedia, mobileBreakpoint } from "@/utils";

import Video from "./_Video";

interface Props {
  index: number;
  project: ProjectProps;
  selected: boolean;
}

const _ = ({ project, index, selected }: Props) => {
  const mobile = useMedia(mobileBreakpoint);
  return (
    <div
      className={clsx(styles.selected, selected && styles.open)}
      onTouchStart={(e) => {
        if (!mobile) return;
        state.hoverProject = project.id ?? null;
        state.position = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }}
      onClick={() => {
        if (mobile) return;
        state.hoverProject = null;
      }}
    >
      <div
        onClick={(e) => {
          if (mobile) return;
          e.stopPropagation();
          state.hoverProject = state.selected?.id ?? null;
          state.position = {
            x: e.clientX,
            y: e.clientY,
          };
        }}
      >
        {project.content && project.content.length ? (
          project.content[0].type == "video" ? (
            <Video
              id={`video-${index}`}
              src={project.content[0].src}
              fallback={project.preview}
              selected={selected}
            />
          ) : (
            <Image
              id={`video-${index}`}
              src={project.content[0].src}
              alt={project.name}
              width={1000}
              height={1000}
            />
          )
        ) : (
          <Image
            id={`video-${index}`}
            src={project.preview}
            alt={project.name}
            width={1000}
            height={1000}
          />
        )}
      </div>
    </div>
  );
};

export default _;
