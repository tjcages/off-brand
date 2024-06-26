#define PI 3.1415926538
attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 u_camera;
uniform mat4 u_id;
uniform float u_y;
uniform vec2 u_scale;
uniform vec2 u_ratio;

uniform float u_inView;
varying float v_inView;
uniform float u_hover;
varying float v_hover;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_vs;

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;

// grid
uniform vec2 u_gridScale;
uniform vec2 u_gridRatio;
uniform mat4 u_gridId;
uniform float u_TOGRID;

varying vec3 v_TEST;


void main() {
  vec4 pos = position;

  // ->> GRID / SCROLL
  float TOSCROLL = u_TOGRID;
  vec2 final_scale = mix(u_gridScale, u_scale, TOSCROLL);
  vec2 final_ratio = mix(u_gridRatio, u_ratio, TOSCROLL);
  float final_inview = mix(1., u_inView, TOSCROLL);

  // animation
  pos.xy += .2;
  pos.y *= final_inview;
  pos.xy -= .2;

  pos.xy *= 1. - u_hover * .1;


  pos.xy *= final_scale;
  pos.y += u_y * TOSCROLL;
  
  // ->> GRID / SCROLL
  vec4 final_position = mix(
    u_camera * u_gridId * vec4(pos), 
    u_camera * u_id * vec4(pos), 
    TOSCROLL
  );

  gl_Position = final_position;

  v_res = u_res;
  v_time = u_time;

  vec2 new_uv = texcoord;
  new_uv -= vec2(.5);
  new_uv *= final_ratio;
  new_uv *= 1. - u_hover * .2;
  new_uv += vec2(.5);

  v_uv = new_uv;

  v_inView = final_inview;
  v_hover = u_hover;

  /* TEST OBJ */ 
  v_TEST = vec3(0., 0., 0.);
}

  
