import { state } from "@/store";
import { useDevice } from "@/utils";
import { useFrame } from "@react-three/fiber";
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

      {/* Destination types */}
      <group position={[0, 0, 0]}>
        <Content
          visible={edSelectedModal === 1}
          url={"/textures/stripe/event-destinations/ui2.png"}
          position={[0, -0.12, 0.8]}
          size={{
            width: 3,
            height: 1.8
          }}
          bottom
        />

        <Modal
          theatreKey="wb-modal-1"
          visible={edSelectedModal === 1}
          title="Destination types"
          description="Receive events with webhooks, or skip writing custom integration code and send to popular cloud providers, starting with AWS."
          position={[isMobile ? 0.3 : 1.3, isMobile ? 0.9 : 0.57, isMobile ? 1.5 : 0]}
        />
      </group>

      {/* Event management */}
      <group position={[0, 0, 0]}>
        <Content
          visible={edSelectedModal === 2}
          url={"/textures/stripe/event-destinations/ui3.png"}
          position={[0, 0, 0.8]}
          size={{
            width: 3,
            height: 1.975
          }}
          bottom
        />

        <Modal
          theatreKey="wb-modal-2"
          visible={edSelectedModal === 2}
          title="Event management"
          description="Improved event selection makes it easier to select only the events that matter to your integration."
          position={[isMobile ? -0.2 : -1.25, isMobile ? 0.75 : -0.2, isMobile ? 1.5 : 0]}
        />
      </group>

      {/* Event monitoring */}
      <group position={[0, 0, 0]}>
        <Content
          visible={edSelectedModal === 3}
          url={"/textures/stripe/event-destinations/ui4.png"}
          position={[0, -0.12, 0.8]}
          size={{
            width: 3,
            height: 1.8
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-3"
          visible={edSelectedModal === 3}
          title="Event monitoring"
          description="Build reliable event integrations capable of scaling to spikes at a moment's notice."
          position={[isMobile ? 0.35 : 1.5, isMobile ? 0.75 : -0.8, isMobile ? 1.5 : 0]}
        />
      </group>
    </group>
  );
};

export default _;
