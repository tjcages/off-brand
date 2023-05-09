import SEO from "@/seo";
import Welcome from "@/components/Welcome";
import Overlay from "@/components/Overlay";

export default function Home() {
  return (
    <>
      <SEO />

      <main>
        {/* Start editing here */}
        <Welcome />
        <Overlay />
      </main>
    </>
  );
}
