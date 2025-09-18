// Declaramos el Set una sola vez, fuera de las funciones, para que no se borre.
const vunico = new Set();

function calcular(operador) {

  // CASO ESPECIAL: Si el operador es 'reset', hacemos solo esto y terminamos.
  if (operador === 'reset') {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('resultado').innerText = 0;
    
   // vunico.clear();
    
    actualizarHistorial();
    calcularYMostrarSuma();
    return;
  }

  // --- Para cualquier otro operador (+, -, *, /) ---

  const n1 = parseFloat(document.getElementById('num1').value);
  const n2 = parseFloat(document.getElementById('num2').value);
  let resultado = 0;

  switch(operador) {
    case '+':
      resultado = n1 + n2;
      break;
    case '-':
      resultado = n1 - n2;
      break;
    case '*':
      resultado = n1 * n2;
      break;
    case '/':
      resultado = n2 !== 0 ? n1 / n2 : 'Error: División por 0';
      break;
    default:
      resultado = 'Operador no válido';
  }

  if (typeof resultado === 'number' && !isNaN(resultado)) {
    vunico.add(resultado);
  }

  document.getElementById('resultado').innerText = resultado;
  
  actualizarHistorial();
  calcularYMostrarSuma();
}

/**
 * Muestra la lista de números únicos en el HTML.
 */
function actualizarHistorial() {
  const historialElement = document.getElementById('numerosUnicos');
  if (historialElement) {
    if (vunico.size === 0) {
      historialElement.innerText = 'El historial está vacío.';
    } else {
      const numerosOrdenados = Array.from(vunico).sort((a, b) => a - b);
      historialElement.innerText = numerosOrdenados.join(', ');
    }
  }
}

/**
 * [VERSIÓN CORREGIDA]
 * Calcula la suma del historial y la muestra en el HTML.
 */
function calcularYMostrarSuma() {
  const sumaElement = document.getElementById('sumaHistorial');
  if (sumaElement) {
    // 1. Creamos un array ordenado a partir del Set, igual que en la función de arriba.
    const numerosOrdenados = Array.from(vunico).sort((a, b) => a - b);
    
    let sumaTotal = 0;
    // 2. Recorremos ese array para sumar cada número.
    for (const numero of numerosOrdenados) {
      sumaTotal += numero;
    }
    
    // 3. Mostramos la suma total en la pantalla.
    sumaElement.innerText = sumaTotal;
  }
}
