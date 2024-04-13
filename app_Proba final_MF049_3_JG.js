// Autor: Jordi Galí Manuel

class Aliment {
    constructor(nom, calories, nutrients) {
        this.nom = nom;
        this.calories = calories;
        this.nutrients = nutrients;
    }
}

class Categoria extends Aliment {
    constructor(nom, calories, categoria) {
        super(nom, calories);
        this.categoria = categoria;
    }
}

class Propietats extends Aliment {
    constructor(nom, calories, propietats) {
        super(nom, calories);
        this.propietats = propietats;
    }
}

// Instancias de las clases

// Tres instancias adicionales de la clase Aliment
const aliment1 = new Aliment('Pera', 125, ['Te fructosa', 'Te sacarosa']);
const aliment2 = new Aliment('Escalopa', 400, ['Te molta proteïna', 'Te molt greix']);
const aliment3 = new Aliment('Brocoli', 50, ['Te molta fibra', 'Te clorofila']);

// Tres instancias adicionales de la clase Categoria
const categoria1 = new Categoria('Iogurt', 210, 'lactics');
const categoria2 = new Categoria('LLenties', 69, 'Gra');
const categoria3 = new Categoria('Xucrut', 2, 'verdura');


// Tres instancias adicionales de la clase Propietats
const propietat1 = new Propietats('Platan', 250, 'Va molt bé per prevenir agulletes');
const propietat2 = new Propietats('Cigrons', 150, 'Va molt bé per perdre pes');
const propietat3 = new Propietats('Pollastre', 650, 'Va molt bé per generar massa muscular');


const aliments = [aliment1, aliment2, aliment3, categoria1, categoria2, categoria3, propietat1, propietat2, propietat3];
document.addEventListener("DOMContentLoaded", function() {
    const alimentsSection = document.getElementById('aliments');
    const resultadosSection = document.getElementById('resultados');
    const resultadosComparacion = document.getElementById('resultadosComparacion');

    let caloriesTotalMax = 0;
    
    // Función para agregar campo de aliment
    function agregarCampoAliment() {
        const nuevoCampo = document.createElement('div');
        nuevoCampo.innerHTML = `
            <label for="aliments">Aliment:</label>
            <select name="aliments" onchange="mostrarOpciones(this)">
                <option value="seleccionar" disabled selected>Seleccionar</option>
                ${crearOpcionesAliments()}
            </select>
            <div id="opciones"></div>
            <label for="calories">Calories (U):</label>
            <input type="text" name="calories" placeholder="Introdueix les calories">
        `;
        alimentsSection.appendChild(nuevoCampo);
    }

    // Función para crear las opciones del desplegable
    function crearOpcionesAliments() {
        let opciones = '';
        aliments.forEach(aliment => {
            opciones += `<option value="${aliment.nom}">${aliment.nom}</option>`;
        });
        return opciones;
    }

    // Función para mostrar opciones específicas según el alimento seleccionado
    function mostrarOpciones(select) {
        const opcionSeleccionada = select.value;
        const opcionesDiv = select.nextElementSibling;

        // Limpiar opciones anteriores
        opcionesDiv.innerHTML = '';

        // Encontrar el alimento seleccionado
        const alimentSeleccionado = aliments.find(aliment => aliment.nom === opcionSeleccionada);
    
    }


    // Función para calcular el contenido calórico
    function calcularCalorias() {
        let caloriesTotal = 0;

        let resultadosHTML = `
            <h2>Resultats:</h2>
            <table>
                <tr>
                    <th>Aliment</th>
                    <th>Calories introduides</th>
                    <th>Nutrients</th>
                    <th>Prpietats</th>
                </tr>
        `;

        const alimentsInputs = document.getElementsByName('aliments');
        const caloriesInputs = document.getElementsByName('calories');

        for (let i = 0; i < alimentsInputs.length; i++) {
            const tipoAliment = alimentsInputs[i].value;
            const calories = parseInt(caloriesInputs[i].value);

            // Validar cantidad de calorías ingresada
            if (isNaN(calories) || calories <= 0) {
                alert('Si et plau, introdueix una quantitat vàlida que no sigui un valor zero o negatiu per ' + alimentsInputs[i].value);
                return;
            }

            let nutrientsSugeridas = '';
            let milloraliment = '';

            // Buscar el alimento seleccionado en la lista de alimentos
            const alimentSeleccionado = aliments.find(aliment => aliment.nom === tipoAliment);

            if (alimentSeleccionado) {
                // Asignar propiedades sugeridas según tipo de alimento
                if (alimentSeleccionado instanceof Aliment || alimentSeleccionado instanceof Categoria || alimentSeleccionado instanceof Propietats) {
                     nutrientsSugeridas = alimentSeleccionado.nutrients.join(', ');
                }

                // Determinar mejor alimento
                if (alimentSeleccionado instanceof Aliment) {
                    milloraliment = 'Prendre per esmorzar';
                } else if (alimentSeleccionado instanceof Categoria) {
                    milloraliment = 'Prendre per dinar';
                } else if (alimentSeleccionado instanceof Propietats) {
                    milloraliment = 'Prendre tot el dia';
                }

                // Agregar fila a la tabla de resultados
                resultadosHTML += `
                    <tr>
                        <td>${alimentSeleccionado.nom}</td>
                        <td>${calories}</td>
                        <td>${nutrientsSugeridas}</td>
                        <td>${milloraliment}</td>
                    </tr>
                `;

                caloriesTotal += calories;
            }
        }

        resultadosHTML += `</table>`;
        resultadosSection.innerHTML = resultadosHTML;

        // Mostrar duración total del viaje
        alert('La quantitat total de calories es de: ' + caloriesTotal + ' grams.');
        caloriesTotalMax = caloriesTotal;

    }

    function calcularComparacion(){

        let caloriesMaximos = document.getElementById('comparacionCalorias');
        let valorMaximo = parseFloat(caloriesMaximos.value);

        if(caloriesTotalMax > valorMaximo){
            let caloriesSobrantes = caloriesTotalMax - valorMaximo;
            resultadosComparacion.innerHTML = `<p> ¡Te has pasado de calorias! (Tienes que eliminar ${caloriesSobrantes} calorias de tu dieta) </p>`;
        } else if(caloriesTotalMax == valorMaximo){
            resultadosComparacion.innerHTML = `<p> ¡Has planificado la dieta a la perfección! No te sobran ni te faltan calorias. </p>`;
        } else{
            let caloriesRestantes = valorMaximo - caloriesTotalMax;
            resultadosComparacion.innerHTML = `<p> Aún puedes añadir más calorias a tu dieta (${caloriesRestantes} calorias restantes). </p>`;
        }
    }


    // Evento para agregar campo de alimento al hacer clic en un botón
    document.getElementById('agregar-aliment').addEventListener('click', agregarCampoAliment);

    // Evento para calcular el itinerario al hacer clic en un botón
    document.getElementById('calcular-calories').addEventListener('click', calcularCalorias);

    // Evento para calcular la comparación de días al hacer clic en un botón
    document.getElementById('calcular-comparacion').addEventListener('click', calcularComparacion);

});
