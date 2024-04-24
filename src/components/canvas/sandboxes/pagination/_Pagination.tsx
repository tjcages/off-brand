import { useDevice } from "@/utils";

import "@/utils/_bentPlaneGeometry";

import DesktopPagination from "./_DesktopPagination";
import MobilePagination from "./_MobilePagination";

interface Props {
  theatreKey: string;
  visible: boolean;
  step?: number;
  position?: [number, number, number];
  total: number;
  setStep?: (n: number) => void;
}

const _ = ({ theatreKey, visible, step = 0, position, total, setStep }: Props) => {
  const { isMobile } = useDevice();
  return (
    <group position={position}>
      {isMobile && (
        <MobilePagination visible={visible} step={step} total={total} setStep={setStep} />
      )}
      <DesktopPagination
        theatreKey={theatreKey}
        visible={isMobile ? false : visible}
        step={step}
        total={total}
        setStep={setStep}
      />
    </group>
  );
};

export default _;
