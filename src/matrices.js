/***************************************************************************/
/* Transformaciones mediante matrices                                      */
/***************************************************************************/

/* Convierte de grados a radianes */
export function toRadians(grados) {
    return grados * Math.PI / 180;
};

/* Matriz Identidad */
export function identidad(r) {
    r[0] = 1; r[4] = 0; r[8] = 0; r[12] = 0;
    r[1] = 0; r[5] = 1; r[9] = 0; r[13] = 0;
    r[2] = 0; r[6] = 0; r[10] = 1; r[14] = 0;
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
}

/* Traslación - glTranslatef */
export function traslacion(matriz, tx, ty, tz) {
    var r = new Array(16);
    r[0] = 1; r[4] = 0; r[8] = 0; r[12] = tx;
    r[1] = 0; r[5] = 1; r[9] = 0; r[13] = ty;
    r[2] = 0; r[6] = 0; r[10] = 1; r[14] = tz;
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
    multiplica(matriz, matriz, r);
}

/* Escalación - glScalef */
export function escalacion(matriz, sx, sy, sz) {
    var r = new Array(16);
    r[0] = sx; r[4] = 0; r[8] = 0; r[12] = 0;
    r[1] = 0; r[5] = sy; r[9] = 0; r[13] = 0;
    r[2] = 0; r[6] = 0; r[10] = sz; r[14] = 0;
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
    multiplica(matriz, matriz, r);
}

/* Rotación sobre X - glRotatef */
export function rotacionX(matriz, theta) {
    let r = new Array(16);
    var c = Math.cos(toRadians(theta));
    var s = Math.sin(toRadians(theta));
    r[0] = 1; r[4] = 0; r[8] = 0; r[12] = 0;
    r[1] = 0; r[5] = c; r[9] = -s; r[13] = 0;
    r[2] = 0; r[6] = s; r[10] = c; r[14] = 0;
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
    multiplica(matriz, matriz, r);
}

/* Rotación sobre Y - glRotatef */
export function rotacionY(matriz, theta) {
    let r = new Array(16);
    var c = Math.cos(toRadians(theta));
    var s = Math.sin(toRadians(theta));
    r[0] = c; r[4] = 0; r[8] = s; r[12] = 0;
    r[1] = 0; r[5] = 1; r[9] = 0; r[13] = 0;
    r[2] = -s; r[6] = 0; r[10] = c; r[14] = 0;
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
    multiplica(matriz, matriz, r);
}

/* Rotación sobre Z - glRotatef */
export function rotacionZ(matriz, theta) {
    let r = new Array(16);
    var c = Math.cos(toRadians(theta));
    var s = Math.sin(toRadians(theta));
    r[0] = c; r[4] = -s; r[8] = 0; r[12] = 0;
    r[1] = s; r[5] = c; r[9] = 0; r[13] = 0;
    r[2] = 0; r[6] = 0; r[10] = 1; r[14] = 0;
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
    multiplica(matriz, matriz, r);
}

/* Proyección Paralela - glOrtho */
export function ortho(r, izq, der, abj, arr, cerca, lejos) {
    r[0] = 2 / (der - izq); r[4] = 0; r[8] = 0; r[12] = -(der + izq) / (der - izq);
    r[1] = 0; r[5] = 2 / (arr - abj); r[9] = 0; r[13] = -(arr + abj) / (arr - abj);
    r[2] = 0; r[6] = 0; r[10] = -2 / (lejos - cerca); r[14] = -(lejos + cerca) / (lejos - cerca);
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
}

/* Proyección Perspectiva - glFrustum */
export function frustum(r, izq, der, abj, arr, cerca, lejos) {
    r[0] = 2 * cerca / (der - izq); r[4] = 0; r[8] = (der + izq) / (der - izq); r[12] = 0;
    r[1] = 0; r[5] = 2 * cerca / (arr - abj); r[9] = (arr + abj) / (arr - abj); r[13] = 0;
    r[2] = 0; r[6] = 0; r[10] = -(lejos + cerca) / (lejos - cerca); r[14] = -2 * lejos * cerca / (lejos - cerca);
    r[3] = 0; r[7] = 0; r[11] = -1; r[15] = 0;
}

