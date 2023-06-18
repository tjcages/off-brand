/* eslint-disable no-dupe-keys */
import { v4 as uuidv4 } from "uuid";

interface Props {
  id?: string;
  name: string;
  type: string;
  description: string;
  cover: string;
}

var imagesArray: Props[] = [];

for (var i = 0; i < 10; i++) {
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
