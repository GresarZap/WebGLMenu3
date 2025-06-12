import { Cubo as CuboColor } from './cuboColor.js';
import { Esfera } from './esfera.js';
import { Esfera2 } from './esfera2.js';
import { Cilindro } from './cilindro.js';
import { Cilindro2 } from './cilindro2.js';
import { ArcBall } from './arcBall.js';
import { Cuaternion } from './cuaternion.js';
import { ortho, identidad, escalacion, multiplica, rotacionZ, rotacionY, rotacionX, traslacion, perspective, frustum, multiplicaMV, transpuesta, invierte } from './matrices.js';

import { getArbolesData } from './arbol.js';
import { Esfera3 } from './esfera3.js';
import { Esfera4 } from './esfera4.js';
import { Piso } from './piso.js';


/* Variables globales */
let canvas;
let programaID;
let programaID2;
let programaID3;
let gl;
let cubo;
let esfera;
let tierra;
let cilindro;
let cilindro2;
let piso;
let arcBall;
let textura;
let textura2;
let codigoDeTextura;
let codigoDeTextura2;
let background = [0.6, 0.85, 0.95];
let bgSwitch = true;
let addX = 1;
let addY = 1;
let addZ = 1;
let addXIlu = 1;
let addYIlu = 1;
let addZIlu = 1;
let sliderX;
let sliderY;
let sliderZ;
let sliderXIlu;
let sliderYIlu;
let sliderZIlu;
let valorX;
let valorY;
let valorZ;
let valorXIlu;
let valorYIlu;
let valorZIlu;

let arbolesData;
let arboles;
let nubesData;
let nubes;
let floresData;
let flores;
let objeto;
let objetoIlu;

let optionDraw = true;
let forma = "cubo";

let proyeccionOpt = "frustum"; // perspectiva, frustum, paralela

/* Tamaño de la ventana en pixeles */
let ancho = 1440.0;
let alto = 710.0;

/* Variables Uniformes */
let uMatrizProyeccion;
let uMatrizVista;
let uMatrizModelo;

let uMatrizProyeccion2;
let uMatrizVista2;
let uMatrizModelo2;
let uUnidadDeTextura;

let uMatrizProyeccion3;
let uMatrizVista3;
let uMatrizModelo3;
let uUnidadDeTextura3;
let uPosicionVista;
let uPosicionLuz;
let u_Ia;
let u_Id;
let u_Is;
let u_ka;
let u_kd;
let u_ks;
let u_brillo;

/* Ubicación de la vista */
let posicionVista = [0, 0, 0];

/* Ubicación de la luz */
let luzX = 0;
let luzY = 0;
let luzZ = -2;
let pLuz;
let posicionLuz = [luzX, luzY, luzZ];

/* Matrices */
let MatrizProyeccion = new Array(16);
let MatrizVista = new Array(16);
let MatrizModelo = new Array(16);

/* Para la interacción */
let MatrizRotacion = new Array(16);
let Matriz = new Array(16);
let boton_izq_presionado = false;
let sx = 1, sy = 1, sz = 1;

/***************************************************************************/
/* Se crean, compilan y enlazan los programas Shader                       */
/***************************************************************************/
function compilaEnlazaLosShaders() {

    /* Se compila el shader de vertice */
    var shaderDeVertice = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shaderDeVertice, document.getElementById("vs").text.trim());
    gl.compileShader(shaderDeVertice);
    if (!gl.getShaderParameter(shaderDeVertice, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeVertice));
    }

    /* Se compila el shader de fragmento */
    var shaderDeFragmento = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shaderDeFragmento, document.getElementById("fs").text.trim());
    gl.compileShader(shaderDeFragmento);
    if (!gl.getShaderParameter(shaderDeFragmento, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeFragmento));
    }

    /* Se enlaza ambos shader */
    programaID = gl.createProgram();
    gl.attachShader(programaID, shaderDeVertice);
    gl.attachShader(programaID, shaderDeFragmento);
    gl.linkProgram(programaID);
    if (!gl.getProgramParameter(programaID, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(programaID));
    }

    /* Se instala el programa de shaders para utilizarlo */
    // gl.useProgram(programaID);
}
function compilaEnlazaLosShaders2() {

    /* Se compila el shader de vertice */
    var shaderDeVertice = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shaderDeVertice, document.getElementById("vs2").text.trim());
    gl.compileShader(shaderDeVertice);
    if (!gl.getShaderParameter(shaderDeVertice, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeVertice));
    }

    /* Se compila el shader de fragmento */
    var shaderDeFragmento = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shaderDeFragmento, document.getElementById("fs2").text.trim());
    gl.compileShader(shaderDeFragmento);
    if (!gl.getShaderParameter(shaderDeFragmento, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeFragmento));
    }

    /* Se enlaza ambos shader */
    programaID2 = gl.createProgram();
    gl.attachShader(programaID2, shaderDeVertice);
    gl.attachShader(programaID2, shaderDeFragmento);
    gl.linkProgram(programaID2);
    if (!gl.getProgramParameter(programaID2, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(programaID2));
    }

    /* Se instala el programa de shaders para utilizarlo */
    // gl.useProgram(programaID);
}
function compilaEnlazaLosShaders3() {

    /* Se compila el shader de vertice */
    var shaderDeVertice = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shaderDeVertice, document.getElementById("vs3").text.trim());
    gl.compileShader(shaderDeVertice);
    if (!gl.getShaderParameter(shaderDeVertice, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeVertice));
    }

    /* Se compila el shader de fragmento */
    var shaderDeFragmento = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shaderDeFragmento, document.getElementById("fs3").text.trim());
    gl.compileShader(shaderDeFragmento);
    if (!gl.getShaderParameter(shaderDeFragmento, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeFragmento));
    }

    /* Se enlaza ambos shader */
    programaID3 = gl.createProgram();
    gl.attachShader(programaID3, shaderDeVertice);
    gl.attachShader(programaID3, shaderDeFragmento);
    gl.linkProgram(programaID3);
    if (!gl.getProgramParameter(programaID3, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(programaID3));
    }

    /* Se instala el programa de shaders para utilizarlo */
    // gl.useProgram(programaID);
}

/***************************************************************************/
/* Eventos del Ratón                                                       */
/***************************************************************************/

