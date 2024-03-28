'use strict'

//VARIABLES GLOBALES QUE NECESITO

// Las que hacen funcionar el codigo por fuera de sus funciones
let arrayFinal = [];
let ls = 0;        
let select = "";
let numeroAciertos = 0;
let numeroPregunta = 1;

// Las que permiten obtener elementos del dom fuera de sus funciones
const contenedor = document.getElementById("contenedor");
const divNumeroPregunta = document.getElementById("numeroPregunta");
const divNumeroAciertos = document.getElementById("numeroAciertos");

// Las que permiten crear elementos del dom fuera de sus funciones
const div = document.createElement("div");
const elementoDelDiv = document.createElement("div");
const elementoDelDiv2 = document.createElement("div");

// COMIENZA EL CODIGO

function preguntas() {

    fetch('https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json')

    .then((response) => { 
        return response.json(); 
    })  

    .then((data) => {

        // Meter el api en un array
        const almacenInicial = () => {            
            for (let i=0; i < data.length; i++) {
                arrayFinal.push(data[i]);
            } // Aqui cierra el bucle for 

        } // Aqui cierra la funcion almacenInicial

        almacenInicial(); 

        const dom = () => {

                // Usamos las variables globales para armar ésta funcion

                // A través del dom mostramos la pregunta y las respuestas dentro de su respectivo formulario
                div.className = "pregunta"; 
                div.innerHTML =
                    `<h2>${arrayFinal[ls].question}</h2>
                    <form id="formulario">
                    <label>${arrayFinal[ls].answers[0]} <span>=></span></label>
                    <input name="Opciones" type="radio" value="${arrayFinal[ls].answers[0]}" checked>
                    <label>${arrayFinal[ls].answers[1]} <span>=></span></label>
                    <input name="Opciones" type="radio" value="${arrayFinal[ls].answers[1]}">
                    <label>${arrayFinal[ls].answers[2]} <span>=></span></label>
                    <input name="Opciones" type="radio" value="${arrayFinal[ls].answers[2]}">
                    <label>${arrayFinal[ls].answers[3]} <span>=></span></label>
                    <input name="Opciones" type="radio" value="${arrayFinal[ls].answers[3]}">                    
                    </form>                    
                    `;   
                contenedor.appendChild(div);
                
                // A través del dom y gracias a las variables globales mostramos el número de pregunta y de aciertos

                // Número de pregunta
                elementoDelDiv.innerHTML =
                `
                <p> Pregunta Número: ${numeroPregunta}
                `;
                divNumeroPregunta.appendChild(elementoDelDiv);

                // Número de aciertos
                elementoDelDiv2.innerHTML =
                `
                <p> Número De Aciertos: ${numeroAciertos}
                `;
                divNumeroAciertos.appendChild(elementoDelDiv2);
        
        } // aqui cierra la funcion dom

        dom();

        const evento = () => {

                /* Cuando pulsamos click comprueba la respuesta, si es correcta incremento el valor de ls que se encarga de pasar a la siguiente pregunta, también incremento el numero de pregunta y el numero de aciertos, borro el div que muestra la pregunta con sus respectivas respuestas, además, borro los div que cuentan el numero de aciertos y el numero de preguntas respondidas, el truco para mantener almacenados los valores de éstos numeros sin hacer f5 o guardarlos en el localStorage es volver a llamar a la funcion llamada dom() y el html se actualiza con los nuevos datos. Si la respuesta es erronea, hace lo mismo que cuando es correcta pero no incrementa el numero de aciertos */

                const boton = document.getElementById("boton");           
                boton.addEventListener('click', (event) => {
                    select = document.querySelector('input[name="Opciones"]:checked').value

                    if (select === arrayFinal[ls].correct) {
                        // Puedes comentar el alert si te molesta
                        alert(`Enhorabuena, acertaste`);
                        ls++;
                        numeroAciertos++;
                        numeroPregunta++
                        contenedor.removeChild(div);
                        divNumeroPregunta.removeChild(elementoDelDiv);
                        dom();                    
                    }
                    else { 
                        // Puedes comentar el alert si te molesta
                        alert(`Fallaste, la respuesta era: ${arrayFinal[ls].correct}`);                   
                        ls++;
                        numeroPregunta++;
                        contenedor.removeChild(div);
                        divNumeroAciertos.removeChild(elementoDelDiv2);
                        dom();
                    }

            }); // Finaliza el evento onClick           
            
        } //Finaliza la funcion evento
        
        evento();
        

    }) // cierra el .then()

} // cierra la funcion principal

preguntas();