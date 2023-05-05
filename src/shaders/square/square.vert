precision mediump float;

attribute vec2 vertex;

uniform float scale;
uniform float t;
uniform mat4 rotation;

varying vec2 xy;
varying float ts;

void main() {

  xy = vertex.xy;
  ts = t;
  // y = sin(newPos.y + t);

  gl_Position = rotation * vec4( scale * vertex.xy, 0, 1.0);
}