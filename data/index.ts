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
    id: "buy_btn_1N0oN4JWmqHDfKfmp7X3jeRp",
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
    live: true,
    id: "buy_btn_1N0qEIJWmqHDfKfmrqYKPijF",
    name: "Dark Mode Button",
    cta: "Buy",
    Scene: Digital,
    color: "#eceff2",
    background: "transparent",
    style: DigitalStyles,
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
    live: true,
    id: "buy_btn_1N0sDMJWmqHDfKfmW7KvBgHC",
    name: "Colorful Button",
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
<stripe-buy-button
  buy-button-id="your_buy_button_id_here"
  publishable-key="your_publishable_key_here"
>
</stripe-buy-button>
`,
  },
  {
    live: true,
    id: "buy_btn_1N0ta2JWmqHDfKfmu7Aw4Sub",
    name: "Windows 95 Button",
    cta: "Buy",
    Scene: Windows98,
    color: "black",
    background: "#c0c7c8",
    style: Windows98Styles,
  },
  {
    live: true,
    id: "buy_btn_1N0qEIJWmqHDfKfmrqYKPijF",
    name: "Paint Button",
    cta: "Buy",
    Scene: Paint,
    color: "black",
    background: "white",
    style: PaintStyles,
  },
  {
    live: true,
    id: "buy_btn_1N0qPFJWmqHDfKfmKilTPDaH",
    name: "Notes Button",
    cta: "Buy",
    Scene: Notes,
    color: "black",
    background: "#f8f79a",
    style: NotesStyles,
  },
  {
    live: true,
    id: "buy_btn_1N0oN4JWmqHDfKfmp7X3jeRp",
    name: "DVD Button",
    cta: "Buy",
    Scene: DVD,
    color: "black",
    background: "white",
    style: DVDStyles,
  },
  {
    live: true,
    id: "buy_btn_1N0qT8JWmqHDfKfmh3bo3ZxR",
    name: "Music Player Button",
    cta: "Buy",
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    Scene: MusicPlayer,
    color: "black",
    background: "#ffcdfa",
    style: MusicPlayerStyles,
  },
  {
    live: true,
    id: "buy_btn_1N0tVkJWmqHDfKfmKiy180cH",
    name: "VHS Button",
    cta: "Buy",
    Scene: VHS,
    color: "black",
    background: "white",
    style: VHSStyles,
  },
  {
    live: true,
    id: "buy_btn_1N0qUMJWmqHDfKfm7zWFR71h",
    name: "Nyan Cat Button",
    cta: "Buy",
    Scene: NyanCat,
    color: "black",
    background: "#fd99fc",
    style: NyanCatStyles,
  },
  {
    live: true,
    id: "buy_btn_1N0qY5JWmqHDfKfm9W7Qh28I",
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
