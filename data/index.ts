import { v4 as uuidv4 } from "uuid";

interface DataProps {
  id?: string;
  name: string;
  type: string;
  description: string;
  cover: string;
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  height?: number;
}

var imagesArray: DataProps[] = [];

for (var i = 0; i < 40; i++) {
  var object = {
    name: "name",
    type: "image",
    description: "An example description goes here!",
    cover: "/imgs/assets/" + i + ".jpeg", // just for testing
  };

  imagesArray.push(object);
}

imagesArray = imagesArray.map((project) => ({
  ...project,
  id: uuidv4(),
}));

export default imagesArray;
export type { DataProps };
