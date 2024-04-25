import { Image } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface Props {
  show?: boolean;
  visible?: number;
  ui: string[];
  heights: number[];
}

interface PageProps {
  show?: boolean;
  visible: boolean;
  url: string;
  height: number;
}

const Page = ({ show, visible, url, height }: PageProps) => {
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;

  useEffect(() => {
    if (show && visible)
      gsap.to(ref.current.material, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "expo.inOut"
      });
    // else
    //   gsap.to(ref.current.material, {
    //     opacity: 0,
    //     duration: 2,
    //     ease: "expo.inOut"
    //   });
  }, [show, visible]);

  return (
    <Image
      ref={ref}
      url={url}
      // @ts-expect-error no alt tag for image
      alt="Workbench"
      scale={[3, (height / 2560) * 3]}
      position={[0, height === 1538 ? -0.25 : height === 1686 ? -0.15 : -0.4, 1]}
      transparent
      opacity={visible ? 1 : 0}
      visible={visible}
    />
  );
};

const _ = ({ show, visible, ui, heights }: Props) => {
  return (
    <group>
      {ui.map((url, index) => (
        <Page
          key={index}
          url={url}
          height={heights[index]}
          show={show}
          visible={visible === index + 1}
        />
      ))}
    </group>
  );
};

export default _;
