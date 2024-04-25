import { state } from "@/store";
import { useDevice } from "@/utils";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Modal from "@/components/canvas/sandboxes/_Modal";

import Dashboard from "./_Dashboard";
import Slider from "./_Slider";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0, 0, 0] }: Props) => {
  const { isMobile } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep, wbSelectedModal } = useSnapshot(state);

  useEffect(() => {
    if (selectedStep === 3 && state.wbSelectedModal === undefined)
      gsap.delayedCall(1.5, () => (state.wbSelectedModal = 1));
    else if ((selectedStep || 0) < 3) state.wbSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <e.group ref={ref} theatreKey="workbench-content" rotation={rotation} position={[0, 2, -8]}>
      <Dashboard visible={selectedStep === 3} modalStep={wbSelectedModal} />

      <group rotation={[0.1, 0, 0]}>
        <Slider
          visible={wbSelectedModal}
          ui={[
            "/textures/stripe/workbench/ui1.png",
            "/textures/stripe/workbench/ui2.png",
            "/textures/stripe/workbench/ui3.png",
            "/textures/stripe/workbench/ui4.png"
          ]}
          heights={[1538, 1538, 1252, 1538]}
        />

        {/* Modal overlays */}
        <Modal
          theatreKey="wb-modal-1"
          visible={wbSelectedModal === 1}
          title="Introducing Workbench"
          description="See your Stripe integration's health and activity with one tap. Summon Workbench from anywhere in the Stripe Dashboard."
          position={[isMobile ? 0.3 : 0.7, isMobile ? 0.85 : 0.35, 2]}
        />
        <Modal
          visible={wbSelectedModal === 2}
          title="Logging and events"
          description="Dig in and troubleshoot with powerful filtering on a complete view of your logs and events."
          position={[isMobile ? -0.2 : -0.75, isMobile ? 0.7 : -0.5, 2]}
        />
        <Modal
          visible={wbSelectedModal === 3}
          title="Inspector"
          description="Peek under the hood at the JSON of any API object. View the object's request logs and state changes over time to understand and debug your integration."
          position={[isMobile ? 0.35 : 0.75, isMobile ? 0.75 : -0.35, 2]}
        />
        <Modal
          visible={wbSelectedModal === 4}
          title="Shell and API Explorer"
          description="Build API requests with the API Explorer, and run them from the Shell. When you're ready to code, use the generated snippets in the language you need."
          position={[isMobile ? -0.25 : -0.75, isMobile ? 0.75 : 0.15, 2]}
        />
      </group>
    </e.group>
  );
};

export default _;
