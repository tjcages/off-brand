import { state } from "@/store";
import { cn } from "@/utils";
import Image from "next/image";
import { useSnapshot } from "valtio";

const _ = () => {
  const { ready } = useSnapshot(state);
  return (
    <div className="fixed left-0 right-0 top-0 flex items-center justify-between w-full gap-8">
      <Image
        className={cn(
          "absolute z-10 left-8 top-8 w-auto h-6 opacity-0 cursor-pointer pointer-events-auto stripe-outline transition-opacity duration-1000 ease-out",
          ready && "opacity-30 hover:opacity-50"
        )}
        src="/icons/stripe-logo.png"
        alt="stripe"
        width={100}
        height={50}
        onClick={() => (state.selectedStep = 1)}
      />
    </div>
  );
};

export default _;
