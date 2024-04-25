import { state } from "@/store";
import { useDevice } from "@/utils";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Modal from "@/components/canvas/sandboxes/_Modal";

import Dashboard from "./_Dashboard";
import Slider from "./slider";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0.1, 0, 0] }: Props) => {
  const { isMobile, isSafari } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep, wbSelectedModal } = useSnapshot(state);

  useEffect(() => {
    if (selectedStep === 3 && state.wbSelectedModal === undefined)
      gsap.delayedCall(1.5, () => (state.wbSelectedModal = 1));
    else if ((selectedStep || 0) < 3) state.wbSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <group ref={ref} rotation={rotation} position={[0, 3, -12.25]}>
      <Dashboard visible={selectedStep === 3} modalStep={wbSelectedModal} />

      <group>
        <Slider
          show={(selectedStep || 0) >= 3}
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
          visible={wbSelectedModal === 1}
          title="Introducing Workbench"
          description="See your Stripe integration's health and activity with one tap. Summon Workbench from anywhere in the Stripe Dashboard."
          position={[isMobile ? 0 : 0.7, isMobile ? 0.4 : isSafari ? 0.1 : 0.35, isMobile ? 3 : 2]}
        />
        <Modal
          visible={wbSelectedModal === 2}
          title="Logging and events"
          description="Dig in and troubleshoot with powerful filtering on a complete view of your logs and events."
          position={[isMobile ? 0 : -0.75, isMobile ? 0.7 : -0.5, isMobile ? 3 : 2]}
        />
        <Modal
          visible={wbSelectedModal === 3}
          title="Inspector"
          description="Peek under the hood at the JSON of any API object. View the object's request logs and state changes over time to understand and debug your integration."
          position={[
            isMobile ? 0.15 : isSafari ? 0.6 : 0.75,
            isMobile ? 0.65 : isSafari ? -0.5 : -0.35,
            isMobile ? 3 : 2
          ]}
        />
        <Modal
          visible={wbSelectedModal === 4}
          title="Shell and API Explorer"
          description="Build API requests with the API Explorer, and run them from the Shell. When you're ready to code, use the generated snippets in the language you need."
          position={[
            isMobile ? -0.05 : -0.75,
            isMobile ? 0.65 : isSafari ? -0.2 : 0.15,
            isMobile ? 3 : 2
          ]}
        />
      </group>
    </group>
  );
};

export default _;
