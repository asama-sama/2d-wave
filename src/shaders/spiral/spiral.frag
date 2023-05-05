precision mediump float;
#define M_PI 3.1415926535897932384626433832795

varying vec2 xy;
varying float ts;

void main() {
  float x;
  float y;
  float z;
  float n;

  float p;
  float angle;
  float speed;
  p = 7.0;

  x = xy.x;
  y = xy.y;
  n = sqrt(pow(x, 2.0) + pow(y, 2.0));

  angle = atan(y, x);

  speed = 3.0;
  z = (cos(n * 10.0 + angle - ts * 3.0) + 1.0) / 2.0;
  
  gl_FragColor = vec4(1.0 - z, 0.2, 0.9, 1);
}