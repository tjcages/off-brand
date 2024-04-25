import { state } from "@/store";
import { useDevice } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Modal from "@/components/canvas/sandboxes/_Modal";
import Slider from "@/components/canvas/workbench/_Slider";

import Dashboard from "./_Dashboard";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0.02, -0.63, -0.055] }: Props) => {
  const { isMobile } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep, edSelectedModal } = useSnapshot(state);

  useFrame(({ pointer }) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.x = rotation[0] - pointer.y / 400;
      ref.current.rotation.y = rotation[1] + pointer.x / 50;
      ref.current.rotation.z = rotation[2] - pointer.y / 400;
    }
  });

  useEffect(() => {
    if (selectedStep === 4 && state.edSelectedModal === undefined)
      gsap.delayedCall(1.5, () => (state.edSelectedModal = 1));
    else if ((selectedStep || 0) < 4) state.edSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <group ref={ref} rotation={rotation} position={[2.59, 3.41, -17.48]}>
      <Dashboard visible={selectedStep === 4} modalStep={edSelectedModal} />

      <group rotation={[0, 0, 0]} position={[0, 0.15, 0]}>
        <Slider
          visible={edSelectedModal}
          ui={[
            "/textures/stripe/event-destinations/ui1.png",
            "/textures/stripe/event-destinations/ui2.png",
            "/textures/stripe/event-destinations/ui3.png"
          ]}
          heights={[1538, 1686, 1538]}
        />

        {/* Modal overlays */}
        <Modal
          visible={edSelectedModal === 1}
          title="Destination types"
          description="Receive events with webhooks, or skip writing custom integration code and send to popular cloud providers, starting with AWS."
          position={[isMobile ? 0.3 : 0.65, isMobile ? 0.9 : 0.25, 2]}
        />
        <Modal
          visible={edSelectedModal === 2}
          title="Event management"
          description="Improved event selection makes it easier to select only the events that matter to your integration."
          position={[isMobile ? -0.2 : -0.65, isMobile ? 0.75 : -0.1, 2]}
        />
        <Modal
          visible={edSelectedModal === 3}
          title="Event monitoring"
          description="Build reliable event integrations capable of scaling to spikes at a moment's notice."
          position={[isMobile ? 0.35 : 0.75, isMobile ? 0.75 : -0.4, 2]}
        />
      </group>
    </group>
  );
};

export default _;
