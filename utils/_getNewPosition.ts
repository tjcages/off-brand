import * as THREE from "three";

const vec3 = new THREE.Vector3();

const getNewPosition = (item: any, minRadius: number) => {
  vec3
    .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    .normalize()
    .multiplyScalar(minRadius);
  return { x: vec3.x, y: vec3.y, z: -Math.abs(vec3.z) };
};

export default getNewPosition;
