precision mediump float;

varying vec2 xy;
varying float ts;

void main() {
  float x;
  float y;
  float z;
  float n;

  float p;
  p = 7.0;

  n = sqrt(pow(xy.x, 2.0) + pow(xy.y, 2.0));

  z = cos(p* n - ts)/n;

  gl_FragColor = vec4(z, 1.0 - z, 0.5, 1);
}