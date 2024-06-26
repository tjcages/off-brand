precision mediump float;
#define PI 3.14159265359

uniform vec2 u_res;
uniform float u_time;

uniform vec2 u_mouse;

uniform sampler2D u_diff;
uniform float noiseSeed; // Added uniform for noise seed
uniform float noiseAmount; // Added uniform for noise amount

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

// Noise function
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    vec2 curve_uv = curveRemapUV(uv);
    float grad = distance(uv.y, .5);
    grad = smoothstep(0., 1., grad);

    uv = mix(uv, curve_uv, grad * .25);

    // RGB shift and Expand Uvs removed

    float imgr = texture2D(u_diff, uv).r;
    float imgg = texture2D(u_diff, uv).g;
    float imgb = texture2D(u_diff, uv).b;

    vec3 color = vec3(imgr, imgg, imgb);

    // Adding noise
    color += vec3(
        mix(-noiseAmount, noiseAmount, fract(noiseSeed + rand(uv * 1234.5678))),
        mix(-noiseAmount, noiseAmount, fract(noiseSeed + rand(uv * 876.54321))),
        mix(-noiseAmount, noiseAmount, fract(noiseSeed + rand(uv * 3214.5678)))
    );

    // alpha from distorted image (not active)
    float alpha = texture2D(u_diff, uv).a;

    gl_FragColor.rgb = clamp(color, 0.0, 1.0); // Ensure color values are clamped
    gl_FragColor.a = alpha;
}