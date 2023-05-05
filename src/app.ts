// @ts-ignore
import { mat4 } from './lib/gl-matrix-min';
import { Wave } from './models/wave-transition';
const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
if (!canvas) throw new Error('canvas could not be found');
const gl = canvas.getContext('webgl');
if (!gl) {
  throw new Error('WebGL not supported');
}

const waveShaders = Wave.getShaders();
let selectedShader = Object.keys(waveShaders)[0];

const wavePrograms: { [key: string]: Wave } = {};
for (let shaderKey of Object.keys(waveShaders)) {
  const wave = Wave.initialise(gl, waveShaders[shaderKey]);
  wavePrograms[shaderKey] = wave;
}
let activeProgram = wavePrograms[selectedShader];
activeProgram.activateProgram();

const viewMatrix = mat4.create();
mat4.multiplyScalar(viewMatrix, viewMatrix, 0.5);

const buttons = document.createElement('div');
buttons.className = 'buttons';
for (let shaderKey of Object.keys(waveShaders)) {
  const button = document.createElement('button');
  button.addEventListener('click', (e) => {
    activeProgram = wavePrograms[shaderKey];
    activeProgram.activateProgram();
  });
  button.innerHTML = shaderKey;
  buttons.appendChild(button);
}
document.querySelector('body')?.appendChild(buttons);

const rotation = mat4.create();

let t = 0;
const animate = () => {
  requestAnimationFrame(animate);
  t += 0.01;
  activeProgram.render(t, rotation);
};
animate();