function mouseDown(event) {
    var posx = new Number();
    var posy = new Number();

    /* Obtiene la coordenada dentro de la área mayor */
    if (event.x != undefined && event.y != undefined) {
        posx = event.x;
        posy = event.y;
    } else {
        posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    /* Obtiene la coordenada dentro del canvas */
    posx = posx - canvas.offsetLeft;
    posy = posy - canvas.offsetTop;

    /* Matriz = MatrizRotacion */
    Matriz = MatrizRotacion.slice(); /* Copia */
    arcBall.primerPunto(posx, posy);

    boton_izq_presionado = true;

    return false;
};

function mouseUp(e) {
    boton_izq_presionado = false;
};

function mouseMove(event) {
    if (!boton_izq_presionado)
        return false;

    var posx = new Number();
    var posy = new Number();

    /* Obtiene la coordenada dentro de la área mayor */
    if (event.x != undefined && event.y != undefined) {
        posx = event.x;
        posy = event.y;
    } else {
        posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    /* Obtiene la coordenada dentro del canvas */
    posx = posx - canvas.offsetLeft;
    posy = posy - canvas.offsetTop;

    /* Actualiza el segundo vector y obtiene el cuaternión */
    let q = arcBall.segundoPunto(posx, posy);

    /* Convierte el cuaternión a una matriz de rotación */
    Cuaternion.rota2(MatrizRotacion, q);

    /* MatrizRotacion = MatrizRotacion * Matriz */
    multiplica(MatrizRotacion, MatrizRotacion, Matriz);

};

function zoom(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        sx = sx * 0.9;
        sy = sy * 0.9;
        sz = sz * 0.9;
    } else {
        sx = sx * 1.1;
        sy = sy * 1.1;
        sz = sz * 1.1;
    }
};

function dibuja() {

    if (forma === "cuboT" || forma === "esferaT")
        gl.useProgram(programaID2);
    else if (forma === "cuboIlu" || forma === "avionIlu" || forma === "avionIlu" || forma === "alIlu" || forma === "cocheIlu" || forma === "rosaIlu")
        gl.useProgram(programaID3);
    else
        gl.useProgram(programaID);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /* Define la Matriz de Proyección */
    if (proyeccionOpt === "perspective") {
        // console.log("perspective");
        perspective(MatrizProyeccion, 60, ancho / alto, 2, 100);
    } else if (proyeccionOpt === "frustum") {
        // console.log("frustum");
        frustum(MatrizProyeccion, -1.15 * ancho / alto, 1.15 * ancho / alto, -1.15, 1.15, 2, 100);
    } else if (proyeccionOpt === "paralela") {
        // console.log("paralela");
        ortho(MatrizProyeccion, -10 * (ancho / alto), 10 * (ancho / alto), -10, 10, 2, 100);
    }

    // console.log(uMatrizProyeccion, MatrizProyeccion);

    if (forma === "cuboT" || forma === "esferaT")
        gl.uniformMatrix4fv(uMatrizProyeccion2, false, MatrizProyeccion);
    else if (forma === "cuboIlu" || forma === "avionIlu" || forma === "avionIlu" || forma === "alIlu" || forma === "cocheIlu" || forma === "rosaIlu")
        gl.uniformMatrix4fv(uMatrizProyeccion3, false, MatrizProyeccion);
    else
        gl.uniformMatrix4fv(uMatrizProyeccion, false, MatrizProyeccion);

    /* Matriz del Modelo */
    identidad(MatrizModelo);             // M = I
    traslacion(MatrizModelo, 0, -1.5, -15);
    // escalacion(MatrizModelo, 0.5, 0.5, 0.5);
    // multiplica(MatrizModelo, MatrizModelo, MatrizRotacion); // M = M * MatrizRotacion
    // gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);

    // /* Dibuja el Piso */
    // piso.dibuja(gl);


    /* Matriz del Modelo */
    // identidad(MatrizModelo);             // M = I
    escalacion(MatrizModelo, sx, sy, sz);
    multiplica(MatrizModelo, MatrizModelo, MatrizRotacion); // M = M * MatrizRotacion
    escalacion(MatrizModelo, addX, addY, addZ);
    if (forma === "cuboT" || forma === "esferaT")
        gl.uniformMatrix4fv(uMatrizModelo2, false, MatrizModelo);
    else if (forma === "cuboIlu" || forma === "avionIlu" || forma === "avionIlu" || forma === "alIlu" || forma === "cocheIlu" || forma === "rosaIlu")
        gl.uniformMatrix4fv(uMatrizModelo3, false, MatrizModelo);
    else
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);

    switch (forma) {
        case "cubo":
            dibujaCubo();
            break;
        case "planeta":
            dibujaPlaneta();
            break;
        case "esfera":
            dibujaEsfera();
            break;
        case "objeto":
            dibujaObjeto();
            break;
        case "cuboT":
            dibujaCuboT();
            break;
        case "esferaT":
            dibujaEsferaT();
            break;
        case "cuboIlu":
            dibujaCuboIlu("cubo2.obj");
            break;
        case "avionIlu":
            dibujaCuboIlu("f-16.obj");
            break;
        case "alIlu":
            dibujaCuboIlu("al.obj");
            break;
        case "cocheIlu":
            dibujaCuboIlu("porsche.obj");
            break;
        case "rosaIlu":
            dibujaCuboIlu("rose+vase.obj");
            break;
        default:
            break;
    }


    requestAnimationFrame(dibuja);
}

function dibujaCuboIlu(nomObj) {
    /* Renderiza */
    objetoIlu.dibuja(gl);
}


function dibujaEsferaT() {
    /* Se activa la unidad de textura 0 */
    gl.activeTexture(gl.TEXTURE0);

    /* Se vincula uUnidadDeTextura a la unidad de textura 0 */
    gl.uniform1i(uUnidadDeTextura, 0);

    /* Se vincula la textura con la unidad de textura 0 */
    gl.bindTexture(gl.TEXTURE_2D, codigoDeTextura2);

    /* Muestra la textura */
    textura2.muestra(gl);
}

function dibujaCuboT() {
    /* Se activa la unidad de textura 0 */
    gl.activeTexture(gl.TEXTURE0);

    /* Se vincula uUnidadDeTextura a la unidad de textura 0 */
    gl.uniform1i(uUnidadDeTextura, 0);

    /* Se vincula la textura con la unidad de textura 0 */
    gl.bindTexture(gl.TEXTURE_2D, codigoDeTextura);

    /* Muestra la textura */
    textura.muestra(gl);
}

function reinicia() {
    /* Matriz de Rotación */
    addX = 1;
    addY = 1;
    addZ = 1;
    sliderX.value = 1;
    sliderY.value = 1;
    sliderZ.value = 1;
    valorX.textContent = 1;
    valorY.textContent = 1;
    valorZ.textContent = 1;
    addXIlu = 1;
    addYIlu = 1;
    addZIlu = 1;
    sliderXIlu.value = 1;
    sliderYIlu.value = 1;
    sliderZIlu.value = 1;
    valorXIlu.textContent = 1;
    valorYIlu.textContent = 1;
    valorZIlu.textContent = 1;
    identidad(MatrizRotacion);

    dibuja();
}

function dibujaEsfera() {
    esfera.dibuja(gl, optionDraw);
}

function dibujaCubo() {
    cubo.dibuja(gl, optionDraw);
}

function dibujaObjeto() {
    traslacion(MatrizModelo, 0, 0, -3);
    objeto.dibuja(gl, optionDraw);
}

function dibujaPlaneta() {
    tierra.dibuja(gl, optionDraw);

    let matrizPadre = MatrizModelo.slice(); // guardar matriz de la esfera

    // ---------- Hijos: arboles
    for (let i = 0; i < arboles.troncos.length; i++) {
        MatrizModelo = matrizPadre.slice(); // restaurar la matriz de la esfera
        let tree = arboles.troncos[i];
        let hoja = arboles.hojas[i];
        let data = arbolesData[i];
        let height = data.height;
        let radius = data.radius;
        let degX = data.degX;
        let degY = data.degY;
        let degZ = data.degZ;

        rotacionX(MatrizModelo, degX);
        rotacionY(MatrizModelo, degY);
        rotacionZ(MatrizModelo, degZ);
        traslacion(MatrizModelo, 0, 0, height / 2);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        tree.dibuja(gl, optionDraw);
        traslacion(MatrizModelo, 0, 0, height / 2);
        escalacion(MatrizModelo, data.copaX, data.copaY, data.copaZ);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        hoja.dibuja(gl, optionDraw);
    }

    for (let i = 0; i < nubes.length; i++) {
        MatrizModelo = matrizPadre.slice(); // restaurar la matriz de la esfera
        let cloud1 = nubes[i].cloud1;
        let cloud2 = nubes[i].cloud2;
        let cloud3 = nubes[i].cloud3;
        let data = nubesData[i];
        let x = data.x;
        let y = data.y;
        let z = data.z;
        let degX = data.degX;
        let degY = data.degY;
        let degZ = data.degZ;

        rotacionX(MatrizModelo, degX);
        rotacionY(MatrizModelo, degY);
        rotacionZ(MatrizModelo, degZ);
        traslacion(MatrizModelo, 0, 0, 1.9);
        escalacion(MatrizModelo, 1.1, 1.1, 1.1);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        cloud1.dibuja(gl, optionDraw);


        traslacion(MatrizModelo, 0.1, 0, 0);
        escalacion(MatrizModelo, 0.7, 0.7, 0.7);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        cloud2.dibuja(gl, optionDraw);

        traslacion(MatrizModelo, -0.25, 0, 0);
        escalacion(MatrizModelo, 0.9, 0.9, 0.9);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        cloud3.dibuja(gl, optionDraw);
    }

    for (let i = 0; i < flores.tallos.length; i++) {
        MatrizModelo = matrizPadre.slice(); // restaurar la matriz de la esfera
        let flower = flores.flowers[i];
        let tallo = flores.tallos[i];
        let data = floresData[i];
        let degX = data.degX;
        let degY = data.degY;
        let degZ = data.degZ;

        rotacionX(MatrizModelo, degX);
        rotacionY(MatrizModelo, degY);
        rotacionZ(MatrizModelo, degZ);
        traslacion(MatrizModelo, 0, 0, 1);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        tallo.dibuja(gl, optionDraw);

        traslacion(MatrizModelo, 0, 0, 0.05);
        escalacion(MatrizModelo, 1, 1, 2);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);
        flower.dibuja(gl, optionDraw);
    }
}

