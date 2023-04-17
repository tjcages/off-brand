import TheButton from "@/buttons/TheButton";
import Digital from "@/buttons/Digital";
import Windows98 from "@/buttons/Windows98";
import MSN from "@/buttons/MSN";
import Wavey from "@/buttons/Wavey";
import BubbleGum from "@/buttons/BubbleGum";
import BananaSplit from "@/buttons/BananaSplit";

import TheButtonStyles from "@/buttons/TheButton/style.module.scss";
import DigitalStyles from "@/buttons/Digital/style.module.scss";
import Windows98Styles from "@/buttons/Windows98/style.module.scss";
import MSNStyles from "@/buttons/MSN/style.module.scss";
import WaveyStyles from "@/buttons/Wavey/style.module.scss";
import BubbleGumStyles from "@/buttons/BubbleGum/style.module.scss";
import BananaSplitStyles from "@/buttons/BananaSplit/style.module.scss";

interface Props {
  live?: boolean;
  id: string;
  name: string;
  cta: string;
  Scene: React.FC<any>;
  background: string;
  color: string;
  style?: any;
}

const _ = [
  {
    id: "buy_btn_1Mu08FJ65Wq6yQASu6arx3Qzs",
    name: "The Buy Button",
    cta: "BUY",
    Scene: TheButton,
    color: "white",
    background: "#635BFF",
    style: TheButtonStyles,
  },
  {
    id: "buy_btn_1Mu08FJ65Wq6yQASu6arx3assQz",
    name: "The Pixels Button",
    cta: "BUY",
    Scene: Digital,
    color: "black",
    background: "#eceff2",
    style: DigitalStyles,
  },
  {
    id: "buy_btn_1Mua08FJ65Wq6yQASu6arx3assQz",
    name: "Windows '98",
    cta: "Buy Now!",
    Scene: Windows98,
    color: "black",
    background: "#c0c7c8",
    style: Windows98Styles,
  },
  {
    id: "buy_bftn_1Mu08FJ65Wq6yQASu6arx3assQz",
    name: "MSN Button",
    cta: "Buy Buy Buy",
    Scene: MSN,
    color: "white",
    background: "#329631",
    style: MSNStyles,
  },
  {
    id: "buy_bftn_1Mu08FJ65Wq6yQASu6arx3assQz",
    name: "Wavey Button",
    cta: "Buy The Wave",
    Scene: Wavey,
    color: "black",
    background: "#e7e7e7",
    style: WaveyStyles,
  },
  {
    id: "buy_btn_1Mu08FJ65Wq6yQASu6arx3Qz",
    name: "BubbleGum",
    cta: "Buy Now",
    Scene: BubbleGum,
    color: "white",
    background: "#CA75E6",
    style: BubbleGumStyles,
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
