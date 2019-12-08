precision mediump float;

attribute vec3 vPosition;
attribute vec3 vColor;
uniform mat4 modelMatrix;

void main() {
    gl_Position = modelMatrix * vec4(vPosition, 1.0);
}