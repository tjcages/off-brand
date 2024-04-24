import { state } from "@/store";
import { editable as e } from "@theatre/r3f";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";

import Llama from "./_Llama";
import Modal from "./_Modal";
import Keycaps from "./keycaps";

const _ = () => {
  const { selectedStep } = useSnapshot(state);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedStep === 5) gsap.delayedCall(1.5, () => setShowModal(true));
    else setShowModal(false);
  }, [selectedStep]);

  return (
    <e.group theatreKey="insiders-content">
      {/* <FeatureTitle text="Try what's new–shape what's next" visible={showModal} /> */}
      <Modal
        theatreKey="insiders-modal"
        visible={showModal}
        title="Try what's new—shape what's next"
        description="Become a Stripe Insider to get early access to new developer tools, and provide feedback to the teams building them."
        cta={{
          label: "Join Stripe Insiders",
          href: "https://insiders.stripe.dev/t/welcome-to-stripe-insiders/5"
        }}
        socials={[
          {
            href: "https://x.com/stripe",
            icon: "/icons/x.png"
          },
          {
            href: "https://www.youtube.com/@stripe",
            icon: "/icons/youtube.png"
          },
          {
            href: "https://www.linkedin.com/company/stripe/",
            icon: "/icons/linkedin.png"
          }
        ]}
        position={[1.5, 0.9, 1.25]}
      />

      <Llama />
      <Keycaps />
    </e.group>
  );
};

export default _;
