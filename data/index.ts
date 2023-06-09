/* eslint-disable no-dupe-keys */
import { v4 as uuidv4 } from "uuid";

let archivesData = [
  {
    name: "elijah",
    coverImg: "/imgs/archives/elijah.jpg",
    type: "print",
    description: "Homepage preview from Elijah portfolio",
  },
  {
    name: "Portfolio book",
    coverImg: "/imgs/archives/folioBook.jpg",
    type: "mockup",
    description: "A little preview of my folio-book, coming soon...",
  },
  {
    name: "1st Isometric room",
    coverImg: "/imgs/archives/room.jpg",
    type: "3D",
    description:
      "This is my first 3D creation using Blender. Thanks to PolygonRunaway for his amazing course.",
  },
  {
    name: "Business Card",
    coverImg: "/imgs/archives/flowerCard.jpg",
    type: "mockup",
    description: "A preview of my business card :)",
  },
  {
    name: "lila",
    coverImg: "/imgs/archives/lila.jpg",
    type: "processing",
    description: "I generate this form using Processing",
  },
  {
    name: "vol",
    coverImg: "/imgs/archives/vol.jpg",
    type: "print",
    description:
      "I create this poster, and generate the pattern using my code made from scratch on Processing",
    websiteLink: "",
  },
  {
    name: "My ACNH Island",
    coverImg: "/imgs/archives/acnh.jpg",
    type: "print",
    description:
      "Being a big fan of animal crossing, I always liked to create my own little universe. I find the ACNH version very complete, which has allowed me to expand and develop my creativity. My island named 'Eldia' (a little reference to SNK ;) ) has been filmed in a video with more than 1 million views on Youtube. For those who are curious, don't hesitate to watch it! This one is from 1 month ago after the release of the game. All these helped me a lot in terms of creativity and inspiration, I highly recommend the game for those who don't have it :D",
    websiteLink: "https://www.youtube.com/watch?v=QbiMWZTUefU&t=31s",
  },
  {
    name: "Self Kit",
    coverImg: "/imgs/archives/selfKit.jpg",
    type: "Design",
    description: "My personal branding kit :D",
  },
  {
    name: "Etude house",
    coverImg: "/imgs/archives/etude.jpg",
    type: "Ui Design",
    description: "UI Design for the brand Etude House",
    websiteLink: "",
  },
  {
    name: "Blob",
    coverImg: "/imgs/archives/blob.jpg",
    type: "3D",
    description: "This is a blob made with Three JS",
  },
  {
    name: "picto",
    coverImg: "/imgs/archives/picto.jpg",
    type: "logo",
    description:
      "I created pictograms of barrier gestures for the Shibuya district in Tokyo, going with the logo I made for it.",
  },
  {
    name: "weekend",
    coverImg: "/imgs/archives/weekend.jpg",
    type: "print",
    description: "Photo of Bibi from her music video 'The weekend'",
  },
  {
    name: "Feels Blue",
    coverImg: "/imgs/archives/feelsBlue.jpg",
    type: "processing",
    description:
      "Post and pattern create and generate with a code on Processing, Blue palette.",
  },
  {
    name: "Envelop logo",
    coverImg: "/imgs/archives/logoWater.jpg",
    type: "Mockup",
    description:
      "Preview of my personal envelope where you will find my CV and information",
  },
  {
    name: "Nike homepage",
    coverImg: "/imgs/archives/nike.jpg",
    type: "website",
    description: "UI Design of the homepage for the Nike website",
  },
  {
    name: "low",
    coverImg: "/imgs/archives/low.jpg",
    type: "print",
    description:
      "Creation of a poster, the 'Low' pattern was generated with my code on Processing",
  },
  {
    name: "Kill geometry print",
    coverImg: "/imgs/archives/kill.jpg",
    type: "Print",
    description:
      "Creation of a poster, the 'Kill' pattern was generated with my code on Processing",
  },
  {
    name: "Parallele magazine",
    coverImg: "/imgs/archives/parallele.jpg",
    type: "Print",
    description:
      "Realization of a cover for the magazine 'parallele', art in the culture of science.",
  },
  {
    name: "Feels Cover",
    coverImg: "/imgs/archives/feels.jpg",
    type: "Processing",
    description: "Creative cover for my project 'Feels'",
  },
  {
    name: "Flamalice portfolio",
    coverImg: "/imgs/archives/flamalice.jpg",
    type: "website",
    description: "Portfolio I designed and developed for the artist Flamalice",
    websiteLink: "https://flamalice.com/",
  },
  {
    name: "etude house",
    coverImg: "/imgs/archives/etude_phone.jpg",
    type: "UI design",
    description: "responsive UI design for Etude house brand, page checkout",
  },
  {
    name: "Feels Red",
    coverImg: "/imgs/archives/feelsRed.jpg",
    type: "processing",
    description:
      "Post and pattern create and generate with a code on Processing, red palette.",
  },
  {
    name: "Cl presave",
    coverImg: "/imgs/archives/cl.jpg",
    type: "Ui design",
    description: "Preview of the pre-save page for the release of the CL album",
  },
  {
    name: "Kaonashi human",
    coverImg: "/imgs/archives/illu1.jpg",
    type: "Illustration",
    description:
      "Drawing made on a graphic tablet on the illustrator software, inspired by Suzani",
  },
  {
    name: "vans",
    coverImg: "/imgs/archives/vans.jpg",
    type: "Ui design",
    description: "UI Design of a log in page for the brand Vans",
  },
  {
    name: "Shibuya Device Mockup",
    coverImg: "/imgs/archives/shibuya_device.jpg",
    type: "Print",
    description: "Mockup on ipad of the logo I made for the shibuya district",
  },
  {
    name: "Mandala",
    coverImg: "/imgs/archives/mandala.jpg",
    type: "Illustrator",
    description:
      "Mandala made on Illustrator for a homework, using the main elements of the movie 'Spirited Away'.",
  },
  {
    name: "red pic",
    coverImg: "/imgs/archives/red.jpg",
    type: "book",
    description: "Preview picture from Elijah's Portfolio",
  },
  {
    name: "Distorsion Processing",
    coverImg: "/imgs/archives/distortion.jpg",
    description: "Creating a distortion canva on Processing",
  },
  {
    name: "Princess Mononoke",
    coverImg: "/imgs/archives/illu2.jpg",
    type: "Illustration",
    description:
      "Drawing made on a graphic tablet on the illustrator software, inspired by Suzani",
  },
];

archivesData = archivesData.map((archiveProject) => ({
  ...archiveProject,
  id: uuidv4(),
}));

export default archivesData;
