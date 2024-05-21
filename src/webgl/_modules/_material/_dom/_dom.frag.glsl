precision mediump float;

uniform sampler2D u_diff;  // vec4 img = texture2D(u_diff, v_uv);

varying vec2 v_res;
varying float v_time;
varying vec2 v_uv;

varying float v_inView;
varying float v_hover;

void main() {

    vec2 uv = v_uv;
    uv.y *= v_inView;
    vec4 img = texture2D(u_diff, uv);
    
    float gs = (img.r + img.g + img.b)/3.33333333;
    vec3 color = mix(vec3(gs), img.rgb, smoothstep(.7, 1., v_inView));
    color = mix(color, vec3(gs), v_hover * .85);

    gl_FragColor.rgb = color;
    gl_FragColor.a = 1.;
}

// vec2 st = gl_FragCoord.xy/v_res.xy;

