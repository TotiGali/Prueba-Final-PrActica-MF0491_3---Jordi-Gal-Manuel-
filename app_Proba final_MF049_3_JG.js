class Destino {
    constructor(nombre, ubicacion, actividades) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.actividades = actividades;
    }
}

class Ciudad extends Destino {
    constructor(nombre, ubicacion, actividades, clima) {
        super(nombre, ubicacion, actividades);
        this.clima = clima;
    }
}

class Playa extends Destino {
    constructor(nombre, ubicacion, actividades, temperaturaAgua) {
        super(nombre, ubicacion, actividades);
        this.temperaturaAgua = temperaturaAgua;
    }
}

// Instancias de las clases

// Tres instancias adicionales de la clase Destino
const destino1 = new Destino('Francia', 'Europa', ['Visitar la Torre Eiffel', 'Comer queso']);
const destino2 = new Destino('Italia', 'Europa', ['Visita al Coliseo', 'Explorar el Vaticano']);
const destino3 = new Destino('Japón', 'Asia', ['Visita al Templo Sensoji', 'Paseo por el barrio de Shibuya']);

// Tres instancias adicionales de la clase Ciudad
const ciudad1 = new Ciudad('Barcelona', 'España', ['Visitar Sagrada Familia', 'Paseo por Las Ramblas'], 'Mediterráneo');
const ciudad2 = new Ciudad('Nueva York', 'EEUU', ['Visita al Empire State', 'Paseo por Central Park'], 'Templado');
const ciudad3 = new Ciudad('Londres', 'Reino Unido', ['Visita al Palacio de Buckingham', 'Recorrido por el British Museum'], 'Templado');
const ciudad4 = new Ciudad('Berlín', 'Alemania', ['Explorar la Puerta de Brandeburgo', 'Visita al Muro de Berlín'], 'Templado');
const ciudad5 = new Ciudad('Praga', 'República Checa', ['Visita al Puente de Carlos', 'Explorar el Castillo de Praga'], 'Templado');

// Tres instancias adicionales de la clase Playa
const playa1 = new Playa('Cancún', 'México', ['Buceo en arrecifes', 'Relax en la playa'], 'Cálida');
const playa2 = new Playa('Harstad', 'Noruega', ['Buceo en glaciares', 'Observar ballenas'], 'Fria');
const playa3 = new Playa('Bora Bora', 'Polinesia Francesa', ['Esquí acuático', 'Nadar con tiburones'], 'Cálida');
const playa4 = new Playa('Maldivas', 'Maldivas', ['Snorkel en arrecifes de coral', 'Relax en resorts de lujo'], 'Cálida');


