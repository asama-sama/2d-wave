// @ts-ignore
import { mat4 } from './lib/gl-matrix-min';
import { Wave } from './models/wave-transition';
import { Wave2d } from './models/wave2d';
import vertexShaderCode from './shaders/wave2d/wave2d.vert';
import fragmentShaderCode from './shaders/wave2d/wave2d.frag';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
if (!canvas) throw new Error('canvas could not be found');
const gl = canvas.getContext('webgl');
if (!gl) {
  throw new Error('WebGL not supported');
}
// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

const { width, height } = canvas;

const wave = Wave.initialise(gl, 500);

let t = 0;

const viewMatrix = mat4.create();
mat4.multiplyScalar(viewMatrix, viewMatrix, 0.5);

const rotation = mat4.create();

const animate = () => {
  requestAnimationFrame(animate);
  // mat4.rotateZ(rotation, rotation, -Math.PI / 300);

  // wave2d.render(gl, t);
  t += 0.01;
  wave.render(t, rotation);
};
animate();
