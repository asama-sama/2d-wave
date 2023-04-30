precision mediump float;

varying vec2 xy;
varying float ts;

void main() {
  float x;
  float y;
  float z;

  float p;
  p = 5.0;

  if (xy.x < 0.0) {
    x = cos(p * xy.x + ts);
  } else {
    x = cos(p * xy.x - ts);
  }

  if (xy.y < 0.0) {
    y = cos(p * xy.y + ts);
  } else {
    y = cos(p * xy.y - ts);
  }
  // x = x/pow(xy.x,2.0);
  // y = y/pow(xy.y,2.0);
  x = (x + 1.0)/2.0;
  y = (y + 1.0)/2.0;

  z = sqrt(pow(x,2.0) + pow(y,2.0));

  gl_FragColor = vec4(z, 1.0 - z, 1.0, 1);
}