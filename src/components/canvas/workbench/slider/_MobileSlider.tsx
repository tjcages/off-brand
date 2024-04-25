import { Image } from "@react-three/drei";

interface Props {
  visible?: number;
  ui: string[];
  heights: number[];
}

const _ = ({ visible, ui, heights }: Props) => {
  return (
    <group>
      {ui.map((url, index) => (
        <Image
          key={url}
          url={url}
          // @ts-expect-error no alt tag for image
          alt="Workbench"
          scale={[3, (heights[index] / 2560) * 3]}
          position={[
            0,
            heights[index] === 1538 ? -0.25 : heights[index] === 1686 ? -0.15 : -0.4,
            1
          ]}
          transparent
          opacity={visible === index + 1 ? 1 : 0}
          visible={visible === index + 1}
        />
      ))}
    </group>
  );
};

export default _;
