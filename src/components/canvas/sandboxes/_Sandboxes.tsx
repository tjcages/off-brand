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
  const { isMobile, isTablet } = useDevice();
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
            width: 1.8,
            height: 1.33
          }}
        />
        <Modal
          theatreKey="sb-modal-1"
          visible={sbSelectedModal === 1}
          title="Isolated sandboxes"
          description="Create isolated testing environments for staging and development, or a feature branch."
          position={[-1.5, 0.5, 1]}
        />
      </group>

      {/* Templates */}
      <group position={[0, 0.15, 0.1]}>
        <Content
          visible={sbSelectedModal === 2}
          url={"/textures/stripe/sandboxes/ui2.png"}
          position={[0, -0.25, 1.25]}
          size={{
            width: 1.8,
            height: 1.35
          }}
        />
        <Modal
          theatreKey="sb-modal-2"
          visible={sbSelectedModal === 2}
          title="Templates"
          description="Start testing quickly with templates, which populate test data for common business models."
          position={[1.5, 0.65, 0.5]}
        />
      </group>

      {/* Sandbox only access */}
      <group position={[0, 0, 0.2]}>
        <Content
          visible={sbSelectedModal === 3}
          url={"/textures/stripe/sandboxes/ui3.png"}
          position={[-1.1, 0.6, 1.1]}
          size={{
            width: 1,
            height: 0.79
          }}
          scaleGlow={0.5}
        />
        <Modal
          theatreKey="sb-modal-3"
          visible={sbSelectedModal === 3}
          title="Sandbox-only access"
          description="Limit access to sensitive business data with sandbox-only access, perfect for working with external partners."
          position={[-1.25, -0.125, 0.5]}
        />
      </group>
    </e.group>
  );
};

export default _;
