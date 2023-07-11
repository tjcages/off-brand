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
    name: "Cosmos",
    type: "image",
    description: "",
    src: "/projects/cosmos.jpg",
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
    name: "Cosmos",
    type: "image",
    description: "",
    src: "/projects/cosmos.jpg",
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
    name: "Cosmos",
    type: "image",
    description: "",
    src: "/projects/cosmos.jpg",
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
    name: "Cosmos",
    type: "image",
    description: "",
    src: "/projects/cosmos.jpg",
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
    name: "Cosmos",
    type: "image",
    description: "",
    src: "/projects/cosmos.jpg",
  },
] as ProjectProps[];

export default proj;
export type { ProjectProps };
