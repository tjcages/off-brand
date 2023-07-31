import { useSnapshot } from "valtio";
import { state } from "@/store";
import { ProjectProps } from "@/data";

import Image from "./_Image";
import Video from "./_Video";

const _ = () => {
  const snap = useSnapshot(state);

  if (snap.selected === null) return null;

  const project = snap.items.find(
    (item) => item.id === snap.selected?.id
  ) as ProjectProps;

  return (
    <group
      onPointerMove={(e) => {
        state.position = {
          x: e.x,
          y: e.y,
        };
      }}
      onPointerEnter={() => {
        document.body.style.cursor = "crosshair";
        state.hoverProject = snap.selected?.id ?? null;
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "grab";
        state.hoverProject = null;
      }}
      onClick={() => project.href && window.open(project.href, "_blank")}
    >
      {project.content && project.content.length > 0 ? (
        project.content[0].type == "video" ? (
          <Video src={project.content[0].src} />
        ) : (
          <Image src={project.content[0].src} />
        )
      ) : (
        <Image src={snap.selected.src} />
      )}
    </group>
  );
};

export default _;
