import { useDevice } from "@/utils";

import DesktopSlider from "./_DesktopSlider";
import MobileSlider from "./_MobileSlider";

interface Props {
  visible?: number;
  ui: string[];
  heights: number[];
}

const _ = ({ visible, ui, heights }: Props) => {
  const { isMobile, isSafari } = useDevice();
  return isMobile || isSafari ? (
    <MobileSlider visible={visible} ui={ui} heights={heights} />
  ) : (
    <DesktopSlider visible={visible} ui={ui} heights={heights} />
  );
};

export default _;
