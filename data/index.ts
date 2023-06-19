/* eslint-disable no-dupe-keys */
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

for (var i = 0; i < 30; i++) {
  var object = {
    name: "name",
    type: "image",
    description: "",
    cover: "/imgs/assets/" + i + ".jpeg",
  };

  imagesArray.push(object);
}

imagesArray = imagesArray.map((project) => ({
  ...project,
  id: uuidv4(),
}));

export default imagesArray;
export type { DataProps };
