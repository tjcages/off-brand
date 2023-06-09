import * as THREE from "three";

function visibleBox(camera: any, z: number) {
  const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const height = t * 2 * (camera.position.z - z);
  const width = height * camera.aspect;
  return { width, height };
}

export default visibleBox;
