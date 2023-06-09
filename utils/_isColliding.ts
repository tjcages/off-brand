const isColliding = (items: any, testedItem: any) => {
  let colliding = false;
  for (const item of items) {
    if (
      testedItem.x < item.x + item.width * 1.5 &&
      testedItem.x + testedItem.width * 1.5 > item.x &&
      testedItem.y < item.y + item.height * 1.5 &&
      testedItem.height * 1.5 + testedItem.y > item.y
    ) {
      colliding = true;
    }
  }
  return colliding;
};

export default isColliding;
