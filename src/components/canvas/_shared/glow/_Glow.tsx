import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import React, { useMemo } from "react";
import { AdditiveBlending, Color } from "three";

interface Props {
  falloff?: number;
  glowInternalRadius?: number;
  glowColor?: string;
  glowSharpness?: number;
  side?: "THREE.FrontSide" | "THREE.BackSide" | "THREE.DoubleSide";
  glowOpacity?: number;
}

const _ = ({
  falloff = 0.1,
  glowInternalRadius = 6.0,
  glowColor = "#00ff00",
  glowSharpness = 1.0,
  side = "THREE.FrontSide",
  glowOpacity = 1.0
}: Props) => {
  const FakeGlowMaterial = useMemo(() => {
    return shaderMaterial(
      {
        falloffAmount: falloff,
        glowInternalRadius: glowInternalRadius,
        glowColor: new Color(glowColor),
        glowSharpness: glowSharpness,
        glowOpacity: glowOpacity
      },
      /*GLSL */
      `
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;

      }`,
      /*GLSL */
      ` 
      uniform vec3 glowColor;
      uniform float falloffAmount;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float glowOpacity;

      varying vec3 vPosition;
      varying vec3 vNormal;

      void main()
      {
        // Normal
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing)
            normal *= - 1.0;
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        float falloff = smoothstep(0., falloffAmount, fresnel);
        float fakeGlow = fresnel;
        fakeGlow += fresnel * glowSharpness;
        fakeGlow *= falloff;
        gl_FragColor = vec4(clamp(glowColor * fresnel, 0., glowOpacity), clamp(fakeGlow, 0., glowOpacity));

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
    );
  }, [falloff, glowInternalRadius, glowColor, glowSharpness, glowOpacity]);

  extend({ FakeGlowMaterial });

  return (
    // @ts-expect-error property does not exist
    <fakeGlowMaterial
      key={FakeGlowMaterial.key}
      side={side}
      transparent={true}
      blending={AdditiveBlending}
      depthTest={false}
      glowOpacity={glowOpacity}
    />
  );
};

export default _;
