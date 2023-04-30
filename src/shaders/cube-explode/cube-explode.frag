precision mediump float;

varying vec2 xy;
varying float ts;

void main() {
  float x;
  float y;

  if (xy.x < 0.0) {
    x = cos(xy.x + ts);
  } else {
    x = cos(xy.x - ts);
  }

  if (xy.y < 0.0) {
    y = cos(xy.y + ts);
  } else {
    y = cos(xy.y - ts);
  }
  x = x/pow(xy.x,2.0);
  y = y/pow(xy.y,2.0);
  x = (x + 1.0)/2.0;
  y = (y + 1.0)/2.0;

  gl_FragColor = vec4(x, y, 0.5, 1);
}