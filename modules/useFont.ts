import { useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

// create props
export interface FontProps {
  stop?: boolean;
}

export function useFont({ stop = false }: FontProps = {}) {
  const [font, setFont] = useState("");

  const playfairRegular = useMemo(() => "/fonts/playfair/Playfair.ttf", []);
  const playfairItalic = useMemo(
    () => "/fonts/playfair/Playfair-Italic.ttf",
    []
  );
  const wonderRegular = useMemo(
    () => "/fonts/wonder/WonderType-Regular.otf",
    []
  );
  const scriptionRegular = useMemo(
    () => "/fonts/scription/scripton_regular.otf",
    []
  );
  const bnCringeRegular = useMemo(
    () => "/fonts/bncringe/BNCringeSans-Bold.otf",
    []
  );
  const creattionRegular = useMemo(() => "/fonts/creattion/Creattion.otf", []);
  const gingerRegular = useMemo(() => "/fonts/ginger/Ginger.ttf", []);
  const gtSuperRegular = useMemo(
    () => "/fonts/gt-super/GT-Super-Text-Black-Italic.otf",
    []
  );
  const akturaRegular = useMemo(() => "/fonts/aktura/Aktura.ttf", []);
  const comicoRegular = useMemo(() => "/fonts/comico/Comico-Regular.otf", []);
  const generalRegular = useMemo(
    () => "/fonts/general/GeneralSans-Semibold.ttf",
    []
  );
  const offbitRegular = useMemo(() => "/fonts/offbit/OffBit-Dot.otf", []);
  const telmaRegular = useMemo(() => "/fonts/telma/Telma-Regular.otf", []);

  const fonts = useMemo(
    () => [
      playfairRegular,
      playfairItalic,
      wonderRegular,
      scriptionRegular,
      bnCringeRegular,
      creattionRegular,
      gingerRegular,
      gtSuperRegular,
      akturaRegular,
      comicoRegular,
      generalRegular,
      offbitRegular,
      telmaRegular,
    ],
    []
  );

  useFrame(({ clock }) => {
    // switch between fonts
    const duration = 0.25;
    const font =
      fonts[Math.floor((clock.elapsedTime * 1) / duration) % fonts.length];
    // const font = fonts[Math.floor(clock.elapsedTime) % fonts.length];
    if (!stop) setFont(font);
  });

  return font;
}
