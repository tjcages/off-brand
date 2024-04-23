import { state } from "@/store";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import { FeatureTitle } from "@/components/canvas/_shared";
import Modal from "@/components/canvas/sandboxes/_Modal";

import Llama from "./_Llama";

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedStep === 5) gsap.delayedCall(2.5, () => setShowModal(true));
    else setShowModal(false);
  }, [selectedStep]);

  return (
    <e.group theatreKey="insiders-content">
      <FeatureTitle text="Try what's new—shape what's next" visible={showModal} />
      <Modal
        theatreKey="insiders-modal"
        visible={showModal}
        title=""
        description="Become a Stripe Insider to get early access to new developer tools, and provide feedback to the teams building them."
        cta={{
          label: "Join Stripe Insiders",
          href: "https://insiders.stripe.dev/t/welcome-to-stripe-insiders/5"
        }}
        position={[1.5, 0.9, 1]}
      />

      <Llama />
    </e.group>
  );
};

export default _;
