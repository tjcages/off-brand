import { state } from "@/store";
import { cn } from "@/utils";
import Image from "next/image";
import { useSnapshot } from "valtio";

const _ = () => {
  const { ready, selectedStep } = useSnapshot(state);
  return (
    <div className="fixed left-0 right-0 top-0 flex items-center justify-between w-full gap-8 px-8 py-6">
      <Image
        className={cn(
          "w-auto h-6 opacity-0 cursor-pointer pointer-events-auto stripe-outline transition-opacity duration-1000 ease-out",
          ready && "opacity-30 hover:opacity-50"
        )}
        src="/icons/stripe-logo.png"
        alt="stripe"
        width={100}
        height={50}
        onClick={() => (state.selectedStep = 1)}
      />

      <button
        className={cn(
          "text-[16px] px-4 py-2 text-white bg-transparent border border-white/50 opacity-50 transition-all duration-200 ease-out hover:opacity-100 hover:text-black hover:outline-offset-[4px]",
          selectedStep === 5 && "opacity-0 pointer-events-none hover:opacity-0"
        )}
        onClick={() => window.open("https://insiders.stripe.dev")}
      >
        Get Early Access
      </button>
    </div>
  );
};

export default _;
