#pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorMiddle;
uniform vec3 uColorEnd;
varying vec2 vUv;

void main() {
  vec2 displacedUv = vUv + cnoise3(vec3(vUv * 5.0, uTime * 0.1));
  float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
  float outerGlow = distance(vUv, vec2(0.6)) * 4.0 - 1.0;
  strength += outerGlow;
  strength += step(-0.2, strength) * 0.8;
  strength = clamp(strength, 0.1, 1.0);
  vec3 color;
  if (strength < 0.5) {
    float localStrength = strength * 2.0; // Scale to [0, 1] range
    color = mix(uColorStart, uColorMiddle, localStrength);
  } else {
    float localStrength = (strength - 0.5) * 2.0; // Scale to [0, 1] range
    color = mix(uColorMiddle, uColorEnd, localStrength);
  }
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}