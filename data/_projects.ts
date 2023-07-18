import { v4 as uuidv4 } from "uuid";

interface ProjectProps {
  id?: string;
  name: string;
  type: string;
  description: string;
  cover: string;
  src: string;
  x?: number;
  y?: number;
  z?: number;
  texture?: any;
  width?: number;
  height?: number;
  ratio?: number;
  href?: string;
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
    src: "/projects/crypto-yearbook.jpg",
    href: "https://thecryptoyearbook.com/",
  },
  {
    id: uuidv4(),
    name: "Six Eastern",
    type: "image",
    description: "",
    src: "/projects/six-eastern.png",
  },
  {
    id: uuidv4(),
    name: "Cosmos",
    type: "image",
    description: "",
    src: "/projects/cosmos.jpg",
  },
  {
    id: uuidv4(),
    name: "Grids",
    type: "image",
    description: "",
    src: "/projects/grid.png",
  },
  {
    id: uuidv4(),
    name: "Boys Club",
    type: "image",
    description: "",
    src: "/projects/boys-club.png",
  },
  {
    id: uuidv4(),
    name: "Capital",
    type: "image",
    description: "",
    src: "/projects/capital.png",
  },
  {
    id: uuidv4(),
    name: "How Much Do You Make?",
    type: "image",
    description: "",
    src: "/projects/how-much.png",
  },
  {
    id: uuidv4(),
    name: "Investdex",
    type: "image",
    description: "",
    src: "/projects/investdex.png",
  },
  {
    id: uuidv4(),
    name: "Jaguar",
    type: "image",
    description: "",
    src: "/projects/jaguar.png",
  },
  {
    id: uuidv4(),
    name: "Jaguar",
    type: "image",
    description: "",
    src: "/projects/jaguar2.png",
  },
  {
    id: uuidv4(),
    name: "Stripe Buy Button",
    type: "image",
    description: "",
    src: "/projects/stripe-buttons.png",
  },
  {
    id: uuidv4(),
    name: "Stripe Buy Button",
    type: "image",
    description: "",
    src: "/projects/stripe.png",
  },
  {
    id: uuidv4(),
    name: "Loaded.com",
    type: "image",
    description: "",
    src: "/projects/loaded.png",
  },
  {
    id: uuidv4(),
    name: "Meridian",
    type: "image",
    description: "",
    src: "/projects/meridian.jpg",
  },
  {
    id: uuidv4(),
    name: "Nate Gagnon Portfolio",
    type: "image",
    description: "",
    src: "/projects/nate.jpg",
  },
  {
    id: uuidv4(),
    name: "NextJS Starter Kit",
    type: "image",
    description: "",
    src: "/projects/nextjs.png",
  },
  {
    id: uuidv4(),
    name: "Through the Looking Glass",
    type: "image",
    description: "",
    src: "/projects/looking-glass.png",
  },
  {
    id: uuidv4(),
    name: "New York Tech Week",
    type: "image",
    description: "",
    src: "/projects/nyctw.png",
  },
  {
    id: uuidv4(),
    name: "Startup Supreme",
    type: "image",
    description: "",
    src: "/projects/startup-supreme.png",
  },
  {
    id: uuidv4(),
    name: "Off–Brand",
    type: "image",
    description: "",
    src: "/projects/off-brand.png",
  },
  {
    id: uuidv4(),
    name: "Palette",
    type: "image",
    description: "",
    src: "/projects/palette.jpg",
  },
  {
    id: uuidv4(),
    name: "Party Round Mag",
    type: "image",
    description: "",
    src: "/projects/mag.png",
  },
  {
    id: uuidv4(),
    name: "Party Round Mag",
    type: "image",
    description: "",
    src: "/projects/throwback.png",
  },
  {
    id: uuidv4(),
    name: "Startup Tamagotchi",
    type: "image",
    description: "",
    src: "/projects/tamagotchi.png",
  },
  {
    id: uuidv4(),
    name: "Bear Goggles",
    type: "image",
    description: "",
    src: "/projects/bear-goggles.png",
  },
  {
    id: uuidv4(),
    name: "Gold Bar NFT",
    type: "image",
    description: "",
    src: "/projects/gold-bar-nft.png",
  },
  {
    id: uuidv4(),
    name: "LinkedInfluencer",
    type: "image",
    description: "",
    src: "/projects/linkedinfluencer.png",
  },
  {
    id: uuidv4(),
    name: "Party Round",
    type: "image",
    description: "",
    src: "/projects/party-round.png",
  },

  {
    id: uuidv4(),
    name: "TY_JC",
    type: "image",
    description: "",
    src: "/projects/tyjc.png",
  },
  // {
  //   id: uuidv4(),
  //   name: "",
  //   type: "image",
  //   description: "",
  //   src: "/projects/",
  // },
] as ProjectProps[];

export default proj;
export type { ProjectProps };
