import { state } from "@/store";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import "@/utils/_bentPlaneGeometry";

import Content from "@/components/canvas/sandboxes/_Content";
import Modal from "@/components/canvas/sandboxes/_Modal";

import Dashboard from "./_Dashboard";

const _ = () => {
  const { selectedStep, edSelectedModal } = useSnapshot(state);

  useEffect(() => {
    if (selectedStep === 4) gsap.delayedCall(1.5, () => (state.edSelectedModal = 1));
    else state.edSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <e.group theatreKey="event-destinations-content" position={[0, 2, -8]}>
      <Dashboard visible={selectedStep === 4} modalStep={edSelectedModal} />

      {/* Destination types */}
      <group position={[0, 0, 0]}>
        <Content
          visible={edSelectedModal === 1}
          url={"/textures/stripe/event-destinations/ui2.png"}
          position={[0, -0.2, 0.8]}
          size={{
            width: 3,
            height: 1.62
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-1"
          visible={edSelectedModal === 1}
          title="Destination types"
          description="Receive events with webhooks, or skip writing custom integration code and send to popular cloud providers, starting with AWS."
          position={[1.2, 0.2, 0]}
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
          position={[-1.25, 0.1, 0]}
        />
      </group>

      {/* Event monitoring */}
      <group position={[0, 0, 0]}>
        <Content
          visible={edSelectedModal === 3}
          url={"/textures/stripe/event-destinations/ui4.png"}
          position={[0, -0.2, 0.8]}
          size={{
            width: 3,
            height: 1.62
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-3"
          visible={edSelectedModal === 3}
          title="Event monitoring"
          description="Build reliable event integrations capable of scaling to spikes at a moment's notice."
          position={[1.75, 1, 0]}
        />
      </group>
    </e.group>
  );
};

export default _;
