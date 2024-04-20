import { cn } from "@/utils";
import { Html } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";

import "@/utils/_bentPlaneGeometry";

interface Props {
  theatreKey: string;
  visible: boolean;
  step?: number;
  total: number;
  setStep?: (n: number) => void;
}

const _ = ({ theatreKey, visible, step = 0, total, setStep }: Props) => {
  return (
    <e.group theatreKey={theatreKey}>
      <Html transform scale={0.175} pointerEvents="none">
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4 px-3 py-4 bg-white/10 backdrop-blur-md rounded-full transition-opacity duration-300 delay-1000 ease-in-out",
            visible ? "opacity-100" : "opacity-0"
          )}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full outline outline-2 cursor-pointer pointer-events-auto transition-all duration-1000 ease-in-out",
                step === i + 1
                  ? "outline-offset-2 outline-white"
                  : "outline-offset-0 outline-white/0",
                step > i ? "opacity-100" : "opacity-20"
              )}
              onClick={() => setStep && setStep(i + 1)}
            >
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          ))}
        </div>
      </Html>
    </e.group>
  );
};

export default _;