function main() {
    canvas = document.getElementById("webglcanvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.textContent("WebGL 2.0 no está disponible en tu navegador");
        return;
    }

    /* Para detectar los eventos del ratón */
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mouseout", mouseUp, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("wheel", zoom, { passive: false });

    /* Para los botones */
    const $menuLinks = document.querySelector('.menu-links');
    $menuLinks.addEventListener('click', function (e) {
        const li = e.target.closest('li');

        if (!li || !li.id) return; // si no se hizo clic en un <li> con id, salir

        e.preventDefault(); // evitar navegación

        if (li.id === 'wireframe') {
            optionDraw = false;
            cubo.setToLines(gl);
            dibuja();
        } else if (li.id === 'solid') {
            optionDraw = true;
            cubo.setToSolid(gl);
            dibuja();
        } else if (li.id === 'fondo') {
            if (bgSwitch) {
                background = [0, 0, 0];
                gl.clearColor(...background, 1.0);
                bgSwitch = false;
            } else {
                background = [0.6, 0.85, 0.95];
                gl.clearColor(...background, 1.0);
                bgSwitch = true;
            }
            console.log(background);
            dibuja();
        } else if (li.id === 'perspective') {
            proyeccionOpt = "perspective";
            dibuja();
        } else if (li.id === 'frustum') {
            proyeccionOpt = "frustum";
            dibuja();
        } else if (li.id === 'paralela') {
            proyeccionOpt = "paralela";
            dibuja();
        }
    }, true);

    document.getElementById("reset").onclick = reinicia;

    const selectForma = document.getElementById('forma');

    // Para el selector de formas
    selectForma.addEventListener('change', (e) => {
        const formaSeleccionada = e.target.value;

        console.log('Forma seleccionada:', formaSeleccionada);

        forma = formaSeleccionada;

        let ruta = "../Modelos/";
        switch (forma) {
            case "cuboIlu":
                objetoIlu = new ObjetoIlu(gl, ruta, "cubo2.obj");
                break;
            case "avionIlu":
                objetoIlu = new ObjetoIlu(gl, ruta, "f-16.obj");
                break;
            case "alIlu":
                objetoIlu = new ObjetoIlu(gl, ruta, "al.obj");
                break;
            case "cocheIlu":
                objetoIlu = new ObjetoIlu(gl, ruta, "porsche.obj");
                break;
            case "rosaIlu":
                objetoIlu = new ObjetoIlu(gl, ruta, "rose+vase.obj");
                break;
            default:
                break;
        }

        dibuja();
    });

    // para el slider
    sliderX = document.getElementById('rangoX');
    valorX = document.getElementById('x');

    sliderX.addEventListener('input', () => {
        valorX.textContent = sliderX.value;
        addX = parseFloat(sliderX.value);
    });

    sliderY = document.getElementById('rangoY');
    valorY = document.getElementById('y');

    sliderY.addEventListener('input', () => {
        valorY.textContent = sliderY.value;
        addY = parseFloat(sliderY.value);
    });

    sliderZ = document.getElementById('rangoZ');
    valorZ = document.getElementById('z');

    sliderZ.addEventListener('input', () => {
        valorZ.textContent = sliderZ.value;
        addZ = parseFloat(sliderZ.value);
    });

    sliderXIlu = document.getElementById('rangoXIlu');
    valorXIlu = document.getElementById('xilu');

    sliderXIlu.addEventListener('input', () => {
        valorXIlu.textContent = sliderXIlu.value;
        luzX = parseFloat(sliderXIlu.value);
        posicionLuz = [luzX, luzY, luzZ];
        pLuz = new Array(3);
        multiplicaMV(pLuz, MatrizVista, posicionLuz);
        gl.uniform3fv(uPosicionLuz, pLuz);
        console.log(posicionLuz);
    });
    
    sliderYIlu = document.getElementById('rangoYIlu');
    valorYIlu = document.getElementById('yilu');

    sliderYIlu.addEventListener('input', () => {
        valorYIlu.textContent = sliderYIlu.value;
        luzY = parseFloat(sliderYIlu.value);
        posicionLuz = [luzX, luzY, luzZ];
        pLuz = new Array(3);
        multiplicaMV(pLuz, MatrizVista, posicionLuz);
        gl.uniform3fv(uPosicionLuz, pLuz);
        console.log(posicionLuz);
    });
    
    sliderZIlu = document.getElementById('rangoZIlu');
    valorZIlu = document.getElementById('zilu');

    sliderZIlu.addEventListener('input', () => {
        valorZIlu.textContent = sliderZIlu.value;
        luzZ = parseFloat(sliderZIlu.value);
        posicionLuz = [luzX, luzY, luzZ];
        pLuz = new Array(3);
        multiplicaMV(pLuz, MatrizVista, posicionLuz);
        gl.uniform3fv(uPosicionLuz, pLuz);
        console.log(posicionLuz);
    });

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    compilaEnlazaLosShaders();
    compilaEnlazaLosShaders2();
    compilaEnlazaLosShaders3();

    cubo = new CuboColor(gl);
    piso = new Piso(gl, 0, 0, 0);
    esfera = new Esfera(gl, 1, 48, 48);
    tierra = new Esfera(gl, 1, 48, 48);
    cilindro = new Cilindro(gl, 0.05, 1.5, 24, true, true);
    /* Objetos */
    objeto = new Objeto(gl, "Modelos/al.obj");
    // cilindro2 = new Cilindro(gl, 0.02, 1.1, 24, true, true);

    arbolesData = getArbolesData(40);
    arboles = createTrees(arbolesData);

    nubesData = getArbolesData(10);
    nubes = createClouds(nubesData);

    floresData = getArbolesData(50);
    flores = createFlowers(floresData);

    ancho = gl.canvas.width;
    alto = gl.canvas.height;

    arcBall = new ArcBall(ancho, alto);


    gl.useProgram(programaID);
    uMatrizProyeccion = gl.getUniformLocation(programaID, "uMatrizProyeccion");
    uMatrizVista = gl.getUniformLocation(programaID, "uMatrizVista");
    uMatrizModelo = gl.getUniformLocation(programaID, "uMatrizModelo");
    ortho(MatrizProyeccion, -5, 5, -5, 5, -5, 5);
    gl.uniformMatrix4fv(uMatrizProyeccion, false, MatrizProyeccion);


    //TEXTURA
    gl.useProgram(programaID2);
    /* Paso 3: Se define la geometría y se almacenan en los buffers de memoria.*/
    textura = new Cubo(gl);
    /* Genera un nombre (código) para la textura */
    codigoDeTextura = gl.createTexture();
    /* Lee la textura */
    leeLaTextura(gl, "imagenTextura1", codigoDeTextura)

    /* Paso 3: Se define la geometría y se almacenan en los buffers de memoria.*/
    textura2 = new EsferaTexturizada(gl, 1, 48, 48);

    /* Genera un nombre (código) para la textura */
    codigoDeTextura2 = gl.createTexture();

    /* Lee la textura */
    leeLaTextura(gl, "imagenTextura2", codigoDeTextura2)


    uMatrizProyeccion2 = gl.getUniformLocation(programaID2, "uMatrizProyeccion");
    uMatrizVista2 = gl.getUniformLocation(programaID2, "uMatrizVista");
    uMatrizModelo2 = gl.getUniformLocation(programaID2, "uMatrizModelo");
    uUnidadDeTextura = gl.getUniformLocation(programaID2, "uUnidadDeTextura");
    gl.uniformMatrix4fv(uMatrizProyeccion2, false, MatrizProyeccion);


    // ILUMINACION-------------
    gl.useProgram(programaID3);
    uMatrizProyeccion3 = gl.getUniformLocation(programaID3, "uMatrizProyeccion");
    uMatrizVista3 = gl.getUniformLocation(programaID3, "uMatrizVista");
    uMatrizModelo3 = gl.getUniformLocation(programaID3, "uMatrizModelo");
    uPosicionVista = gl.getUniformLocation(programaID3, "uPosicionVista");
    uPosicionLuz = gl.getUniformLocation(programaID3, "uPosicionLuz");
    u_Ia = gl.getUniformLocation(programaID3, "u_Ia");
    u_Id = gl.getUniformLocation(programaID3, "u_Id");
    u_Is = gl.getUniformLocation(programaID3, "u_Is");
    u_ka = gl.getUniformLocation(programaID3, "u_ka");
    u_kd = gl.getUniformLocation(programaID3, "u_kd");
    u_ks = gl.getUniformLocation(programaID3, "u_ks");
    u_brillo = gl.getUniformLocation(programaID3, "u_brillo");

    /* Matriz de Proyección */
    perspective(MatrizProyeccion, 60, gl.canvas.width / gl.canvas.height, 1, 100);
    gl.uniformMatrix4fv(uMatrizProyeccion3, false, MatrizProyeccion);
    /* Matriz de la Cámara o de la Vista */
    lookAt(MatrizVista, posicionVista[0], posicionVista[1], posicionVista[2], 0, 0, -1, 0, 1, 0);
    gl.uniformMatrix4fv(uMatrizVista3, false, MatrizVista);

    /* Posición de la vista */
    gl.uniform3fv(uPosicionVista, posicionVista);

    /* Posición de la luz */
    pLuz = new Array(3);
    multiplicaMV(pLuz, MatrizVista, posicionLuz);
    gl.uniform3fv(uPosicionLuz, pLuz);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    /* Se envia la Iluminación al shader de fragmento */
    gl.uniform3f(u_Ia, 0.2, 0.2, 0.2);
    gl.uniform3f(u_Id, 1.0, 1.0, 1.0);
    gl.uniform3f(u_Is, 1.0, 1.0, 1.0);

    //END ILUMINACION----------




    gl.useProgram(programaID);
    // ortho(MatrizProyeccion, -10.15, 10.15, -5, 5, -5, 5);
    // gl.uniformMatrix4fv(uMatrizProyeccion, false, MatrizProyeccion);
    lookAt(MatrizVista, 0, 0, 0, 0, 0, -1, 0, 1, 0);
    identidad(MatrizVista);
    gl.uniformMatrix4fv(uMatrizVista, false, MatrizVista);

    gl.useProgram(programaID2);
    gl.uniformMatrix4fv(uMatrizVista2, false, MatrizVista);
    gl.useProgram(programaID);
    identidad(MatrizRotacion);

    /* Ajusta el ancho a [-1..1] y el alto a [-1..1] */
    arcBall.ajusta(gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(...background, 1.0);
    dibuja();

}

function createTrees(data) {
    let troncos = [];
    let hojas = [];
    for (let i = 0; i < data.length; i++) {
        let tronco = new Cilindro(gl, data[i].radius, data[i].height, 24, true, true);
        let hoja = new Esfera2(gl, 0.1, 24, 24);
        hojas.push(hoja);
        troncos.push(tronco);
    }

    return { troncos, hojas };
}

function createClouds(data) {
    let clouds = [];
    for (let i = 0; i < data.length; i++) {
        let cloud1 = new Esfera3(gl, 0.1, 24, 24);
        let cloud2 = new Esfera3(gl, 0.1, 24, 24);
        let cloud3 = new Esfera3(gl, 0.1, 24, 24);
        clouds.push({ cloud1, cloud2, cloud3 });
    }
    return clouds;
}

function createFlowers(data) {
    let flowers = [];
    let tallos = [];
    for (let i = 0; i < data.length; i++) {
        let tallo = new Cilindro2(gl, 0.005, 0.1, 24, true, true);
        let flower = new Esfera4(gl, 0.01, 24, 24);
        flowers.push(flower);
        tallos.push(tallo);
    }
    return { tallos, flowers };
}



window.onload = main;

/* Camara - gluLookAt */
function lookAt(r, vistaX, vistaY, vistaZ, centroX,
    centroY, centroZ, arribaX, arribaY, arribaZ) {

    var vista = new Vector3(vistaX, vistaY, vistaZ);
    var centro = new Vector3(centroX, centroY, centroZ);
    var arriba = new Vector3(arribaX, arribaY, arribaZ);

    /* n = vista - centro */
    var n = vista.menos(centro);

    /* u = u / || u || */
    n.normaliza();

    /* v = arriba */
    var v = arriba;

    /* v = v / || v || */
    //v.normaliza(); // No es necesario!

    /* u = v x n */
    var u = v.producto_vectorial(n);

    /* u = u / || u || */
    u.normaliza();

    /* Recalcula v: v = n x u */
    v = n.producto_vectorial(u);

    r[0] = u.x; r[4] = u.y; r[8] = u.z; r[12] = -(vistaX * u.x + vistaY * u.y + vistaZ * u.z);
    r[1] = v.x; r[5] = v.y; r[9] = v.z; r[13] = -(vistaX * v.x + vistaY * v.y + vistaZ * v.z);
    r[2] = n.x; r[6] = n.y; r[10] = n.z; r[14] = -(vistaX * n.x + vistaY * n.y + vistaZ * n.z);
    r[3] = 0; r[7] = 0; r[11] = 0; r[15] = 1;
}

class Grupo {
    constructor() {
        this.nombre = "si_falta";       /* Nombre del grupo */
        this.triangulos = new Array();  /* Arreglo de índice de triangulos */
        this.material = 0;              /* Indice del color del material del grupo */
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getNombre() {
        return this.nombre;
    }
    adiTriangulo(t) {
        this.triangulos.push(t);
    }
    getTriangulo(indice) {
        return this.triangulos[indice];
    }
    getNumTriangulos() {
        return this.triangulos.length;
    }
    setMaterial(material) {
        this.material = material;
    }
    getMaterial() {
        return this.material;
    }
    toString() {
        return this.nombre +
            "<br> triangulos: " + this.triangulos +
            "<br> material  : " + this.material;
    }
}

class MaterialIlu {
    constructor() {
        this.ambiente = new Array(3);  /* Arreglo del color ambiente */
        this.difuso = new Array(3);    /* Arreglo del color difuso */
        this.especular = new Array(3); /* Arreglo del color especular */
        this.nombre = "si_falta";             /* Nombre del material */
        this.brillo = 0;                      /* Exponente del brillo */
        this.ambiente[0] = 0.2;
        this.ambiente[1] = 0.2;
        this.ambiente[2] = 0.2;
        this.difuso[0] = 0.8;
        this.difuso[1] = 0.8;
        this.difuso[2] = 0.8;
        this.especular[0] = 0.0;
        this.especular[1] = 0.0;
        this.especular[2] = 0.0;
    }

    inicializa(nombre, ambiente, difuso, especular, brillo) {
        this.nombre = nombre;
        this.ambiente = ambiente;
        this.difuso = difuso;
        this.especular = especular;
        this.brillo = brillo;
    }

    setNombre(nombre) {
        this.nombre = nombre;
    }

    setAmbiente(ambiente) {
        this.ambiente = ambiente;
    }

    setDifuso(difuso) {
        this.difuso = difuso;
    }

    setEspecular(especular) {
        this.especular = especular;
    }

    setBrillo(brillo) {
        this.brillo = brillo;
    }

    getNombre() {
        return this.nombre;
    }

    getAmbiente() {
        return this.ambiente;
    }

    getDifuso() {
        return this.difuso;
    }

    getEspecular() {
        return this.especular;
    }

    getBrillo() {
        return this.brillo;
    }

    toString() {
        return this.nombre +
            "<br> Ka: " + this.ambiente +
            "<br> Kd: " + this.difuso +
            "<br> Ks: " + this.especular +
            "<br> Ns: " + this.brillo;
    }
}

class Material {
    constructor() {
        this.nombre = "si_falta";    /* Nombre del material */
        this.ambiente = [0.2, 0.2, 0.2]; /* Arreglo del color ambiente */
        this.difuso = [0.8, 0.8, 0.8]; /* Arreglo del color difuso */
        this.especular = [0.0, 0.0, 0.0]; /* Arreglo del color especular */
        this.brillo = 0;             /* Exponente del brillo */
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getNombre() {
        return this.nombre;
    }
    setAmbiente(ambiente) {
        this.ambiente = ambiente;
    }
    getAmbiente() {
        return this.ambiente;
    }
    setDifuso(difuso) {
        this.difuso = difuso;
    }
    getDifuso() {
        return this.difuso;
    }
    setEspecular(especular) {
        this.especular = especular;
    }
    getEspecular() {
        return this.especular;
    }
    setBrillo(brillo) {
        this.brillo = brillo;
    }
    getBrillo() {
        return this.brillo;
    }
    toString() {
        return this.nombre +
            "<br> Ka: " + this.ambiente +
            "<br> Kd: " + this.difuso +
            "<br> Ks: " + this.especular +
            "<br> Ns: " + this.brillo;
    }
}

/***************************************************************************/
/* La Clase ProcesaCadena                                                  */
/***************************************************************************/

class ProcesaCadena {

    inicia(cadena) {
        this.cadena = cadena;
        this.indice = 0;
    }

    esDelimitador(c) {
        return (
            c == ' ' ||
            c == '\t' ||
            c == '(' ||
            c == ')' ||
            c == '"' ||
            c == "'"
        );
    }

    saltaDelimitadores() {
        while (this.indice < this.cadena.length &&
            this.esDelimitador(this.cadena.charAt(this.indice))) {
            this.indice++;
        }
    };

    obtLongPalabra(inicio) {
        var i = inicio;
        while (i < this.cadena.length &&
            !this.esDelimitador(this.cadena.charAt(i))) {
            i++;
        }
        return i - inicio;
    };

    getToken() {
        var n, subcadena;
        this.saltaDelimitadores();
        n = this.obtLongPalabra(this.indice);
        if (n === 0) {
            return null;
        }
        subcadena = this.cadena.substr(this.indice, n);
        this.indice = this.indice + (n + 1);
        return subcadena.trim();
    }

    getInt() {
        var token = this.getToken();
        if (token) {
            return parseInt(token, 10);
        }
        return null;
    }

    getFloat() {
        var token = this.getToken();
        if (token) {
            return parseFloat(token);
        }
        return null;
    }
}

class Cadena {
    constructor(cadena) {
        this.cadena = cadena;
        this.indice = 0;
    }
    esDelimitador(c) {
        return (
            c == ' ' ||
            c == '\t' ||
            c == '(' ||
            c == ')' ||
            c == '"' ||
            c == "'"
        );
    }
    saltaDelimitadores() {
        let n = this.cadena.length;
        while (this.indice < n &&
            this.esDelimitador(this.cadena.charAt(this.indice))) {
            this.indice++;
        }
    };
    obtLongPalabra(inicio) {
        var i = inicio;
        while (i < this.cadena.length &&
            !this.esDelimitador(this.cadena.charAt(i))) {
            i++;
        }
        return i - inicio;
    };
    getToken() {
        var n, subcadena;
        this.saltaDelimitadores();
        n = this.obtLongPalabra(this.indice);
        if (n === 0) {
            return null;
        }
        subcadena = this.cadena.substr(this.indice, n);
        this.indice = this.indice + (n + 1);
        return subcadena.trim();
    }
    getInt() {
        var token = this.getToken();
        if (token) {
            return parseInt(token, 10);
        }
        return null;
    }
    getFloat() {
        var token = this.getToken();
        if (token) {
            return parseFloat(token);
        }
        return null;
    }
}

class ObjetoIlu {
    constructor(gl, ruta, nombreArchivo) {
        var x, y, z, token, lineas, numVertices, numNormales, numTriangulos;
        var minX, maxX, minY, maxY, minZ, maxZ, indiceDeGrupo;

        /* Arreglo de los colores de los Materiales */
        this.materiales = [];

        /* Arreglo de Grupos */
        this.grupos = [];

        /* Indices */
        this.indices = [];

        /* Las coordenadas cartesianas (x, y, z) */
        var vertices = [];

        /* Las normales x c/cara (x,y,z) */
        var normales = [];
        var normales_prev = [];

        /* Número de Vértices */
        numVertices = 0;

        /* Número de Normales */
        numNormales = 0;

        /* Número de Triangulos */
        numTriangulos = 0;

        // Agrega un grupo
        this.grupos.push(new Grupo());
        indiceDeGrupo = 0;

        /* Lee el archivo .obj */
        var datos_obj = this.lee_archivo_obj(ruta + nombreArchivo);

        /* Divide por lineas */
        lineas = datos_obj.split("\n");

        // Crea ProcesaCadena
        var pc = new ProcesaCadena();

        minX = Number.MAX_VALUE; maxX = Number.MIN_VALUE;
        minY = Number.MAX_VALUE; maxY = Number.MIN_VALUE;
        minZ = Number.MAX_VALUE; maxZ = Number.MIN_VALUE;

        for (var i = 0; i < lineas.length; i++) {
            pc.inicia(lineas[i]);
            token = pc.getToken();
            if (token != null) {
                switch (token) {
                    case 'mtllib': /* nombre del arch. de materiales */
                        var nombre_archivo_material = pc.getToken();

                        /* Lee los datos del archivo .mtl */
                        this.lee_datos_archivo_mtl(ruta + nombre_archivo_material);

                        break;
                    case 'v': /* vértice */
                        x = pc.getFloat();
                        y = pc.getFloat();
                        z = pc.getFloat();
                        vertices.push(x);
                        vertices.push(y);
                        vertices.push(z);
                        numVertices++;

                        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
                        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
                        minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);

                        /* Inicializa la normal de cada vértice */
                        normales_prev.push(new Vector3(0, 0, 0));
                        numNormales++;

                        break;
                    case 'f': /* cara */
                        this.indices.push(pc.getInt() - 1);
                        this.indices.push(pc.getInt() - 1);
                        this.indices.push(pc.getInt() - 1);
                        this.grupos[indiceDeGrupo].adiTriangulo(numTriangulos);
                        numTriangulos++;
                        var tokenEntero = pc.getInt();
                        while (tokenEntero != null) {
                            var k = this.indices.length;
                            this.indices.push(this.indices[k - 3]);    // v0
                            this.indices.push(this.indices[k - 1]);    // v2
                            this.indices.push(tokenEntero - 1); // v3
                            this.grupos[indiceDeGrupo].adiTriangulo(numTriangulos);
                            numTriangulos++;
                            tokenEntero = pc.getInt();
                        }
                        break;
                    case 'g':
                    case 'group': /* nombre de grupo */
                        var nombre = pc.getToken();
                        if (nombre != null) {
                            indiceDeGrupo = this.buscaGrupo(nombre);
                            if (indiceDeGrupo == -1) {
                                var g = new Grupo();
                                g.setNombre(nombre);
                                this.grupos.push(g);
                                indiceDeGrupo = this.grupos.length - 1;
                            }
                        }
                        break;
                    case 'usemtl': /* nombre de material */
                        var nombre = pc.getToken();
                        var indiceDeMaterial = this.buscaMaterial(nombre);
                        this.grupos[indiceDeGrupo].setMaterial(indiceDeMaterial);
                        break;
                }
            }
        }

        /* Redimensiona las coordenadas entre [-1,1] */
        var tam_max = 0, escala;
        tam_max = Math.max(tam_max, maxX - minX);
        tam_max = Math.max(tam_max, maxY - minY);
        tam_max = Math.max(tam_max, maxZ - minZ);
        escala = 2.0 / tam_max;

        /* Actualiza los vértices */
        for (var i = 0; i < numVertices * 3; i += 3) {
            vertices[i] = escala * (vertices[i] - minX) - 1.0;
            vertices[i + 1] = escala * (vertices[i + 1] - minY) - 1.0;
            vertices[i + 2] = escala * (vertices[i + 2] - minZ) - 1.0;
        }

        /* Lee las caras y obtiene las normales de los vértices */
        var v1 = new Vector3(0, 0, 0); // v1
        var v2 = new Vector3(0, 0, 0); // v2
        var v3 = new Vector3(0, 0, 0); // v3
        var normalCara = new Vector3(0, 0, 0);  // normal
        var a, b, c, a1, b1, c1;

        for (var i = 0; i < numTriangulos * 3; i += 3) {
            a = this.indices[i];
            b = this.indices[i + 1];
            c = this.indices[i + 2];

            a1 = a * 3; // Obtiene la posición del primer vértice
            v1.x = vertices[a1 + 0]; // v1
            v1.y = vertices[a1 + 1];
            v1.z = vertices[a1 + 2];

            b1 = b * 3; // Obtiene la posición del segundo vértice
            v2.x = vertices[b1 + 0]; // v2
            v2.y = vertices[b1 + 1];
            v2.z = vertices[b1 + 2];

            c1 = c * 3; // Obtiene la posición del tercer vértice
            v3.x = vertices[c1 + 0]; // v3
            v3.y = vertices[c1 + 1];
            v3.z = vertices[c1 + 2];

            /* Obtiene la normal de la cara */
            normalCara = normalCara.normal(v1, v2, v3);

            /* Suma la normal de la cara, a la normal de cada vértice */
            normales_prev[a] = normalCara.mas(normales_prev[a]); // normal del vértice a
            normales_prev[b] = normalCara.mas(normales_prev[b]); // normal del vértice b
            normales_prev[c] = normalCara.mas(normales_prev[c]); // normal del vértice c
        }

        /* Lee las normales de los vértices */
        for (var i = 0; i < numNormales; i++) {

            /* Normaliza la normal de cada vértice */
            normales_prev[i].normaliza();

            normales.push(normales_prev[i].x);
            normales.push(normales_prev[i].y);
            normales.push(normales_prev[i].z);

        }

        var verticeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, verticeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

        var normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normales), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        /* Se genera un nombre (código) para el buffer */
        this.indiceBuffer = gl.createBuffer();

    }

    dibuja(gl) {

        var ambiente, difuso, especular, brillo, indice, numTriangulos, i;

        i = 0;

        while (i < this.grupos.length) {

            /* Obtiene el número de triángulos del grupo */
            numTriangulos = this.grupos[i].getNumTriangulos();

            if (numTriangulos == 0) {
                i++;
                continue;
            }

            /* Obtiene el indice del material */
            indice = this.grupos[i].getMaterial();

            ambiente = this.materiales[indice].getAmbiente();
            difuso = this.materiales[indice].getDifuso();
            especular = this.materiales[indice].getEspecular();
            brillo = this.materiales[indice].getBrillo();

            /* Se envia el Material al shader de fragmento */
            gl.uniform3f(u_ka, ambiente[0], ambiente[1], ambiente[2]);
            gl.uniform3f(u_kd, difuso[0], difuso[1], difuso[2]);
            gl.uniform3f(u_ks, especular[0], especular[1], especular[2]);
            gl.uniform1f(u_brillo, brillo);

            /* Se habilita el arreglo de los vértices (indice = 0) */
            gl.enableVertexAttribArray(0);

            /* Se habilita el arreglo de las normales (indice = 1) */
            gl.enableVertexAttribArray(1);

            var _indices = [];

            /* Lee los indices */
            for (var j = 0; j < numTriangulos; j++) {
                let _indice = this.grupos[i].getTriangulo(j);
                _indices.push(this.indices[_indice * 3 + 0]);
                _indices.push(this.indices[_indice * 3 + 1]);
                _indices.push(this.indices[_indice * 3 + 2]);
            }

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indiceBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(_indices), gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES, numTriangulos * 3, gl.UNSIGNED_SHORT, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            i++;

        }

    }

    /* Lee el archivo OBJ */
    lee_archivo_obj(nombreArchivo) {
        var byteArray = [];
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status !== 404) {
                byteArray = request.responseText
            }
        }
        request.open('GET', nombreArchivo, false); // Crea una solicitud para abrir el archivo
        request.send(null);                        // Enviando la solicitud
        return byteArray;
    }

    /* Lee el archivo MTL */
    lee_archivo_mtl(nombreArchivo) {
        var byteArray = [];
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status !== 404) {
                byteArray = request.responseText
            }
        }
        request.open('GET', nombreArchivo, false); // Crea una solicitud para abrir el archivo
        request.send(null);                        // Enviando la solicitud
        return byteArray;
    }

    /* Lee los datos de un archivo .MTL (archivo de los colores de los materiales) */
    lee_datos_archivo_mtl(nombreArchivo) {

        /* Lee el archivo .mtl */
        var datos_mtl = this.lee_archivo_mtl(nombreArchivo);
        // console.log("Datos del archivo MTL: " + datos_mtl);
        /* Divide por lineas */
        var lineas = datos_mtl.split('\n');

        lineas.push(null);  // Adiciona null

        var indice = 0;

        var linea;

        // Crea ProcesaCadena
        var pc = new ProcesaCadena();

        while ((linea = lineas[indice++]) != null) {
            pc.inicia(linea);
            var token = pc.getToken();
            if (token == null) continue;

            switch (token) {
                case '#':
                    continue;
                case 'newmtl':  /* nombre del material */
                    var nombre = pc.getToken();
                    this.materiales.push(new Material());
                    this.materiales[this.materiales.length - 1].setNombre(nombre);
                    break;
                case 'Ka':      /* ambiente */
                    var ambiente = new Array(3);
                    ambiente[0] = pc.getFloat();
                    ambiente[1] = pc.getFloat();
                    ambiente[2] = pc.getFloat();
                    this.materiales[this.materiales.length - 1].setAmbiente(ambiente);
                    break;
                case 'Kd':      /* difuso */
                    var difuso = new Array(3);
                    difuso[0] = pc.getFloat();
                    difuso[1] = pc.getFloat();
                    difuso[2] = pc.getFloat();
                    this.materiales[this.materiales.length - 1].setDifuso(difuso);
                    break;
                case 'Ks':      /* especular */
                    var especular = new Array(3);
                    especular[0] = pc.getFloat();
                    especular[1] = pc.getFloat();
                    especular[2] = pc.getFloat();
                    this.materiales[this.materiales.length - 1].setEspecular(especular);
                    break;
                case 'Ns':      /* brillo */
                    var brillo = pc.getFloat();
                    this.materiales[this.materiales.length - 1].setBrillo(brillo);
                    break;
            }
        }
    }

    /* Busca el grupo */
    buscaGrupo(nombre) {
        for (var i = 0; i < this.grupos.length; i++)
            if (nombre == this.grupos[i].getNombre())
                return i;
        return -1;
    }

    /* Busca el Material */
    buscaMaterial(nombre) {
        for (var i = 0; i < this.materiales.length; i++)
            if (nombre == this.materiales[i].getNombre())
                return i;
        return -1;
    }
}


