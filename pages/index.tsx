import SEO from "@/seo";
import { WebGL, Mobile } from "@/components/elements";
import { Header, Underlay, Overlay, Float } from "@/components/views";
import { useMedia, mobileBreakpoint } from "@/utils";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "@/store";

const _ = () => {
  const snap = useSnapshot(state);
  const mobile = useMedia(mobileBreakpoint);
  
  useEffect(() => {
    state.mobile = mobile;
  }, [mobile]);

  return (
    <>
      <SEO />

      <main>
        <Underlay />

        {snap.mobile ? <Mobile /> : <WebGL />}

        <Header />
        <Float />
        <Overlay />
      </main>
    </>
  );
};

export default _;
