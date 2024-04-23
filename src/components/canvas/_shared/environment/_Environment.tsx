import { Environment } from "@react-three/drei";

import Shader from "./_Shader";

interface Props {
  background?: boolean;
}

const _ = ({ background = true }: Props) => {
  return (
    <Environment
      // preset="sunset"
      resolution={1024}
      frames={Infinity}
      background={background}
      blur={0.5}
    >
      <Shader />
    </Environment>
  );
};

export default _;