class Objeto {
    constructor(gl, nombreArchivo) {
        var lineas, token, x, y, z, a, b;
        var minX, maxX, minY, maxY, minZ, maxZ;
        var numVertices, numTriangulos, indiceDeGrupo;
        var hayGrupos;
        this.vertices = [];
        this.indices = [];

        /* Número de Vértices */
        numVertices = 0;

        /* Número de Triángulos */
        numTriangulos = 0;

        /* Arreglo de Grupos */
        this.grupos = [];

        hayGrupos = false;

        /* Arreglo de los colores de los Materiales */
        this.materiales = [];

        /* Lee el archivo .obj */
        let datos_obj = this.leeArchivo(nombreArchivo);

        /* Divide por lineas */
        lineas = datos_obj.split("\n");

        minX = Number.MAX_VALUE; maxX = Number.MIN_VALUE;
        minY = Number.MAX_VALUE; maxY = Number.MIN_VALUE;
        minZ = Number.MAX_VALUE; maxZ = Number.MIN_VALUE;

        for (let i = 0; i < lineas.length; i++) {
            let cad = new Cadena(lineas[i]); // Inicia el procesamiento de cadenas
            token = cad.getToken();
            if (token != null) {
                switch (token) {
                    case '#':
                        continue;
                    case 'mtllib': /* nombre del arch. de materiales */
                        let nombreArchivoMTL = cad.getToken();
                        this.lee_datos_archivo_mtl(nombreArchivoMTL);
                        break;
                    case 'v': /* vértice */
                        x = cad.getFloat();
                        y = cad.getFloat();
                        z = cad.getFloat();
                        this.vertices.push(x);
                        this.vertices.push(y);
                        this.vertices.push(z);
                        numVertices++;
                        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
                        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
                        minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
                        break;
                    case 'g':
                    case 'group': /* nombre de grupo */
                        let nombreGrupo = cad.getToken();
                        indiceDeGrupo = this.buscaGrupo(nombreGrupo);
                        if (indiceDeGrupo == -1) {
                            /* Agrega a la lista de grupo un nuevo grupo*/
                            let grupo = new Grupo();
                            grupo.setNombre(nombreGrupo);
                            this.grupos.push(grupo);         /* Guarda en el arreglo de grupos */
                            indiceDeGrupo = this.grupos.length - 1;
                        }
                        hayGrupos = true;
                        break;
                    case 'usemtl': /* nombre del material */
                        let nombreMaterial = cad.getToken();
                        let indiceDeMaterial = this.buscaMaterial(nombreMaterial);
                        if (!hayGrupos) { // Si no hay un grupo
                            indiceDeGrupo = this.buscaMaterialPorGrupo(indiceDeMaterial);
                            if (indiceDeGrupo == -1) {
                                /* Agrega a la lista de grupo un nuevo grupo*/
                                let grupo = new Grupo();
                                grupo.setNombre(nombreMaterial);
                                this.grupos.push(grupo);         /* Guarda en el arreglo de grupos */
                                indiceDeGrupo = this.grupos.length - 1;
                            }
                        }
                        /* Asigna al grupo el indice del material */
                        this.grupos[indiceDeGrupo].setMaterial(indiceDeMaterial);
                        break;
                    case 'f': /* cara */
                        a = cad.getInt() - 1;
                        this.indices.push(a); // v0
                        b = cad.getInt() - 1;
                        this.indices.push(b); // v1
                        b = cad.getInt() - 1;
                        this.indices.push(b); // v2

                        /* Asigna al grupo el indice del material */
                        this.grupos[indiceDeGrupo].adiTriangulo(numTriangulos);

                        numTriangulos++;

                        var tokenEntero = cad.getInt();
                        while (tokenEntero != null) {

                            this.indices.push(a);    // v0
                            this.indices.push(b);    // v2
                            b = tokenEntero - 1;
                            this.indices.push(b);    // v3

                            /* Asigna al grupo el indice del material */
                            this.grupos[indiceDeGrupo].adiTriangulo(numTriangulos);

                            numTriangulos++;

                            tokenEntero = cad.getInt();
                        }

                        break;
                }
            }
        }

        /* Redimensiona las coordenadas entre [-1,1] */
        var tam_max = 0, escala;
        tam_max = Math.max(tam_max, maxX - minX);
        tam_max = Math.max(tam_max, maxY - minY);
        tam_max = Math.max(tam_max, maxZ - minZ);
        escala = 2.0 / tam_max;

        /* Actualiza los vértices */
        for (let i = 0; i < numVertices * 3; i += 3) {
            this.vertices[i] = escala * (this.vertices[i] - minX) - 1.0;
            this.vertices[i + 1] = escala * (this.vertices[i + 1] - minY) - 1.0;
            this.vertices[i + 2] = escala * (this.vertices[i + 2] - minZ) - 1.0;
        }
        // console.log("Cant. vértices: ", this.vertices.length / 3);
        // console.log(this.vertices.length);
        for (let i = 0; i < this.vertices.length; i += 3) {
            // console.log(i + " : " + this.vertices[i] + "  " + this.vertices[i + 1] + "  " + this.vertices[i + 2])
        }

        // console.log(this.indices.length);
        for (let i = 0; i < this.indices.length; i += 6) {
            // console.log(i + " : " + this.indices[i] + "  " + this.indices[i + 1] + "  " + this.indices[i + 2] + "  " + this.indices[i + 3] + "  " + this.indices[i + 4] + "  " + this.indices[i + 5])
        }

        // console.log("grupos: " + this.grupos.length);
        for (let i = 0; i < this.grupos.length; i++) {
            // console.log(i + " : " + this.grupos[i].toString() + " " + this.materiales[this.grupos[i].getMaterial()].getNombre());
        }

        // console.log("materiales: " + this.materiales.length);
        for (let i = 0; i < this.materiales.length; i++) {
            // console.log(i + " : " + this.materiales[i].toString());
        }

        // console.log("num triangulos: " + numTriangulos);
    }

