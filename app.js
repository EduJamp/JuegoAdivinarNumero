/*let tittle = document.querySelector('h1'); // trae etiquetas 
tittle.innerHTML = 'Juego del Número Secreto'; // cambia el contenido de la etiqueta

let parrafo = document.querySelector('.texto__parrafo');
parrafo.innerHTML = 'indica un número del 1 al 10'; // cambia el contenido del párrafo*/

let numeroSecreto; // genera un número secreto entre 1 y 10
let cantidadIntentos = 1; // inicializa el contador de intentos
let veces = 3; //intentos restantes
let numerosSorteados = []; // array para almacenar los números ya intentados
let numeroMaximo = 10; // número máximo para el juego

condicionesIniciales(); // llama a la función para mostrar los mensajes iniciales

function añadirTextoEtiqueta(etiqueta, texto) {
    let elemento = document.querySelector(etiqueta); // selecciona la etiqueta
    elemento.innerHTML = texto; // cambia el contenido de la etiqueta
    return;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value); // obtiene el valor del input
    limpiarCampo("valorUsuario"); // limpia el campo de entrada
    if (numeroUsuario === numeroSecreto) {
        añadirTextoEtiqueta("p", `¡Felicidades! Has acertado el número secreto: ${numeroSecreto} en ${cantidadIntentos} ${(cantidadIntentos == 1) ? "intento" : "intentos"}!`);
        document.getElementById('reiniciar').disabled = false; // habilita el botón de reinicio

    }else {
        if(isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
            añadirTextoEtiqueta("p", "Por favor, introduce un número válido entre 1 y 10.");
            limpiarCampo("valorUsuario"); // limpia el campo de entrada

        }else if(numeroUsuario > numeroSecreto) {
            añadirTextoEtiqueta("p", `El numero secreto es menor que ${numeroUsuario}, te ${(veces== 1) ? "queda" : "quedan"} ${veces - 1} ${(veces == 1) ? "intento" : "intentos"}`);
        }else{
            añadirTextoEtiqueta("p", `El numero secreto es mayor que ${numeroUsuario}, te ${(veces == 1) ? "queda" : "quedan"} ${veces - 1} ${(veces == 1) ? "intento" : "intentos"}`);
        }
        
        veces--;
        cantidadIntentos++;

        reiniciarJuego();
    }

    return;
}

function reiniciarJuego() {
    if(veces < 1) {
        añadirTextoEtiqueta("p", `Has agotado todos tus intentos. El número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').disabled = false;
    }
}

function nuevoJuego() {
    limpiarCampo("valorUsuario"); // limpia el campo de entrada
    condicionesIniciales(); // reinicia las condiciones del juego
    document.getElementById('reiniciar').disabled = true; // deshabilita el botón de reinicio
}

function limpiarCampo(elemento) {
    let campo = document.getElementById(elemento).value = ""; // limpia el campo de entrada
    return campo;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // genera un número aleatorio de 1 a N;

    // Verifica si el número ya fue sorteado
    if(numerosSorteados.length == numeroMaximo){
        alert("Todos los números ya han sido sorteados. Reinicia la pagina para comenzar de nuevo.");
    }else{
        if(numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(numeroGenerado); // si el número ya fue sorteado, genera otro número;
        }else{
            numerosSorteados.push(numeroGenerado); // si el número ya fue sorteado, genera otro número
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    intentos = 3;
    cantidadIntentos = 1;
    numeroMaximo = 10;
    numeroSecreto = generarNumeroSecreto(numeroMaximo); // genera un nuevo número secreto
    console.log(numeroSecreto); // muestra el número secreto en la consola para depuración
    añadirTextoEtiqueta('h1', 'Juego del Número Secreto');
    añadirTextoEtiqueta('.texto__parrafo', `Indica un número del 1 al ${numeroMaximo}`);
}