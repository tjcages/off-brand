import SEO from "@/seo";
import { WebGL, Mobile } from "@/components/elements";
import { Header, Underlay, Overlay, Float } from "@/components/views";
import { useMedia, mobileBreakpoint } from "@/utils";

const _ = () => {
  const mobile = useMedia(mobileBreakpoint);

  return (
    <>
      <SEO />

      <main>
        <Underlay />

        {mobile ? <Mobile /> : <WebGL />}

        <Header />
        <Float />
        <Overlay />
      </main>
    </>
  );
};

export default _;
