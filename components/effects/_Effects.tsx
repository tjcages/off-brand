// import * as THREE from "three";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
// import { Pass, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
// // @ts-ignore
// import { LensDistortionPassGen } from "three-lens-distortion";
// import { useMemo, useEffect } from "react";
// import { useThree, useFrame } from "@react-three/fiber";
// import { RenderPass } from "postprocessing";

// let myLensDistortionPass: any;

// export default function Effects() {
//   const { gl, scene, camera, size } = useThree();

//   const composer = useMemo(() => {
//     // fisheye lens distortion
//     const LensDistortionPass = LensDistortionPassGen({
//       THREE,
//       Pass,
//       FullScreenQuad,
//     });
//     myLensDistortionPass = new LensDistortionPass({
//       distortion: new THREE.Vector2(0, 0), // radial distortion coeff
//       principalPoint: new THREE.Vector2(0, 0), // principal point coord
//       focalLength: new THREE.Vector2(1, 1), // focal length
//       skew: 0, // skew coeff
//     });
//     myLensDistortionPass.toneMapping = THREE.ReinhardToneMapping;

//     // attach composer passes
//     const composer = new EffectComposer(gl);
//     composer.addPass(new RenderPass(scene, camera));
//     composer.addPass(myLensDistortionPass);

//     return composer;
//   }, []);

//   useEffect(() => void composer.setSize(size.width, size.height), [size]);
//   return useFrame((_, delta) => composer.render(delta), 1);
// }

// export { myLensDistortionPass };
