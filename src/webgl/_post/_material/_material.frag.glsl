precision mediump float;
#define PI 3.14159265359

uniform vec2 u_res;
uniform float u_time;

uniform vec2 u_mouse;

uniform sampler2D u_diff;


// ->> uv remapping curvature
const vec2 curvature = vec2(2., 2.);
vec2 curveRemapUV(in vec2 uv) {
   
    uv *= 2.;
    uv -= 1.;
    
    vec2 offset = abs(uv.yx) / vec2(curvature.x, curvature.y);
    uv = uv + uv * offset * offset;
    uv = uv * 0.5 + .5;
    return uv;
}

// ->> scanlines
 vec3 scanLines(in float uv, in float resolution, in float opacity) {
     float intensity = sin(uv * resolution * PI * 2.0);
     intensity = ((0.5 * intensity) + 0.5) * 1.0 + 0.5;
     return vec3(vec3(pow(intensity, opacity)));
 }


void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 curve_uv = curveRemapUV(uv);
  float grad = distance(uv.y, .5);
  grad = smoothstep(0., 1., grad);


  uv = mix(uv, curve_uv, grad * .5);

  // * params
  float r_time = u_time * 1.;

  // -> Expand Uvs
  float mouse_dist = distance(u_mouse, uv);
  mouse_dist = smoothstep(.2, .0, mouse_dist);
  uv -= (mouse_dist * uv) * .005;
  
  // -> RGB shift
  float factor = .002 * grad * 4.;

  vec2 uvr = vec2(
    uv.x + sin(uv.x * 10. * r_time) * factor,
    uv.y 
  );
  vec2 uvg = vec2(
    uv.x ,
    uv.y + sin(uv.y * 8. * r_time) * factor
  );
  vec2 uvb = vec2(
    uv.x + atan(uv.y * 80. * r_time) * factor, 
    uv.y 
  );

  float imgr = texture2D(u_diff, uvr).r;
  float imgg = texture2D(u_diff, uvg).g;
  float imgb = texture2D(u_diff, uvb).b;

  vec3 color = vec3(imgr, imgg, imgb);

  // -> banding & scan lines
  float banding = .9 - cos((uvb.y + sin(u_time)) * 20. + (u_time * 10.)) * .2;
  color += scanLines(uv.y, 600., banding) * .1;

  // alpha from distorted image (not active)
  float alpha = texture2D(u_diff, uv).a;

  // ->> mouse processing
  color.r += color.r * mouse_dist * 1.0;

  gl_FragColor.rgb = color;
  gl_FragColor.a = alpha;
}
  