import { cn } from "@/utils";

interface Props {
  tag: {
    text: string;
    color: string;
    x?: number;
  };
  visible?: boolean;
}

const _ = ({ tag, visible = false }: Props) => {
  return (
    <span
      className={cn(
        "absolute top-0 right-2 px-[2.5px] text-[5px] border rounded-sm transition-opacity duration-500 ease-in-out",
        visible ? "opacity-100 delay-1000" : "opacity-0 delay-0",
        tag.color === "blue" && "text-[#2B9DF6] bg-[#051A4C] border-[#092A70]",
        tag.color === "orange" && "text-[#B13600] bg-[#FCEEB5] border-[#FBD992]",
        tag.color === "green" && "text-[#3EAE20] bg-[#152207] border-[#20360C]"
      )}
      style={{
        transform: `translateX(${tag.x ?? 0}px)`
      }}
    >
      {tag.text}
    </span>
  );
};

export default _;
