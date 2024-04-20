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

      {/* Isolated eventDestinations */}
      <group position={[0, 0, 0]}>
        <Content
          visible={edSelectedModal === 1}
          url={"/textures/stripe/event-destinations/ui1.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.57
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-1"
          visible={edSelectedModal === 1}
          title="Choose your destination"
          description="Receive and react to events with webhooks, or skip the custom integration code and send to popular cloud providers, starting with AWS."
          cta={{
            label: "Visit Event Destinations",
            href: "https://stripe.com"
          }}
          position={[1.5, 0.9, 0]}
        />
      </group>

      {/* Templates */}
      <group position={[0, 0.15, 0.025]}>
        <Content
          visible={edSelectedModal === 2}
          url={"/textures/stripe/event-destinations/ui2.png"}
          position={[0, -0.55, 0.8]}
          size={{
            width: 3,
            height: 1.57
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-2"
          visible={edSelectedModal === 2}
          title="Access Stripe events"
          description="See the available Stripe events, and select to receive the ones that matter most to your integration."
          position={[-1.5, 0.8, 0]}
        />
      </group>

      {/* Sandbox only access */}
      <group position={[0, 0, 0.05]}>
        <Content
          visible={edSelectedModal === 3}
          url={"/textures/stripe/event-destinations/ui3.png"}
          position={[0, -0.4, 0.8]}
          size={{
            width: 3,
            height: 1.57
          }}
          bottom
        />
        <Modal
          theatreKey="wb-modal-3"
          visible={edSelectedModal === 3}
          title="Reliable integrations"
          description="Stripe’s supported cloud destinations provide reliable integrations, that can respond to traffic spikes at a moment's notice."
          position={[1.5, 1, 0]}
        />
      </group>
    </e.group>
  );
};

export default _;
