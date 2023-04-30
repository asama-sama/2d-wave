import vertShader from '../shaders/wave-transition/wave-transition.vert';
import fragShader from '../shaders/wave-transition/wave-transition.frag';

import dotsVertShader from '../shaders/dots/dots.vert';
import dotsFragShader from '../shaders/dots/dots.frag';

export class Wave {
  static gl: WebGLRenderingContext;

  constructor(
    private vertices: Float32Array,
    private vertexBuffer: WebGLBuffer,
    private gl: WebGLRenderingContext,
    private program: WebGLProgram,
    private uniforms: { [key: string]: WebGLUniformLocation | null }
  ) {}

  render(t: number, rotation: number[]) {
    this.gl.useProgram(this.program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      this.vertices,
      this.gl.STATIC_DRAW
    );

    this.gl.uniform1f(this.uniforms.tLocation, t);
    this.gl.uniform1f(this.uniforms.scaleLocation, 1 / Math.PI);
    this.gl.uniformMatrix4fv(this.uniforms.rotation, false, rotation);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length / 2);
  }

  static initialise = (gl: WebGLRenderingContext, n: number) => {
    let points: number[] = [];

    points = [-1, 1, 1, 1, -1, -1, 1, 1, -1, -1, 1, -1];
    points = points.map((p) => 2 * p * Math.PI);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) throw new Error('no vertex shader found');
    gl.shaderSource(vertexShader, vertShader);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) throw new Error('no fragment shader found');
    gl.shaderSource(fragmentShader, fragShader);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) throw new Error('no program found');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) throw new Error('no buffer found');
    const vertexLocation = gl.getAttribLocation(program, 'vertex');
    gl.enableVertexAttribArray(vertexLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexLocation, 2, gl.FLOAT, false, 0, 0);

    const tLocation = gl.getUniformLocation(program, 't');
    const rotation = gl.getUniformLocation(program, 'rotation');
    const scaleLocation = gl.getUniformLocation(program, 'scale');

    const uniforms = {
      tLocation,
      rotation,
      scaleLocation,
    };

    return new Wave(
      new Float32Array(points),
      vertexBuffer,
      gl,
      program,
      uniforms
    );
  };
}
