import { useRef } from "react";
import SEO from "@/seo";
import { Content } from "@/components/elements";
import { Header, Underlay, Overlay, Float } from "@/components/views";
import { useMedia, mobileBreakpoint } from "@/utils";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "@/store";
import { Scroll } from "@/modules";

const _ = () => {
  const snap = useSnapshot(state);
  const mobile = useMedia(mobileBreakpoint);
  const scroll = useRef<Scroll | null>(null);

  useEffect(() => {
    state.mobile = mobile;

    if (!mobile) scroll.current = new Scroll();
  }, [mobile]);

  return (
    <>
      <SEO />

      <main>
        <Underlay />

        {/* {snap.mobile ? <Main /> : <WebGL />} */}
        <Content scroll={scroll.current || null} />

        <Header />
        <Float />
        <Overlay />
      </main>
    </>
  );
};

export default _;
