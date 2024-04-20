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
  const { selectedStep, wbSelectedModal } = useSnapshot(state);

  useEffect(() => {
    if (selectedStep === 3) gsap.delayedCall(1.5, () => (state.wbSelectedModal = 1));
    else state.wbSelectedModal = undefined;
  }, [selectedStep]);

  return (
    <e.group theatreKey="workbench-content" position={[0, 2, -8]}>
      <Dashboard visible={selectedStep === 3} modalStep={wbSelectedModal} />

      {/* Isolated workbench */}
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
          title="Inspector"
          description="Go from a Stripe Dashboard customer or subscription to digging into its JSON in a click. Access the object's logs and state changes over time to better understand or debug your integration."
          cta={{
            label: "Visit Workbench",
            href: "https://stripe.com"
          }}
          position={[1.5, 0.9, 0]}
        />
      </group>

      {/* Templates */}
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
          title="Shell and API Explorer"
          description="Understand API resources available using the API explorer and build runnable commands in the shell. Once it's ready, print the copy-and-paste ready code snippet in your language of choice."
          position={[-1.5, 0.8, 0]}
        />
      </group>

      {/* Sandbox only access */}
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
          title="Logging and events"
          description="See a complete view of your integration logs and events. Excavate and troubleshoot with filter views to find exactly what you need by date, endpoint, response status, and more."
          position={[1.5, 1, 0]}
        />
      </group>
    </e.group>
  );
};

export default _;