/* Proyección Perspectiva - gluPerspective */
export function perspective(r, fovy, aspecto, cerca, lejos) {
    var ang = fovy * 0.5;
    var f = (Math.abs(Math.sin(toRadians(ang))) < 1e-8 ? 0 : 1) / Math.tan(toRadians(ang));
    r[0] = f / aspecto; r[4] = 0; r[8] = 0; r[12] = 0;
    r[1] = 0; r[5] = f; r[9] = 0; r[13] = 0;
    r[2] = 0; r[6] = 0; r[10] = -(lejos + cerca) / (lejos - cerca); r[14] = -2.0 * lejos * cerca / (lejos - cerca);
    r[3] = 0; r[7] = 0; r[11] = - 1.0; r[15] = 0;
}

/* Multiplicación de matrices de 4 x 4 */
export function multiplica(c, a, b) {
    let r = new Array(16);
    let i, j, k;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let s = 0;
            for (k = 0; k < 4; k++)
                s = s + a[i + k * 4] * b[k + j * 4];
            r[i + j * 4] = s;
        }
    }
    for (i = 0; i < 16; i++)
        c[i] = r[i];
}

/* Multiplicación de matriz 4 x 4 * vector 3, c = a * b */
export function multiplicaMV(c, a, b) {
    let r = new Array(16);

    /*
      | a[0] a[4] a[ 8] a[12] |     | b[0] |
      | a[1] a[5] a[ 9] a[13] |  *  | b[1] |
      | a[2] a[6] a[10] a[14] |     | b[2] |
      | a[3] a[7] a[11] a[15] |
      */

    r[0] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12];
    r[1] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13];
    r[2] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14];
    for (var i = 0; i < 3; i++)
        c[i] = r[i];
}

/* Transpuesta de una matriz 4 x 4 */
export function transpuesta(r, m) {
    var i = 0;
    for (var j = 0; j < 4; j++)
        for (var k = 0; k < 4; k++) {
            r[j + k * 4] = m[i];
            i++;
        }
}

/* Invierte una matriz de 4 x 4, b = inv(a) */
/* Aquí está una versión eficiente, utilizando el 
  * Teorema de Expansión de Laplace (página 9) */
export function invierte(b, a) {

    /*
      | a[0] a[4] a[ 8] a[12] |
      | a[1] a[5] a[ 9] a[13] |
      | a[2] a[6] a[10] a[14] |
      | a[3] a[7] a[11] a[15] |
    */

    var s0 = a[0] * a[5] - a[1] * a[4];
    var s1 = a[0] * a[9] - a[1] * a[8];
    var s2 = a[0] * a[13] - a[1] * a[12];
    var s3 = a[4] * a[9] - a[5] * a[8];
    var s4 = a[4] * a[13] - a[5] * a[12];
    var s5 = a[8] * a[13] - a[9] * a[12];

    var c5 = a[10] * a[15] - a[11] * a[14];
    var c4 = a[6] * a[15] - a[7] * a[14];
    var c3 = a[6] * a[11] - a[7] * a[10];
    var c2 = a[2] * a[15] - a[3] * a[14];
    var c1 = a[2] * a[11] - a[3] * a[10];
    var c0 = a[2] * a[7] - a[3] * a[6];

    // Se deberia verificar por el determinante igual a 0
    var invdet = 1.0 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0);

    b[0] = (a[5] * c5 - a[9] * c4 + a[13] * c3) * invdet;
    b[4] = (-a[4] * c5 + a[8] * c4 - a[12] * c3) * invdet;
    b[8] = (a[7] * s5 - a[11] * s4 + a[15] * s3) * invdet;
    b[12] = (-a[6] * s5 + a[10] * s4 - a[14] * s3) * invdet;

    b[1] = (-a[1] * c5 + a[9] * c2 - a[13] * c1) * invdet;
    b[5] = (a[0] * c5 - a[8] * c2 + a[12] * c1) * invdet;
    b[9] = (-a[3] * s5 + a[11] * s2 - a[15] * s1) * invdet;
    b[13] = (a[2] * s5 - a[10] * s2 + a[14] * s1) * invdet;

    b[2] = (a[1] * c4 - a[5] * c2 + a[13] * c0) * invdet;
    b[6] = (-a[0] * c4 + a[4] * c2 - a[12] * c0) * invdet;
    b[10] = (a[3] * s4 - a[7] * s2 + a[15] * s0) * invdet;
    b[14] = (-a[2] * s4 + a[6] * s2 - a[14] * s0) * invdet;

    b[3] = (-a[1] * c3 + a[5] * c1 - a[9] * c0) * invdet;
    b[7] = (a[0] * c3 - a[4] * c1 + a[8] * c0) * invdet;
    b[11] = (-a[3] * s3 + a[7] * s1 - a[11] * s0) * invdet;
    b[15] = (a[2] * s3 - a[6] * s1 + a[10] * s0) * invdet;

}