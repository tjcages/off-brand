import { forwardRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "@/styles/mobile.module.scss";

import { ProjectProps } from "@/data";

export type Ref = HTMLDivElement;
interface Props {
  data: ProjectProps[];
  onSelect: (offset: number) => void;
}

const _ = forwardRef<Ref, Props>(({ data, onSelect }, ref) => (
  <div ref={ref} className={styles.slider}>
    <div className={styles.spacer} />
    {data.map((project) => (
      <div className={styles.container}>
        <Image
          key={project.id}
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
));

export default _;
