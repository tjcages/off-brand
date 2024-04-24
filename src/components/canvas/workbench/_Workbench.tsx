import { state } from "@/store";
import { useDevice } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Content from "@/components/canvas/sandboxes/_Content";
import Modal from "@/components/canvas/sandboxes/_Modal";

import Dashboard from "./_Dashboard";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0, 0, 0] }: Props) => {
  const { isMobile, isTablet } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep, wbSelectedModal } = useSnapshot(state);

  useFrame(({ pointer }) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.x = rotation[0] - pointer.y / 400;
      ref.current.rotation.y = rotation[1] + pointer.x / 50;
      ref.current.rotation.z = rotation[2] - pointer.y / 400;
    }
  });

  useEffect(() => {
    if (selectedStep === 3 && state.wbSelectedModal === undefined)
      gsap.delayedCall(1.5, () => (state.wbSelectedModal = 1));
    else if ((selectedStep || 0) < 3) state.wbSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <e.group ref={ref} theatreKey="workbench-content" rotation={rotation} position={[0, 2, -8]}>
      <Dashboard visible={selectedStep === 3} modalStep={wbSelectedModal} />

      {/* Introducing Workbench */}
      <group position={[0, 0, 0]}>
        <Content
          visible={wbSelectedModal === 1}
          url={"/textures/stripe/workbench/ui1.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-1"
          visible={wbSelectedModal === 1}
          title="Introducing Workbench"
          description="See your Stripe integration’s health and activity with one tap. Summon Workbench from anywhere in the Stripe Dashboard."
          position={[1.5, 0.9, 0]}
        />
      </group>

      {/* Logging and events */}
      <group position={[0, 0.15, 0.025]}>
        <Content
          visible={wbSelectedModal === 2}
          url={"/textures/stripe/workbench/ui2.png"}
          position={[0, -0.55, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-2"
          visible={wbSelectedModal === 2}
          title="Logging and events"
          description="Dig in and troubleshoot with powerful filtering on a complete view of your logs and events."
          position={[-1.5, 0.8, 0]}
        />
      </group>

      {/* Inspector */}
      <group position={[0, 0, 0.05]}>
        <Content
          visible={wbSelectedModal === 3}
          url={"/textures/stripe/workbench/ui3.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-3"
          visible={wbSelectedModal === 3}
          title="Inspector"
          description="Peek under the hood at the JSON of any Stripe Dashboard object in a click. View the object’s logs and its state changes over time to understand or debug your integration."
          position={[1.5, 1, 0]}
        />
      </group>

      {/* Shell and API explorer */}
      <group position={[0, 0, 0.075]}>
        <Content
          visible={wbSelectedModal === 4}
          url={"/textures/stripe/workbench/ui4.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.47
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-4"
          visible={wbSelectedModal === 4}
          title="Shell and API Explorer"
          description="Understand available API resources and build runnable commands in the shell. When you’re ready to build, print code snippets in the language you need."
          position={[1.5, 1, 0]}
        />
      </group>
    </e.group>
  );
};

export default _;
