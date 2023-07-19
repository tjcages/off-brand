import { v4 as uuidv4 } from "uuid";

interface ProjectProps {
  id?: string;
  name: string;
  type: string;
  description: string;
  cover: string;
  preview: string;
  x?: number;
  y?: number;
  z?: number;
  texture?: any;
  width?: number;
  height?: number;
  ratio?: number;
  href?: string;
  ref?: any;
  size?: {
    width: number;
    height: number;
  };
  content:
    | {
        type: string;
        src: string;
      }[]
    | null;
}

// var _: ProjectProps[] = [];

// for (var i = 0; i < 20; i++) {
//   var object = {
//     name: "name",
//     type: "image",
//     description: "An example description goes here!",
//     cover: "/imgs/assets/" + i + ".jpeg", // just for testing
//   };

//   _.push(object);
// }

// _ = _.map((project) => ({
//   ...project,
//   id: uuidv4(),
// }));

const proj = [
  {
    id: uuidv4(),
    name: "Crypto Yearbook",
    type: "image",
    description: "",
    href: "https://thecryptoyearbook.com/",
    preview: "/projects/crypto-yearbook/crypto-yearbook.jpg",
    content: [
      {
        type: "video",
        src: "/projects/crypto-yearbook/crypto-yearbook.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Six Eastern",
    type: "image",
    description: "",
    href: "https://six-eastern.vercel.app/",
    preview: "/projects/six-eastern.png",
  },
  {
    id: uuidv4(),
    name: "Cosmos",
    type: "image",
    description: "",
    href: "https://cosmos--alpha.vercel.app/",
    preview: "/projects/cosmos.jpg",
  },
  {
    id: uuidv4(),
    name: "Grids",
    type: "image",
    description: "",
    preview: "/projects/grid/grid.png",
    content: [
      {
        type: "video",
        src: "/projects/grid/grid.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Boys Club",
    type: "image",
    description: "",
    href: "https://www.boysclub.vip/",
    preview: "/projects/boys-club/boys-club.png",
    content: [
      {
        type: "video",
        src: "/projects/boys-club/boys-club.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Capital",
    type: "image",
    description: "",
    href: "https://capital.xyz/",
    preview: "/projects/capital.png",
  },
  {
    id: uuidv4(),
    name: "How Much Do You Make?",
    type: "image",
    description: "",
    href: "https://howmuchdoyoumake.co/",
    preview: "/projects/how-much.png",
  },
  {
    id: uuidv4(),
    name: "Investdex",
    type: "image",
    description: "",
    preview: "/projects/investdex.png",
  },
  {
    id: uuidv4(),
    name: "Rebooting",
    type: "image",
    description: "",
    preview: "/projects/rebooting/rebooting.png",
    content: [
      {
        type: "video",
        src: "/projects/rebooting/rebooting.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Jaguar",
    type: "image",
    description: "",
    preview: "/projects/jaguar.png",
  },
  {
    id: uuidv4(),
    name: "Jaguar",
    type: "image",
    description: "",
    preview: "/projects/jaguar2.png",
  },
  {
    id: uuidv4(),
    name: "Stripe Buy Button",
    type: "image",
    description: "",
    href: "https://tryabuybutton.com/",
    preview: "/projects/stripe-buttons.png",
  },
  {
    id: uuidv4(),
    name: "Stripe Buy Button",
    type: "image",
    description: "",
    href: "https://tryabuybutton.com/",
    preview: "/projects/stripe.png",
  },
  {
    id: uuidv4(),
    name: "Loaded.com",
    type: "image",
    description: "",
    href: "https://loaded-staging.vercel.app/",
    preview: "/projects/loaded/loaded.png",
    content: [
      {
        type: "video",
        src: "/projects/loaded/loaded.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Meridian",
    type: "image",
    description: "",
    href: "https://meridian-ai.com/",
    preview: "/projects/meridian.jpg",
  },
  {
    id: uuidv4(),
    name: "Nate Gagnon Portfolio",
    type: "image",
    description: "",
    preview: "/projects/nate/nate.jpg",
    href: "https://nategagnon.com/",
    content: [
      {
        type: "video",
        src: "/projects/nate/nate.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "NextJS Starter Kit",
    type: "image",
    description: "",
    preview: "/projects/hello-world/hello-world.png",
    content: [
      {
        type: "video",
        src: "/projects/hello-world/hello-world.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Through the Looking Glass",
    type: "image",
    description: "",
    preview: "/projects/looking-glass/looking-glass.png",
    content: [
      {
        type: "video",
        src: "/projects/looking-glass/looking-glass.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "New York Tech Week",
    type: "image",
    description: "",
    href: "https://nyctechweek.xyz/",
    preview: "/projects/nyctw.png",
  },
  {
    id: uuidv4(),
    name: "Startup Supreme",
    type: "image",
    description: "",
    href: "https://www.startupsupreme.xyz/",
    preview: "/projects/startup-supreme.png",
  },
  {
    id: uuidv4(),
    name: "Off–Brand",
    type: "image",
    description: "",
    preview: "/projects/off-brand.png",
  },
  {
    id: uuidv4(),
    name: "Palette",
    type: "image",
    description: "",
    href: "https://palettes.design/",
    preview: "/projects/palette.jpg",
  },
  {
    id: uuidv4(),
    name: "Party Round Mag",
    type: "image",
    description: "",
    href: "https://partyroundmag.com/",
    preview: "/projects/mag.png",
  },
  {
    id: uuidv4(),
    name: "Party Round Mag",
    type: "image",
    description: "",
    href: "https://partyroundmag.com/",
    preview: "/projects/throwback.png",
  },
  {
    id: uuidv4(),
    name: "Startup Tamagotchi",
    type: "image",
    description: "",
    preview: "/projects/tamagotchi.png",
  },
  {
    id: uuidv4(),
    name: "Bear Goggles",
    type: "image",
    description: "",
    href: "https://www.beargoggles.xyz/",
    preview: "/projects/bear-goggles.png",
  },
  {
    id: uuidv4(),
    name: "Gold Bar NFT",
    type: "image",
    description: "",
    href: "https://goldbarnft.xyz/",
    preview: "/projects/gold-bar-nft.png",
  },
  {
    id: uuidv4(),
    name: "LinkedInfluencer",
    type: "image",
    description: "",
    href: "https://linkedinfluencer.co/",
    preview: "/projects/linkedinfluencer.png",
  },
  {
    id: uuidv4(),
    name: "Party Round",
    type: "image",
    description: "",
    href: "https://www.partyround.com/",
    preview: "/projects/party-round.png",
  },
  {
    id: uuidv4(),
    name: "<Macintosh>",
    type: "image",
    description: "",
    preview: "/projects/mac/mac.png",
    content: [
      {
        type: "video",
        src: "/projects/mac/mac.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "[Experimental]",
    type: "image",
    description: "",
    preview: "/projects/experimental/experimental.png",
    content: [
      {
        type: "video",
        src: "/projects/experimental/experimental.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Medium",
    type: "image",
    description: "",
    preview: "/projects/medium/medium.png",
    content: [
      {
        type: "video",
        src: "/projects/medium/medium.mp4",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "TY_JC",
    type: "image",
    description: "",
    href: "https://tylerj.me/",
    preview: "/projects/tyjc.png",
  },
  // {
  //   id: uuidv4(),
  //   name: "",
  //   type: "image",
  //   description: "",
  //   preview: "/projects/",
  // },
] as ProjectProps[];

export default proj;
export type { ProjectProps };
