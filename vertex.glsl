attribute vec4 a_col;
attribute vec4 a_position;

varying vec4 v_col;

uniform float u_Xangle;
uniform float u_Yangle;
uniform float u_Zangle;
uniform float tX;
uniform float tY;
uniform float tZ;

void main() {
    float radX = radians(u_Xangle);
    float radY = radians(u_Yangle);
    float radZ = radians(u_Zangle);

    // Rotation matrix according to Wikipedia
    // https://en.wikipedia.org/wiki/Rotation_matrix#General_rotations
    mat4 rotateY = mat4(cos(radY)*cos(radZ)-tZ*0.001, sin(radX)*sin(radY)*cos(radZ)-cos(radX)*sin(radZ),          cos(radX)*sin(radY)*cos(radZ)+sin(radX)*sin(radZ), tX*0.01,
                        cos(radY)*sin(radZ),          sin(radX)*sin(radY)*sin(radZ)+cos(radX)*cos(radZ)-tZ*0.001, cos(radX)*sin(radY)*sin(radZ)-sin(radX)*cos(radZ), tY*0.01,
                       -sin(radY),                    sin(radX)*cos(radY),                                        cos(radX)*cos(radY)-tZ*0.001,                      tZ*0.01,
                        0.0,                          0.0,                                                        0.0,                                               1.0);

    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = vec4(1.4*a_position.xyz,1.0)*rotateY;
    v_col = vec4(4.,6.,6.,1.0)*a_col*rotateY;
    gl_PointSize = 1.0;
}