    dibuja(gl, option) {
        var numTriangulos, indiceDeMaterial, color, k;
        for (let i = 0; i < this.grupos.length; i++) {

            /* Obtiene el número de triángulos del grupo */
            numTriangulos = this.grupos[i].getNumTriangulos();

            if (numTriangulos == 0)
                continue;

            /* Obtiene los indices */
            let indAux = new Uint16Array(numTriangulos * 3);

            for (let j = 0; j < numTriangulos; j++) {
                k = j * 3;

                /* Lee del grupo i el número de triángulo j */
                let numTrian = this.grupos[i].getTriangulo(j);

                indAux[k] = this.indices[numTrian * 3 + 0];
                indAux[k + 1] = this.indices[numTrian * 3 + 1];
                indAux[k + 2] = this.indices[numTrian * 3 + 2];
            }

            /* Se crea el objeto del arreglo de vértices (VAO) */
            //this.objetoVAO = gl.createVertexArray();

            /* Se activa el objeto */
            //gl.bindVertexArray(this.objetoVAO);

            var codigoVertices = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, codigoVertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

            this.codigoDeIndices = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.codigoDeIndices);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indAux), gl.STATIC_DRAW);

            indiceDeMaterial = this.grupos[i].getMaterial();

            /* Lee el color */
            //color = this.materiales[indiceDeMaterial].getAmbiente();
            color = this.materiales[indiceDeMaterial].getDifuso();

            // gl.uniform4f(uColor, color[0], color[1], color[2], 1);
            if (option)
                gl.drawElements(gl.TRIANGLES, numTriangulos * 3, gl.UNSIGNED_SHORT, 0);
            else
                gl.drawElements(gl.LINES, numTriangulos * 3, gl.UNSIGNED_SHORT, 0);

            gl.bindVertexArray(null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
    }

    /* Lee el archivo OBJ */
    leeArchivo(nombreArchivo) {
        var byteArray = [];
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status !== 404) {
                byteArray = request.responseText
            }
        }
        request.open('GET', nombreArchivo, false); // Crea una solicitud para abrir el archivo
        request.send(null);                        // Enviando la solicitud
        return byteArray;
    }

    /* Lee los datos de un archivo .MTL (archivo de los colores de los materiales) */
    lee_datos_archivo_mtl(nombreArchivoMTL) {

        let datos_mtl = this.leeArchivo("Modelos/" + nombreArchivoMTL);

        /* Divide por lineas */
        let lineas = datos_mtl.split('\n');

        let token;
        for (let i = 0; i < lineas.length; i++) {
            let cad = new Cadena(lineas[i]); // Inicia el procesamiento de cadenas 
            token = cad.getToken();
            if (token != null) {
                switch (token) {
                    case '#':
                        continue;
                    case 'newmtl':  /* nombre del material */
                        let nombreMaterial = cad.getToken();
                        let material = new Material();
                        material.setNombre(nombreMaterial);
                        this.materiales.push(material);
                        break;
                    case 'Ka':      /* ambiente */
                        let ambiente = new Array(3);
                        ambiente[0] = cad.getFloat();
                        ambiente[1] = cad.getFloat();
                        ambiente[2] = cad.getFloat();
                        this.materiales[this.materiales.length - 1].setAmbiente(ambiente);
                        break;
                    case 'Kd':      /* difuso */
                        var difuso = new Array(3);
                        difuso[0] = cad.getFloat();
                        difuso[1] = cad.getFloat();
                        difuso[2] = cad.getFloat();
                        this.materiales[this.materiales.length - 1].setDifuso(difuso);
                        break;
                    case 'Ks':      /* especular */
                        var especular = new Array(3);
                        especular[0] = cad.getFloat();
                        especular[1] = cad.getFloat();
                        especular[2] = cad.getFloat();
                        this.materiales[this.materiales.length - 1].setEspecular(especular);
                        break;
                    case 'Ns':      /* brillo */
                        var brillo = cad.getFloat();
                        this.materiales[this.materiales.length - 1].setBrillo(brillo);
                        break;
                }
            }
        }
    }

    /* Busca el grupo */
    buscaGrupo(nombre) {
        for (let i = 0; i < this.grupos.length; i++)
            if (nombre == this.grupos[i].getNombre())
                return i;
        return -1;
    }

    /* Busca el Material */
    buscaMaterial(nombre) {
        for (let i = 0; i < this.materiales.length; i++)
            if (nombre == this.materiales[i].getNombre())
                return i;
        return -1;
    }

    /* Busca el Material que se encuentra en el grupo */
    buscaMaterialPorGrupo(indice) {
        for (let i = 0; i < this.grupos.length; i++)
            if (indice == this.grupos[i].getMaterial())
                return i;
        return -1;
    }
}

