import { useRef, useState } from "react";
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
  const [ready, set] = useState(false);

  useEffect(() => {
    state.mobile = mobile;

    if (!mobile) scroll.current = new Scroll();
  }, [mobile]);

  useEffect(() => {
    if (snap.loaded)
      setTimeout(() => {
        set(true);
        if (scroll.current) scroll.current.start();
      }, 1000);
    else {
      set(false);
      if (scroll.current) scroll.current.stop();
    }
  }, [snap.loaded]);

  return (
    <>
      <SEO theme={ready ? "#060606" : "#060606"} />

      <main>
        <Underlay />
        <Content scroll={scroll.current || null} />
        <Header />
        <Float />
        <Overlay />
      </main>
    </>
  );
};

export default _;
