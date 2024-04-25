import { state } from "@/store";
import { cn } from "@/utils";
import Image from "next/image";
import { useSnapshot } from "valtio";

const _ = () => {
  const { ready, selectedStep } = useSnapshot(state);
  return (
    <div className="fixed left-0 right-0 top-0 flex items-center justify-between w-full gap-8 px-4 md:px-8 py-3 md:py-6">
      <Image
        className={cn(
          "w-auto h-6 opacity-0 stripe-outline transition-opacity duration-1000 ease-out",
          ready && "opacity-30 hover:opacity-50",
          selectedStep !== 1 && "cursor-pointer pointer-events-auto"
        )}
        src="/icons/stripe-logo.png"
        alt="stripe"
        width={100}
        height={50}
        onClick={() => (state.selectedStep = 1)}
      />

      <button
        className={cn(
          "text-[15px] md:text-[16px] px-3 md:px-4 py-1.5 md:py-2 text-white outline-[1px] md:outline-2 bg-transparent backdrop-blur-md border border-white/50 opacity-0 transition-all duration-200 ease-out hover:text-black hover:outline-offset-[4px]",
          ready && "opacity-50 hover:opacity-100",
          selectedStep === 5 && "opacity-0 pointer-events-none hover:opacity-0"
        )}
        onClick={() => window.open("https://insiders.stripe.dev/t/welcome-to-stripe-insiders/5")}
      >
        Join Stripe Insiders
      </button>
    </div>
  );
};

export default _;