/***************************************************************************/
/* La Clase Vector3                                                        */
/***************************************************************************/

class Vector3 {

    /**
     * Construye un nuevo Vector.
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     *                   u = Suma de vectores
     *  u = v1 + v2     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     *                   u = (v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
     */
    mas(v2) {
        return (new Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z));
    }

    /**
     *                   u = Resta de vectores
     *  u = v1 - v2     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     *                   u = (v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
     */
    menos(v2) {
        return (new Vector3(this.x - v2.x, this.y - v2.y, this.z - v2.z));
    }

    /**
     *                      u x v = Producto vectorial o producto cruz
     * u = (u.x, u.y, u.z) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * v = (v.x, v.y, v.z)  u x v = (u.y * v.z - u.z * v.y,   
     *                               u.z * v.x - u.x * v.z,
     *                               u.x * v.y - u.y * v.x)                  
     */
    producto_vectorial(v2) {
        var r = new Vector3();
        r.x = (this.y * v2.z) - (this.z * v2.y);
        r.y = (this.z * v2.x) - (this.x * v2.z);
        r.z = (this.x * v2.y) - (this.y * v2.x);
        return r;
    }

    /**
     *                      u . v = Producto escalar o producto punto
     * u = (u.x, u.y, u.z) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     * v = (v.x, v.y, v.z)  u . v = u.x v.x + u.y v.y + u.z v.z
     *                                          
     */
    producto_escalar(v2) {
        return (this.x * v2.x) + (this.y * v2.y) + (this.z * v2.z);
    }

    /**
     *                     |v| = Longitud de un vector o magnitud
     * v = (x, y, z)    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     *                     |v| = raiz_cuadrada (x^2 + y^2 + z^2) 
     *                                          
     */
    longitud() {
        return (Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z));
    }

    /**
     *        v            u = Vector unitario o de longitud 1
     *  u  = ---        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     *       |v|           u = Vector normalizado
     *                     
     */
    normaliza() {
        var l = this.longitud();
        if (l > 0) {
            this.x = this.x / l;
            this.y = this.y / l;
            this.z = this.z / l;
        }
    }

    /**
     *    3 
     *     ^
     *     |
     *   v | 
     *     |
     *     |
     *    1 -------- > 2
     *          u
     */
    normal(v1, v2, v3) {
        var u = new Vector3(); // vector u
        var v = new Vector3(); // vector v
        var n = new Vector3(); // vector n

        /* Calcula los vectores u y v */
        u = v2.menos(v1);
        v = v3.menos(v1);

        /* n = u x v */
        n = u.producto_vectorial(v);

        /* Normaliza */
        n.normaliza();

        return n;
    }

    toString() {
        return "Vector3 [x=" + this.x + ", y=" + this.y + ", z=" + this.z + "]";
    }
}

