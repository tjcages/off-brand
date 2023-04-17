import BubbleGum from "@/buttons/BubbleGum";
import BananaSplit from "@/buttons/BananaSplit";

import BananaSplitStyles from "@/styles/buttons/_bananaSplit.module.scss";

interface Props {
  id: string;
  name: string;
  cta: string;
  Scene: React.FC;
  background: string;
  color: string;
  style?: any;
}

const _ = [
  {
    id: "buy_btn_1Mu08FJ65Wq6yQASu6arx3Qz",
    name: "BubbleGum",
    cta: "Buy Now",
    Scene: BubbleGum,
    color: "white",
    background: "#CA75E6",
  },
  {
    id: "fasdfa",
    name: "Banana Split",
    cta: "Go Bananas",
    Scene: BananaSplit,
    color: "black",
    background: "#ffbf40",
    style: BananaSplitStyles,
  },
] as Props[];

export default _;
export type { Props };
