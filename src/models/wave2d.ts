import vertexShaderCode from '../shaders/wave2d/wave2d.vert';
import fragmentShaderCode from '../shaders/wave2d/wave2d.frag';

type Buffers = {
  vertexBuffer: WebGLBuffer;
};

type Uniforms = {
  tLocation: WebGLUniformLocation;
};

export class Wave2d {
  static gl: WebGLRenderingContext;

  constructor(
    private verts: Float32Array,
    private program: WebGLProgram,
    private buffers: Buffers,
    private uniforms: Uniforms
  ) {}

  render(gl: WebGLRenderingContext, t: number) {
    // gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.verts, gl.STATIC_DRAW);

    gl.uniform1f(this.uniforms.tLocation, t);

    gl.drawArrays(gl.TRIANGLES, 0, this.verts.length / 2);
    // console.log('render', this.uniforms.tLocation);
  }

  static initialise = (
    gl: WebGLRenderingContext,
    numPointsX: number,
    numPointsY: number
  ) => {
    this.gl = gl;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) throw new Error('no vertex shader found');
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentshader) throw new Error('no fragment shader found');
    gl.shaderSource(fragmentshader, fragmentShaderCode);
    gl.compileShader(fragmentshader);
    console.log(vertexShader, fragmentshader);

    const program = gl.createProgram();
    if (!program) throw new Error('program not created');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentshader);
    gl.linkProgram(program);

    const vertStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    const fragStatus = gl.getShaderParameter(fragmentshader, gl.COMPILE_STATUS);
    const programStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
    console.log('status', vertStatus, fragStatus, programStatus);

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) throw new Error('buffer not created');

    const vertexLocation = gl.getAttribLocation(program, 'vertex');
    gl.enableVertexAttribArray(vertexLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexLocation, 2, gl.FLOAT, false, 0, 0);

    const tLocation = gl.getUniformLocation(program, 'tLoc');
    console.log('t', tLocation, program);
    if (!tLocation) throw new Error('t uniform not found');

    const vertices: number[] = [];
    vertices.push(0.0, 0.0, 1.0, 0.0, 0.0, 1.0);
    gl.useProgram(program);

    // for (let i = 0; i < numPointsX; i++) {
    //   for (let j = 0; j < numPointsY; j++) {
    //     const x = (2 * i) / numPointsX - 1;
    //     const y = (2 * j) / numPointsY - 1;
    //     vertices.push(x, y);
    //   }
    // }
    // console.log(numPointsX, numPointsY);
    // console.log(vertices);
    return new Wave2d(
      new Float32Array(vertices),
      program,
      {
        vertexBuffer,
      },
      { tLocation }
    );
  };
}