/***********************************************************************************/
/* Se define la geometría y se almacenan en los buffers de memoria y se renderiza. */
/***********************************************************************************/
class Cubo {

    /**
     *       vertices            coord_textura
     *   x1,y2      x2,y2      u1,v2       u2,v2
     *      ----------            ---------- 
     *     |        / |          |        / | 
     *     |      /   |          |      /   | 
     *     |    /     |          |    /     |
     *     | /        |          | /        |
     *      ----------            ---------- 
     *   x1,y1      x2,y1      u1,v1       u2,v1
     */
    constructor(gl) {

        /* Las coordenadas cartesianas (x, y, z) */
        var vertices = [
            // Frente
            -1, -1, 1, // 4   0
            1, -1, 1, // 5   1
            1, 1, 1, // 6   2
            -1, 1, 1, // 7   3
            // Atrás
            -1, 1, -1, // 3   4
            1, 1, -1, // 2   5
            1, -1, -1, // 1   6
            -1, -1, -1, // 0   7
            // Izquierda
            -1, -1, -1, // 0   8
            -1, -1, 1, // 4   9
            -1, 1, 1, // 7  10 
            -1, 1, -1, // 3  11
            // Derecha
            1, -1, 1, // 5  12 
            1, -1, -1, // 1  13
            1, 1, -1, // 2  14
            1, 1, 1, // 6  15
            // Abajo
            -1, -1, -1, // 0  16
            1, -1, -1, // 1  17
            1, -1, 1, // 5  18
            -1, -1, 1, // 4  19
            // Arriba
            -1, 1, 1, // 7  20
            1, 1, 1, // 6  21
            1, 1, -1, // 2  22
            -1, 1, -1  // 3  23
        ];

        /* Coordenadas de textura (u, v) */
        var coord_textura = [
            0, 0, // 0
            1, 0, // 1
            1, 1, // 2
            0, 1, // 3

            0, 0, // 4
            1, 0, // 5
            1, 1, // 6
            0, 1, // 7

            0, 0, // 8
            1, 0, // 9
            1, 1, // 10
            0, 1, // 11

            0, 0, // 12
            1, 0, // 13
            1, 1, // 14
            0, 1, // 15

            0, 0, // 16
            1, 0, // 17
            1, 1, // 18
            0, 1, // 19

            0, 0, // 20
            1, 0, // 21
            1, 1, // 22
            0, 1  // 23
        ];

        /* Indices */
        var indices = [
            0, 1, 2, 0, 2, 3, // Frente
            4, 5, 6, 4, 6, 7, // Atrás
            8, 9, 10, 8, 10, 11, // Izquierda 
            12, 13, 14, 12, 14, 15, // Derecha
            16, 17, 18, 16, 18, 19, // Abajo
            20, 21, 22, 20, 22, 23  // Arriba
        ];

        /* Se crea el objeto del arreglo de vértices (VAO) */
        this.cuboVAO = gl.createVertexArray();

        /* Se activa el objeto */
        gl.bindVertexArray(this.cuboVAO);


        /* Se genera un nombre (código) para el buffer */
        var codigoVertices = gl.createBuffer();

        /* Se asigna un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, codigoVertices);

        /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        /* Se habilita el arreglo de los vértices (indice = 0) */
        gl.enableVertexAttribArray(0);

        /* Se especifica los atributos del arreglo de vértices */
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);


