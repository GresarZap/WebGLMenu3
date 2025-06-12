/***********************************************************************************/
/* Se define la geometría y se almacenan en los buffers de memoria y se renderiza. */
/***********************************************************************************/
export class Piso {
    constructor(gl, r, g, b) {
        /**
         *    3 ----- 2
         *     |   / |
         *     | /   |
         *    0 ----- 1
         */

        /* Las coordenadas cartesianas (x, y) */
        var vertices = new Array(42 * 6);

        /* Lee los colores x vértice (r,g,b,a) */
        var colores = new Array(42 * 8);

        var i = 0;
        var j = 0;
        for (var x = -10; x <= 10; x++) {
            vertices[i] = x; vertices[i + 1] = -1; vertices[i + 2] = 10;
            vertices[i + 3] = x; vertices[i + 4] = -1; vertices[i + 5] = -10;
            i = i + 6;
            colores[j] = r; colores[j + 1] = g; colores[j + 2] = b; colores[j + 3] = 1;
            colores[j + 4] = r; colores[j + 5] = g; colores[j + 6] = b; colores[j + 7] = 1;
            j = j + 8;
        }
        for (var z = 10; z >= -10; z--) {
            vertices[i] = -10; vertices[i + 1] = -1; vertices[i + 2] = z;
            vertices[i + 3] = 10; vertices[i + 4] = -1; vertices[i + 5] = z;
            i = i + 6;
            colores[j] = r; colores[j + 1] = g; colores[j + 2] = b; colores[j + 3] = 1;
            colores[j + 4] = r; colores[j + 5] = g; colores[j + 6] = b; colores[j + 7] = 1;
            j = j + 8;
        }

        this.rectanguloVAO = gl.createVertexArray();
        gl.bindVertexArray(this.rectanguloVAO);

        var verticeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colores), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    dibuja(gl) {
        gl.bindVertexArray(this.rectanguloVAO);
        gl.drawArrays(gl.LINES, 0, 84);
        gl.bindVertexArray(null);
    }
}