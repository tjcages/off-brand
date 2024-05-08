"use client";

// @ts-expect-error - Ignore import error
import rgbshift from "@alienkitty/alien.js/src/shaders/modules/rgbshift/rgbshift.glsl.js";
import { AdditiveBlending, GLSL3, RawShaderMaterial } from "three";

class _ extends RawShaderMaterial {
  constructor() {
    super({
      glslVersion: GLSL3,
      uniforms: {
        tMap: { value: null },
        tFluid: { value: null }
      },
      vertexShader: /* glsl */ `
                  in vec3 position;
                  in vec2 uv;

                  uniform mat4 modelViewMatrix;
                  uniform mat4 projectionMatrix;

                  out vec2 vUv;

                  void main() {
                      vUv = uv;

                      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
              `,
      fragmentShader: /* glsl */ `
                  precision highp float;

                  uniform sampler2D tMap;
                  uniform sampler2D tFluid;

                  in vec2 vUv;

                  out vec4 FragColor;

                  ${rgbshift}

                  void main() {
                      vec3 fluid = texture(tFluid, vUv).rgb;
                      vec2 uv = vUv - fluid.rg * 0.0003;

                      vec2 dir = 25.0 - vUv;
                      float angle = atan(dir.y, dir.x);
                      float amount = length(fluid.rg) * 0.00025;

                      FragColor = getRGB(tMap, uv, angle, amount);
                      FragColor.a = 1.0;
                  }
              `,
      blending: AdditiveBlending
    });
  }
}

export default _;
