const isColliding = (item: any, testedItem: any) => {
  let colliding = false;
  if (
    testedItem.x < item.x + item.width &&
    testedItem.x + testedItem.width > item.x &&
    testedItem.y < item.y + item.height &&
    testedItem.height + testedItem.y > item.y
  ) {
    colliding = true;
  }
  return colliding;
};

export default isColliding;
