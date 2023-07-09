import { v4 as uuidv4 } from "uuid";

interface ProjectProps {
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

var _: ProjectProps[] = [];

for (var i = 0; i < 20; i++) {
  var object = {
    name: "name",
    type: "image",
    description: "An example description goes here!",
    cover: "/imgs/assets/" + i + ".jpeg", // just for testing
  };

  _.push(object);
}

_ = _.map((project) => ({
  ...project,
  id: uuidv4(),
}));

export default _;
export type { ProjectProps };
