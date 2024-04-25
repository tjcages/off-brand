import { state } from "@/store";
import { useDevice } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";

import Llama from "./_Llama";
import Modal from "./_Modal";
import Keycaps from "./keycaps";

interface Props {
  rotation?: [number, number, number];
}

const _ = ({ rotation = [0, 0, 0] }: Props) => {
  const { isMobile } = useDevice();
  const ref = useRef() as React.MutableRefObject<THREE.Group>;
  const { selectedStep } = useSnapshot(state);
  const [showModal, setShowModal] = useState(false);

  useFrame(({ pointer }) => {
    if (ref.current && !isMobile) {
      ref.current.rotation.x = rotation[0] - pointer.y / 400;
      ref.current.rotation.y = rotation[1] + pointer.x / 50;
      ref.current.rotation.z = rotation[2] - pointer.y / 400;
    }
  });

  useEffect(() => {
    if (selectedStep === 5) gsap.delayedCall(1.5, () => setShowModal(true));
    else setShowModal(false);
  }, [selectedStep]);

  return (
    <group ref={ref} position={[0, 5.8, -26]} rotation={rotation}>
      {/* <FeatureTitle text="Try what's new–shape what's next" visible={showModal} /> */}
      <Modal
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
            href: "https://stripe.com/go/developer-chat",
            icon: "/icons/discord.png"
          }
        ]}
        position={[isMobile ? 0 : 0.73, -2.14, isMobile ? 4 : 2.89]}
      />

      <Llama />
      <Keycaps />
    </group>
  );
};

export default _;
