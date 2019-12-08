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
      var n = vertices.length / 2;

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

      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      return n;
    }

    // Generic format3d
    function genDraw3d(type, vertices) {
      var n = initBuffers3d(vertices);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function initBuffers3d(vertices) {
      var n = vertices.length / 3;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition3d = gl.getAttribLocation(program, 'vPosition3d');
      if (vPosition3d < 0) {
        console.log('Failed to get the storage location of vPosition3d');
        return -1;
      }

      gl.vertexAttribPointer(vPosition3d, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition3d);
      return n;
    }
    
    // var cubeVertices = [];
    // Posisi 8 titik kubus
    var cubePoints = [
      [ -0.5, -0.5,  0.5 ],
      [ -0.5,  0.5,  0.5 ],
      [  0.5,  0.5,  0.5 ],
      [  0.5, -0.5,  0.5 ],
      [ -0.5, -0.5, -0.5 ],
      [ -0.5,  0.5, -0.5 ],
      [  0.5,  0.5, -0.5 ],
      [  0.5, -0.5, -0.5 ]
    ];
    
    var cubeVertices = new Float32Array([
      -0.5, -0.5,  0.5,
      -0.5,  0.5,  0.5,
      0.5,  0.5,  0.5,
      0.5, -0.5,  0.5,
      -0.5, -0.5, -0.5,
      -0.5,  0.5, -0.5,
      0.5,  0.5, -0.5,
      0.5, -0.5, -0.5
    ]);

    var hurufVertices = new Float32Array([
      -0.7, -0.5,  -0.7, +0.5,  -0.6, +0.5, -0.6, +0.1,  -0.4, +0.1,  -0.4, +0.5,  -0.3, +0.5,  -0.3, -0.5, -0.4, -0.5, -0.4, -0.1, -0.6, -0.1, -0.6, -0.5,
    ]);
    var hurufVertices2 = new Float32Array([
      -0.7, -0.5,  -0.75, -0.4,  -0.75, 0.6,  -0.7, +0.5
    ]);
    var linesVertices3 = new Float32Array([
      -0.75, 0.6,   -0.65, +0.6,  -0.6, +0.5
    ]);
    var linesVertices4 = new Float32Array([
      -0.3, +0.5,   -0.35, +0.6,  -0.45, 0.6,   -0.45, 0.2,   -0.6, 0.2
    ]);
    var linesVertices5 = new Float32Array([
      -0.4, +0.5,   -0.45, +0.6
    ]);
    var linesVertices6 = new Float32Array([
      -0.4, +0.1,   -0.45, +0.2
    ]);
    var linesVertices7 = new Float32Array([
      -0.4, -0.5,   -0.45, -0.4,  -0.45, -0.1
    ]);

    
    var triangleVertices1 = new Float32Array([
      0.2, -0.5,  0.2, +0.5,  0.3, +0.5,  0.3, -0.5
    ]);
    var triangleVertices2 = new Float32Array([
      0.5, -0.5,  0.5, +0.5,  0.6, +0.5,  0.6, -0.5
    ]);
    var triangleVertices3 = new Float32Array([
      0.3, -0.1,  0.3, +0.1,  0.5, +0.1,  0.5, -0.1
    ]);
    var linesVertices21 = new Float32Array([
      0.2, -0.5,  0.15, -0.4,  0.15, 0.6
    ]);
    var linesVertices31 = new Float32Array([
      0.15, 0.6,   0.25, +0.6,  0.3, +0.5
    ]);
    var linesVertices41 = new Float32Array([
      0.6, +0.5,   0.55, +0.6,  0.45, 0.6,   0.45, 0.2,   0.3, 0.2
    ]);
    var linesVertices71 = new Float32Array([
      0.50, -0.5,   0.45, -0.4,  0.45, -0.1
    ]);
    
    var originxLoc = gl.getUniformLocation(program, 'originx');
    var originyLoc = gl.getUniformLocation(program, 'originy');

    var ioriginxLoc = gl.getUniformLocation(program, 'ioriginx');
    var ioriginyLoc = gl.getUniformLocation(program, 'ioriginy');

    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0;
    var theta2 = 0.0;
    
    var sxLoc = gl.getUniformLocation(program, 'sx');
    var sx = 0.5;
    var syLoc = gl.getUniformLocation(program, 'sy');
    var sy = 0.5;
    var szLoc = gl.getUniformLocation(program, 'sz');
    var sz = 0.5;

    var txLoc = gl.getUniformLocation(program, 'tx');
    var tx = 0.0;
    var tx2 = 0.0;
    var tyLoc = gl.getUniformLocation(program, 'ty');
    var ty = 0.0;
    var ty2 = 0.0;
    var tzLoc = gl.getUniformLocation(program, 'tz');
    var tz = 0.0;
    var tz2 = 0.0;
    
    var flag = 0;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      //Cube
      //Translasi
      gl.uniform1f(txLoc, tx2);
      gl.uniform1f(tyLoc, ty2);
      gl.uniform1f(tzLoc, tz2);
      //Rotation
      // gl.uniform1f(thetaLocation, theta2);
      genDraw3d(gl.LINE_STRIP, cubeVertices);

      // Rotate
      theta += 0.0037;
      gl.uniform1f(thetaLocation, theta);

      //Skala
      gl.uniform1f(sxLoc, sx);
      gl.uniform1f(syLoc, sy);
      gl.uniform1f(szLoc, sz);

      //Translation Gerak
      if(flag==0){
        tx+=0.0037;
        // ty+=0.0037;
        tz+=0.0037;
      }
      else if(flag==1){
        tx-=0.0037; 
        // ty-=0.0037; 
        tz-=0.0037; 
      }

      if(tx<=-0.5){
        flag = 0;
      }
      else if(tx>=0.5){
        flag = 1;        
      }

      //Translasi
      gl.uniform1f(txLoc, tx);
      gl.uniform1f(tyLoc, ty);
      gl.uniform1f(tzLoc, tz);

      // Origin2
      var originx = -0.4;
      var originy = 0.0;
      var ioriginx = 0.4;    
      var ioriginy = 0.0; 
      gl.uniform1f(originxLoc, originx);
      gl.uniform1f(originyLoc, originy);
      gl.uniform1f(ioriginxLoc, ioriginx);
      gl.uniform1f(ioriginyLoc, ioriginy);
      
      genDraw(gl.TRIANGLE_FAN, triangleVertices1);
      genDraw(gl.TRIANGLE_FAN, triangleVertices2);
      genDraw(gl.TRIANGLE_FAN, triangleVertices3);
      genDraw(gl.LINE_STRIP, linesVertices21);
      genDraw(gl.LINE_STRIP, linesVertices31);
      genDraw(gl.LINE_STRIP, linesVertices41);
      genDraw(gl.LINE_STRIP, linesVertices71);
  
      requestAnimationFrame(render);
    }
    render();
  }
})();

