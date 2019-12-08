(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    // Generic format
    function genDraw(type, vertices) {
      var n = initBuffers(vertices);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function initBuffers(vertices) {
      var n = vertices.length / 3;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return -1;
      }

      gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      return n;
    }

    var atas = new Float32Array([
      -0.5, 0.5, -0.5,
      -0.5,  0.5, 0.5,
      0.5,  0.5, 0.5,
      0.5, 0.5,  -0.5
    ]);
    var bawah = new Float32Array([
      -0.5, -0.5, -0.5,
      -0.5,  -0.5, +0.5,
      0.5,  -0.5, 0.5,
      0.5, -0.5,  -0.5
    ]);
    var pilar1 = new Float32Array([
      -0.5, -0.5, -0.5,
      -0.5,  0.5, -0.5
    ]);
    var pilar2 = new Float32Array([
      0.5, -0.5, -0.5,
      0.5,  0.5, -0.5
    ]);
    var pilar3 = new Float32Array([
      0.5, -0.5, 0.5,
      0.5,  0.5, 0.5
    ]);
    var pilar4 = new Float32Array([
      -0.5, -0.5, 0.5,
      -0.5,  0.5, 0.5
    ]);

    var triangleVertices1 = new Float32Array([
      0.2, -0.5, 0.0,  0.2, +0.5, 0.0,  0.3, +0.5, 0.0,  0.3, -0.5, 0.0
    ]);
    var triangleVertices2 = new Float32Array([
      0.5, -0.5, 0.0,  0.5, +0.5, 0.0,  0.6, +0.5, 0.0,  0.6, -0.5, 0.0
    ]);
    var triangleVertices3 = new Float32Array([
      0.3, -0.1, 0.0,  0.3, +0.1, 0.0,  0.5, +0.1, 0.0,  0.5, -0.1, 0.0
    ]);
    var linesVertices21 = new Float32Array([
      0.2, -0.5, 0.0,  0.15, -0.4, 0.0,  0.15, 0.6, 0.0
    ]);
    var linesVertices31 = new Float32Array([
      0.15, 0.6, 0.0,   0.25, +0.6, 0.0,  0.3, +0.5, 0.0
    ]);
    var linesVertices41 = new Float32Array([
      0.6, +0.5, 0.0,   0.55, +0.6, 0.0,  0.45, 0.6, 0.0,   0.45, 0.2, 0.0,   0.3, 0.2, 0.0
    ]);
    var linesVertices71 = new Float32Array([
      0.50, -0.5, 0.0,   0.45, -0.4, 0.0,  0.45, -0.1, 0.0
    ]);
    
    var mmLoc = gl.getUniformLocation(program, 'modelMatrix');
    var mm = glMatrix.mat4.create();
    var vecScale = [ 1.0, 1.0, 1.0 ];
    var vecScaleH = [ 0.3, 0.3, 0.3 ];
    var trans = {
      x: 0.0, y: 0.0, z:0.0
    }
    var xAdders = 0.04;
    var yAdders = 0.03;
    var zAdders = 0.02;
    var theta = 0.0;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Cube
      // Biar Cube-nya nggak ikut kecil sama H
      mm = glMatrix.mat4.create(); //reset matrix to origin
      glMatrix.mat4.scale(mm, mm, vecScale);
      //Muter Cube-nya
      theta += 0.0037;
      glMatrix.mat4.rotateX(mm, mm, -0.25);
      glMatrix.mat4.rotateY(mm, mm, 0.3);
      gl.uniformMatrix4fv(mmLoc, false, mm);
      // nge-draw Cube-nya
      genDraw(gl.LINE_LOOP, atas);
      genDraw(gl.LINE_LOOP, bawah);
      genDraw(gl.LINES, pilar1);
      genDraw(gl.LINES, pilar2);
      genDraw(gl.LINES, pilar3);
      genDraw(gl.LINES, pilar4);

      // Huruf H
      //Mengecilkan huruf H
      mm = glMatrix.mat4.create(); //reset matrix to origin
      glMatrix.mat4.scale(mm, mm, vecScaleH);
      // Rotate
      theta += 0.0037;
      glMatrix.mat4.rotateY(mm, mm, theta);
      //Biar H-nya jalan-jalan
      console.log(trans.x);
      if(trans.x + 0.5 > 0.5*3.5|| trans.x + -0.5 < -0.5*3.5)
      {
        xAdders *= -1;
      }
      trans.x += xAdders;
      if(trans.y + 0.5 > 0.5*3.5 || trans.y + -0.5 < -0.5*3.5)
      {
        yAdders *= -1;
      }
      trans.y += yAdders;
      if(trans.z + 0.5 > 0.5*3.5 || trans.z + -0.5 < -0.5*3.5)
      {
        zAdders *= -1;
      }
      trans.z += zAdders;

      glMatrix.mat4.translate(mm, mm, [trans.x, trans.y, trans.z]);

      gl.uniformMatrix4fv(mmLoc, false, mm);

      genDraw(gl.TRIANGLE_FAN, triangleVertices1);
      genDraw(gl.TRIANGLE_FAN, triangleVertices2);
      genDraw(gl.TRIANGLE_FAN, triangleVertices3);
      genDraw(gl.LINE_STRIP, linesVertices21);
      genDraw(gl.LINE_STRIP, linesVertices31);
      genDraw(gl.LINE_STRIP, linesVertices41);
      genDraw(gl.LINE_STRIP, linesVertices71);
  
      requestAnimationFrame(render);
    }
    gl.enable(gl.DEPTH_TEST);
    render();
  }
})();