const destinos = [destino1, destino2, destino3, ciudad1, ciudad2, ciudad3, ciudad4, ciudad5, playa1, playa2, playa3, playa4];
document.addEventListener("DOMContentLoaded", function() {
    const destinosSection = document.getElementById('destinos');
    const resultadosSection = document.getElementById('resultados');
    const resultadosComparacion = document.getElementById('resultadosComparacion');

    let duracionTotalMax = 0;
    
    // Función para agregar campo de destino
    function agregarCampoDestino() {
        const nuevoCampo = document.createElement('div');
        nuevoCampo.innerHTML = `
            <label for="destino">Destíno:</label>
            <select name="destino" onchange="mostrarOpciones(this)">
                <option value="seleccionar" disabled selected>Seleccionar</option>
                ${crearOpcionesDestinos()}
            </select>
            <div id="opciones"></div>
            <label for="duracion">Duración (días):</label>
            <input type="text" name="duracion" placeholder="Ingrese la duración">
        `;
        destinosSection.appendChild(nuevoCampo);
    }

    // Función para crear las opciones del desplegable
    function crearOpcionesDestinos() {
        let opciones = '';
        destinos.forEach(destino => {
            opciones += `<option value="${destino.nombre}">${destino.nombre}</option>`;
        });
        return opciones;
    }

    // Función para mostrar opciones específicas según el destino seleccionado
    function mostrarOpciones(select) {
        const opcionSeleccionada = select.value;
        const opcionesDiv = select.nextElementSibling;

        // Limpiar opciones anteriores
        opcionesDiv.innerHTML = '';

        // Encontrar el destino seleccionado
        const destinoSeleccionado = destinos.find(destino => destino.nombre === opcionSeleccionada);

    
    }


// Función para calcular el itinerario
    function calcularItinerario() {
        let duracionTotal = 0;

        let resultadosHTML = `
            <h2>Resultados:</h2>
            <table>
                <tr>
                    <th>Destino</th>
                    <th>Duración (días)</th>
                    <th>Actividades sugeridas</th>
                    <th>Mejor época para viajar</th>
                </tr>
        `;

        const destinosInputs = document.getElementsByName('destino');
        const duracionesInputs = document.getElementsByName('duracion');

        for (let i = 0; i < destinosInputs.length; i++) {
            const tipoDestino = destinosInputs[i].value;
            const duracion = parseInt(duracionesInputs[i].value);

            // Validar duración ingresada
            if (isNaN(duracion) || duracion <= 0) {
                alert('Por favor, ingrese una duración válida para el destino ' + destinosInputs[i].value);
                return;
            }

            let actividadesSugeridas = '';
            let mejorEpoca = '';

            // Buscar el destino seleccionado en la lista de destinos
            const destinoSeleccionado = destinos.find(destino => destino.nombre === tipoDestino);

            if (destinoSeleccionado) {
                // Asignar actividades sugeridas según tipo de destino
                if (destinoSeleccionado instanceof Ciudad || destinoSeleccionado instanceof Playa || destinoSeleccionado instanceof Destino) {
                    actividadesSugeridas = destinoSeleccionado.actividades.join(', ');
                }

                // Determinar mejor época para viajar
                if (destinoSeleccionado instanceof Ciudad) {
                    mejorEpoca = 'Primavera o otoño';
                } else if (destinoSeleccionado instanceof Playa) {
                    mejorEpoca = 'Invierno';
                } else if (destinoSeleccionado instanceof Destino) {
                    mejorEpoca = 'Todo el año';
                }

                // Agregar fila a la tabla de resultados
                resultadosHTML += `
                    <tr>
                        <td>${destinoSeleccionado.nombre}</td>
                        <td>${duracion}</td>
                        <td>${actividadesSugeridas}</td>
                        <td>${mejorEpoca}</td>
                    </tr>
                `;

                duracionTotal += duracion;
            }
        }

        resultadosHTML += `</table>`;
        resultadosSection.innerHTML = resultadosHTML;

        // Mostrar duración total del viaje
        alert('La duración total del viaje es de ' + duracionTotal + ' días.');
        duracionTotalMax = duracionTotal;

    }

function calcularComparacion(){

    let diasMaximos = document.getElementById('comparacionDias');
    let valorMaximo = parseFloat(diasMaximos.value);

    if(duracionTotalMax > valorMaximo){
        let diasSobrantes = duracionTotalMax - valorMaximo;
        resultadosComparacion.innerHTML = `<p> ¡Te has pasado de días! (Tienes que eliminar ${diasSobrantes} días de tus vacaciones) </p>`;
    } else if(duracionTotalMax == valorMaximo){
        resultadosComparacion.innerHTML = `<p> ¡Has planificado la duración de tus días de vacaciones a la perfección! No te sobran ni te faltan días. </p>`;
    } else{
        let diasRestantes = valorMaximo - duracionTotalMax;
        resultadosComparacion.innerHTML = `<p> Aún puedes añadir más días a tus vacaciones (${diasRestantes} días restantes). </p>`;
    }
}


// Evento para agregar campo de destino al hacer clic en un botón
document.getElementById('agregar-destino').addEventListener('click', agregarCampoDestino);

// Evento para calcular el itinerario al hacer clic en un botón
document.getElementById('calcular-itinerario').addEventListener('click', calcularItinerario);

// Evento para calcular la comparación de días al hacer clic en un botón
document.getElementById('calcular-comparacion').addEventListener('click', calcularComparacion);

});
