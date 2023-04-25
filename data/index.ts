import TheButton from "@/buttons/TheButton";
import Hover from "@/buttons/Hover";
import Digital from "@/buttons/Digital";
import Windows98 from "@/buttons/Windows98";
import NyanCat from "@/buttons/NyanCat";
import Notes from "@/buttons/Notes";
import VHS from "@/buttons/VHS";
import MusicPlayer from "@/buttons/MusicPlayer";
import Retrowave from "@/buttons/Retrowave";
import Paint from "@/buttons/Paint";
import DVD from "@/buttons/DVD";

import TheButtonStyles from "@/buttons/TheButton/style.module.scss";
import HoverStyles from "@/buttons/Hover/style.module.scss";
import DigitalStyles from "@/buttons/Digital/style.module.scss";
import Windows98Styles from "@/buttons/Windows98/style.module.scss";
import NyanCatStyles from "@/buttons/NyanCat/style.module.scss";
import NotesStyles from "@/buttons/Notes/style.module.scss";
import VHSStyles from "@/buttons/VHS/style.module.scss";
import MusicPlayerStyles from "@/buttons/MusicPlayer/style.module.scss";
import RetrowaveStyles from "@/buttons/Retrowave/style.module.scss";
import PaintStyles from "@/buttons/Paint/style.module.scss";
import DVDStyles from "@/buttons/DVD/style.module.scss";

interface Props {
  live?: boolean;
  id: string;
  name: string;
  description?: string;
  cta: string;
  href?: string;
  Scene: React.FC<any>;
  background: string;
  color: string;
  style?: any;
  indexCode?: string;
  styleCode?: string;
}

const _ = [
  {
    live: true,
    id: "buy_btn_1Mu04wJ65Wq6yQASkdrjHUXX",
    name: "The Buy Button",
    cta: "Buy",
    Scene: TheButton,
    color: "white",
    background: "#635BFF",
    style: TheButtonStyles,
    indexCode: `
<!-- Insert in head -->
<script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<!-- Insert on page -->
<stripe-buy-button
  buy-button-id="your_buy_button_id_here"
  publishable-key="your_publishable_key_here"
>
</stripe-buy-button>
`,
  },
  {
    live: false,
    id: "buy_btn_1Mu08FJ65Wq6yQASu6arx3assQz",
    name: "Marching Ants Button",
    cta: "Buy",
    Scene: Digital,
    color: "#eceff2",
    background: "#111111",
    style: DigitalStyles,
    indexCode: `
<!-- Insert in head -->
<script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<!-- Insert on page -->
<div
  class="buttonWrapper"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    class="border"
  >
    <rect
      x="2"
      y="2"
      width="98%"
      height="95%"
      rx="24"
      ry="24"
      fill="transparent"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="4,4"
    ></rect>
  </svg>
  <stripe-buy-button
    buy-button-id="your_buy_button_id_here"
    publishable-key="your_publishable_key_here"
  >
  </stripe-buy-button>
</div>
    `,
    styleCode: `
.buttonWrapper {
  position: relative;
}

.buttonWrapper:hover .border {
  animation: dash 3s linear 0s 1;
}

.buttonWrapper .border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  pointer-events: none;

  animation-iteration-count: infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -100;
  }
}
    `,
  },
  {
    live: false,
    id: "buy_btn_1Mu08FJ65Wq6yQASu6arx3lsQzs",
    name: "The Hover Button",
    cta: "Buy",
    Scene: Hover,
    color: "white",
    background: "#CA75E6",
    style: HoverStyles,
    indexCode: `
<!-- Insert in head -->
<script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<!-- Insert on page -->
<div class="button-wrapper">
  <stripe-buy-button
    buy-button-id="your_buy_button_id_here"
    publishable-key="your_publishable_key_here"
  >
  </stripe-buy-button>
</div>
`,
    styleCode: `
.buttonWrapper {
  overflow: hidden;
  box-shadow: rgba(202, 117, 230, 0.4) 0px 10px 20px, rgba(202, 117, 230, 0.3) 0px 6px 6px;
  transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.35s cubic-bezier(0.33, 1, 0.68, 1);
}

.buttonWrapper:hover {
  transform: translateY(-4px);
  box-shadow: rgba(202, 117, 230, 0.6) 0px 19px 38px, rgba(202, 117, 230, 0.5) 0px 15px 12px;
}
`,
  },
  {
    live: false,
    id: "buy_btn_1Mua08FJ65Wq6yQASu6arx3assQz",
    name: "Windows 95 Button",
    cta: "Buy",
    Scene: Windows98,
    color: "black",
    background: "#c0c7c8",
    style: Windows98Styles,
  },
  {
    live: false,
    id: "fadsfsd;;kldafdsafasd",
    name: "Paint Button",
    cta: "Buy",
    Scene: Paint,
    color: "black",
    background: "white",
    style: PaintStyles,
  },
  {
    live: false,
    id: "buy_bftn_1Mfddu08FJ65Wq6yQASu6arx3assQz",
    name: "Notes Button",
    cta: "Buy",
    Scene: Notes,
    color: "black",
    background: "#f8f79a",
    style: NotesStyles,
  },
  {
    live: true,
    id: "buy_btn_1Mu04wJ65Wq6yQASkdrjHUXX",
    name: "DVD Button",
    cta: "Buy",
    Scene: DVD,
    color: "black",
    background: "white",
    style: DVDStyles,
  },
  {
    live: false,
    id: "buy_btn_1Mu080FJ65Wq6yQASu6arx3Qz",
    name: "Music Player Button",
    cta: "Buy",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    Scene: MusicPlayer,
    color: "black",
    background: "#ffcdfa",
    style: MusicPlayerStyles,
  },
  {
    live: false,
    id: "buy_bftn_1Mud0fsda8FJ65Wq6yQASu6arx3assQz",
    name: "VHS Button",
    cta: "Buy",
    Scene: VHS,
    color: "black",
    background: "white",
    style: VHSStyles,
  },
  {
    live: false,
    id: "buy_bftn_1Mu0fsda8FJ65Wq6yQASu6arx3assQz",
    name: "Nyan Cat Button",
    cta: "Buy",
    Scene: NyanCat,
    color: "black",
    background: "#ffcc99",
    style: NyanCatStyles,
  },
  {
    live: false,
    id: "fadsfsdafdsafasd",
    name: "Retrowave Button",
    cta: "Buy",
    Scene: Retrowave,
    color: "white",
    background: "#85CAEA",
    style: RetrowaveStyles,
  },
] as Props[];

export default _;
export type { Props };
