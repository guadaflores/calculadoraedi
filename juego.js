// 1. INICIALIZACIÓN
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

// Obtenemos todos los elementos del HTML
const inputNumero = document.getElementById('guessInput');
const botonComprobar = document.getElementById('guessButton');
const botonReiniciar = document.getElementById('restartButton'); // Nuevo botón
const mensajeElement = document.getElementById('message');
const intentosElement = document.getElementById('attempts');

console.log(`Psst... el número secreto es ${numeroSecreto}`);

// 2. EVENTOS
botonComprobar.addEventListener('click', comprobarAdivinanza);
botonReiniciar.addEventListener('click', reiniciarJuego); // Nuevo evento

// 3. LÓGICA DEL JUEGO
function comprobarAdivinanza() {
    const numeroUsuario = parseInt(inputNumero.value);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
        mensajeElement.textContent = 'Por favor, introduce un número válido entre 1 y 100.';
        return;
    }

    intentos++;
    intentosElement.textContent = `Intentos: ${intentos}`;

    if (numeroUsuario === numeroSecreto) {
        // Si acierta:
        mensajeElement.textContent = `¡CORRECTO! Adivinaste en ${intentos} intentos.`;
        inputNumero.disabled = true;
        botonComprobar.disabled = true;
        botonReiniciar.classList.remove('hidden'); // Mostramos el botón de reinicio
    } else if (numeroUsuario < numeroSecreto) {
        mensajeElement.textContent = '¡Demasiado bajo! Intenta con un número más alto.';
    } else {
        mensajeElement.textContent = '¡Demasiado alto! Intenta con un número más bajo.';
    }

    inputNumero.value = '';
    inputNumero.focus();
}

// 4. FUNCIÓN DE REINICIO CON DO-WHILE
function reiniciarJuego() {
    console.log("--- Reiniciando el juego ---");
    const numeroAnterior = numeroSecreto; // Guardamos el número actual para compararlo

    // BUCLE DO-WHILE:
    // Genera un nuevo número secreto y repite el proceso MIENTRAS el nuevo número
    // sea igual al anterior. Esto garantiza que la nueva partida sea siempre diferente.
    do {
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        console.log(`Generando nuevo número: ${numeroSecreto}`);
    } while (numeroSecreto === numeroAnterior);

    console.log(`¡Juego listo! El nuevo número es ${numeroSecreto}`);

    // Reseteamos el estado del juego
    intentos = 0;
    mensajeElement.textContent = '';
    intentosElement.textContent = '';
    inputNumero.disabled = false;
    botonComprobar.disabled = false;
    botonReiniciar.classList.add('hidden'); // Ocultamos el botón de reinicio otra vez
    inputNumero.focus();
}
