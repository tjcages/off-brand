import { ProjectProps } from "@/store/types";
import { v4 as uuidv4 } from "uuid";

const projects = [
  {
    id: uuidv4(),
    name: "Framework",
    type: "image",
    description: "",
    href: "https://framework.totem.info/",
    preview: "/projects/framework/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/framework/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Totem",
    type: "image",
    description: "",
    href: "https://totem.info/discoshark",
    preview: "/projects/totem/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/totem/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Coachella",
    type: "image",
    description: "",
    preview: "/projects/coachella/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/coachella/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Eli & Fur x DiscoShark",
    type: "image",
    description: "",
    preview: "/projects/eli&fur/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/eli&fur/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Stripe NGDX",
    type: "image",
    description: "",
    href: "https://stripe.dev/",
    preview: "/projects/ngdx/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/ngdx/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Adidas x Crypto: The Game",
    type: "image",
    description: "",
    preview: "/projects/adidas/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/adidas/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Crypto: The Game",
    type: "image",
    description: "",
    href: "https://www.cryptothegame.com/",
    preview: "/projects/ctg/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/ctg/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Blooms Exploration",
    type: "image",
    description: "",
    preview: "/projects/bloops-ai/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/bloops-ai/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Design Experiments",
    type: "image",
    description: "",
    preview: "/projects/design/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/design/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Stripe BFCM",
    type: "image",
    description: "",
    href: "https://stripe.com/newsroom/news/bfcm2023",
    preview: "/projects/bfcm/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/bfcm/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Delphi",
    type: "image",
    description: "",
    href: "https://withdelphi.com/",
    preview: "/projects/delphi/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/delphi/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Embedded Checkout",
    type: "image",
    description: "",
    href: "https://embedcheckout.com/",
    preview: "/projects/embedded-checkout/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/embedded-checkout/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Sup Labs",
    type: "image",
    description: "",
    preview: "/projects/sup-labs/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/sup-labs/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Crypto Yearbook",
    type: "image",
    description: "",
    href: "https://thecryptoyearbook.com/",
    preview: "/projects/crypto-yearbook/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/crypto-yearbook/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Six Eastern",
    type: "image",
    description: "",
    href: "https://sixeastern.com",
    preview: "/projects/six-eastern/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/six-eastern/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Cosmos",
    type: "image",
    description: "",
    href: "https://cosmos--alpha.vercel.app/",
    preview: "/projects/cosmos/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/cosmos/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Grids",
    type: "image",
    description: "",
    preview: "/projects/grid/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/grid/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Boys Club",
    type: "image",
    description: "",
    href: "https://www.boysclub.vip/",
    preview: "/projects/boys-club/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/boys-club/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Capital",
    type: "image",
    description: "",
    href: "https://capital.xyz/",
    preview: "/projects/capital/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/capital/image.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "New York Tech Week",
    type: "image",
    description: "",
    href: "https://nyctechweek.xyz/",
    preview: "/projects/nyctw/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/nyctw/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Party Round Mag",
    type: "image",
    description: "",
    href: "https://partyroundmag.com/",
    preview: "/projects/party-round-mag/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/party-round-mag/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "How Much Do You Make?",
    type: "image",
    description: "",
    href: "https://howmuchdoyoumake.co/",
    preview: "/projects/how-much/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/how-much/image.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "CapTable",
    type: "image",
    description: "",
    preview: "/projects/captable/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/captable/image.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Rebooting",
    type: "image",
    description: "",
    preview: "/projects/rebooting/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/rebooting/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Stripe Buy Button",
    type: "image",
    description: "",
    href: "https://tryabuybutton.com/",
    preview: "/projects/stripe-buy-button/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/stripe-buy-button/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Palette",
    type: "image",
    description: "",
    href: "https://palettes.design/",
    preview: "/projects/palette/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/palette/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Loaded.com",
    type: "image",
    description: "",
    href: "https://loaded-staging.vercel.app/",
    preview: "/projects/loaded/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/loaded/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Meridian",
    type: "image",
    description: "",
    href: "https://meridian-ai.com/",
    preview: "/projects/meridian/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/meridian/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Nate Gagnon Portfolio",
    type: "image",
    description: "",
    preview: "/projects/nate/preview.avif",
    href: "https://nategagnon.com/",
    content: [
      {
        type: "video",
        src: "/projects/nate/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "NextJS Starter Kit",
    type: "image",
    description: "",
    preview: "/projects/hello-world/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/hello-world/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Through the Looking Glass",
    type: "image",
    description: "",
    preview: "/projects/looking-glass/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/looking-glass/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Startup Supreme",
    type: "image",
    description: "",
    href: "https://www.startupsupreme.xyz/",
    preview: "/projects/startup-supreme/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/startup-supreme/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Startup Tamagotchi",
    type: "image",
    description: "",
    preview: "/projects/tamagotchi/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/tamagotchi/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Gold Bar NFT",
    type: "image",
    description: "",
    href: "https://goldbarnft.xyz/",
    preview: "/projects/gold-bar-nft/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/gold-bar-nft/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Party Round",
    type: "image",
    description: "",
    href: "https://www.partyround.com/",
    preview: "/projects/party-round/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/party-round/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Jaguar",
    type: "image",
    description: "",
    preview: "/projects/jaguar/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/jaguar/image.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "<Macintosh>",
    type: "image",
    description: "",
    preview: "/projects/mac/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/mac/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "[Experimental]",
    type: "image",
    description: "",
    preview: "/projects/experimental/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/experimental/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Medium",
    type: "image",
    description: "",
    preview: "/projects/medium/preview.avif",
    content: [
      {
        type: "video",
        src: "/projects/medium/video.mp4"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "Medium",
    type: "image",
    description: "",
    preview: "/projects/snippet/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/snippet/preview.avif"
      }
    ]
  },
  {
    id: uuidv4(),
    name: "TY_JC",
    type: "image",
    description: "",
    href: "https://tylerj.me/",
    preview: "/projects/tyjc/preview.avif",
    content: [
      {
        type: "image",
        src: "/projects/tyjc/preview.avif"
      }
    ]
  }
] as ProjectProps[];

export { projects };
