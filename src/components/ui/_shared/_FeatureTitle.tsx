import { gsap } from "gsap";

import ScrambleText from "./_ScrambleText";

interface Props {
  title: string;
}

const _ = ({ title }: Props) => {
  return (
    <h1
      ref={node => {
        gsap.to(node, {
          opacity: 1,
          duration: 0.5,
          ease: "expo.out"
        });
      }}
      className="absolute bottom-0 fs-3 leading-snug whitespace-nowrap opacity-0"
    >
      <ScrambleText>{title}</ScrambleText>
    </h1>
  );
};

export default _;
