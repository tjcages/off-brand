import { state } from "@/store";
import { useDevice } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Content from "./_Content";
import Dashboard from "./_Dashboard";
import Modal from "./_Modal";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0.02, 0.63, 0.055] }: Props) => {
  const { isMobile } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep, sbSelectedModal } = useSnapshot(state);

  useFrame(({ pointer }) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.x = rotation[0] - pointer.y / 400;
      ref.current.rotation.y = rotation[1] + pointer.x / 50;
      ref.current.rotation.z = rotation[2] - pointer.y / 400;
    }
  });

  useEffect(() => {
    if (selectedStep === 2 && state.sbSelectedModal === undefined)
      gsap.delayedCall(1.5, () => (state.sbSelectedModal = 1));
    else if ((selectedStep || 0) < 2) state.sbSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <e.group theatreKey="sandboxes-content" ref={ref} rotation={rotation} position={[0, 2, -8]}>
      <Dashboard visible={selectedStep === 2} modalStep={sbSelectedModal} />

      {/* Isolated sandboxes */}
      <group position={[0, 0, 0]}>
        <Content
          visible={sbSelectedModal === 1}
          url={"/textures/stripe/sandboxes/ui1.png"}
          position={[0, -0.1, 1.25]}
          size={{
            width: 2,
            height: 1.48
          }}
        />
        <Modal
          visible={sbSelectedModal === 1}
          title="Isolated sandboxes"
          description="Create isolated testing environments for staging and development, or a feature branch."
          position={[isMobile ? -0.25 : -1.2, isMobile ? 0.25 : -0.4, isMobile ? 1.5 : 0.5]}
        />
      </group>

      {/* Templates */}
      <group position={[0, 0.15, 0.1]}>
        <Content
          visible={sbSelectedModal === 2}
          url={"/textures/stripe/sandboxes/ui2.png"}
          position={[0, -0.25, 1.25]}
          size={{
            width: 2,
            height: 1.5
          }}
        />
        <Modal
          visible={sbSelectedModal === 2}
          title="Templates"
          description="Start testing quickly with templates, which populate test data for common business models."
          position={[isMobile ? 0.25 : 1.5, isMobile ? 0 : 0.65, isMobile ? 1.5 : 0.5]}
        />
      </group>

      {/* Sandbox only access */}
      <group position={[0, 0, 0.2]}>
        <Content
          visible={sbSelectedModal === 3}
          url={"/textures/stripe/sandboxes/ui3.png"}
          position={[isMobile ? -0.7 : -1.1, isMobile ? 0.4 : 0.6, isMobile ? 1.5 : 1.1]}
          size={{
            width: 1,
            height: 0.79
          }}
          scaleGlow={0.5}
        />
        <Modal
          visible={sbSelectedModal === 3}
          title="Sandbox-only access"
          description="Limit access to sensitive business data with sandbox-only access, perfect for working with external partners."
          position={[isMobile ? -0.25 : -1.25, isMobile ? 0.15 : -0.125, isMobile ? 1.5 : 0.5]}
        />
      </group>
    </e.group>
  );
};

export default _;