        /* Se genera un nombre (código) para el buffer */
        var codigoCoordenadasDeTextura = gl.createBuffer();

        /* Se asigna un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, codigoCoordenadasDeTextura);

        /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coord_textura), gl.STATIC_DRAW);

        /* Se habilita el arreglo de las coordenadas de textura (indice = 1) */
        gl.enableVertexAttribArray(1);

        /* Se especifica el arreglo de las coordenadas de textura */
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);


        /* Se genera un nombre (código) para el buffer */
        var codigoDeIndices = gl.createBuffer();

        /* Se asigna un nombre (código) al buffer */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, codigoDeIndices);

        /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);

        /* Se deja de asignar un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        /* Se deja de asignar un nombre (código) al buffer */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    }

    muestra(gl) {

        /* Se activa el objeto del arreglo de vértices */
        gl.bindVertexArray(this.cuboVAO);

        /* Renderiza las primitivas desde los datos de los arreglos (vértices,
         * coordenadas de textura e indices) */
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);
    }

}

/***************************************************************************/
/* Lee la Textura                                                          */
/***************************************************************************/
function leeLaTextura(gl, ID_del_archivo, codigoDeTextura) {

    /* Se asigna un nombre (código) a la textura */
    gl.bindTexture(gl.TEXTURE_2D, codigoDeTextura);

    /* true, invierte los píxeles en el orden de abajo hacia arriba que WebGL espera */
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    /* Obtiene la imagen */
    var imagen = document.getElementById(ID_del_archivo);
    console.log("Imagen: ", imagen);

    /* Se lee la textura */
    /* |  tipo   |0=1 resol|RGB/RGBA |orden col|tip datos| buffer  | */
    /* |    1    |    2    |    3    |    4    |    5    |    6    | */
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, imagen);

    /* Para que el patrón de textura se agrande y se acomode a una área grande */
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    /* Para que el patrón de textura se reduzca y se acomode a una área pequeña */
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    /* Para repetir la textura tanto en s y t fuera del rango del 0 al 1
      * POR DEFECTO! */
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    /* Para limitar la textura tanto de s y t dentro del rango del 0 al 1 */
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    /* Se deja de asignar un nombre (código) a la textura */
    gl.bindTexture(gl.TEXTURE_2D, null);

}

/***********************************************************************************/
/* Se define la geometría y se almacenan en los buffers de memoria y se renderiza. */
/***********************************************************************************/
class EsferaTexturizada {

    /* segmentosH = slices o longitud, segmentosV = stacks o latitud  */
    constructor(gl, radio, segmentosH, segmentosV) {

        let cantidadDeVertices = (segmentosH + 1) * (segmentosV + 1);
        this.cantidadDeIndices = segmentosH * segmentosV * 6 * 2; // 6 vert (c/cuadrado)

        let i, j, k, x, y, z, theta_, phi_, k1, k2, u, v, iCT;

        /* Las coordenadas cartesianas (x, y, z) */
        let vertices = new Float32Array(cantidadDeVertices * 3);

        /* Coordenadas de textura (u, v) */
        let coord_textura = new Float32Array(cantidadDeVertices * 2);

        /* Indices */
        let indices = new Uint16Array(this.cantidadDeIndices);

        /* Considere a las Coordenadas Esféricas para los siguientes cálculos */

        /* Se leen los vertices y las normales */
        k = 0, iCT = 0;
        let theta = 2 * Math.PI / segmentosH; // 1 vuelta    360/segmentosH
        let phi = Math.PI / segmentosV;       // 1/2 vuelta  180/segmentosV

        // latitud
        for (i = 0; i <= segmentosV; i++) {
            phi_ = i * phi - Math.PI / 2; // -90..90 grados

            // longitud
            for (j = 0; j <= segmentosH; j++) {
                theta_ = j * theta; // 0..360 grados
                x = radio * Math.cos(theta_) * Math.cos(phi_);
                y = radio * Math.sin(theta_) * Math.cos(phi_);
                z = radio * Math.sin(phi_);

                vertices[k++] = x;
                vertices[k++] = y;
                vertices[k++] = z;

                u = j / segmentosH;
                v = i / segmentosV;
                coord_textura[iCT++] = u;
                coord_textura[iCT++] = v;
            }
        }

        /* Se leen los indices */

        /**
         *    k2 ------- k2+1
         *     |      /  | 
         *     |    /    |
         *     | /       |
         *    k1 ------- k1+1  
         *    k1---k2+1---k2   k1---k1+1---k2+1
         */
        k = 0;
        for (i = 0; i < segmentosV; i++) {
            k1 = i * (segmentosH + 1);      // inicio del actual segmentoV
            k2 = k1 + segmentosH + 1;       // inicio del siguiente segmentoV
            for (j = 0; j < segmentosH; j++) {
                indices[k++] = k1 + j;        // k1---k2+1---k2
                indices[k++] = k2 + j + 1;
                indices[k++] = k2 + j;

                indices[k++] = k1 + j;        // k1---k1+1---k2+1
                indices[k++] = k1 + j + 1;
                indices[k++] = k2 + j + 1;
            }
        }

        this.esferaVAO = gl.createVertexArray();
        gl.bindVertexArray(this.esferaVAO);

        var codigoVertices = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, codigoVertices);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

        var codigoCoordenadasDeTextura = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, codigoCoordenadasDeTextura);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coord_textura), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

        var codigoDeIndices = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, codigoDeIndices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    muestra(gl) {
        gl.bindVertexArray(this.esferaVAO);
        gl.drawElements(gl.TRIANGLES, this.cantidadDeIndices, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }
}
