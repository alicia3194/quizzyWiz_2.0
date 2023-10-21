// LLAMAR AL EVENTO DE LOS BOTONES EMPEZAR Y SIGUIENTE

document.addEventListener("DOMContentLoaded", function () {
  //BOTON EMPEZAR
  const startButton = document.getElementById("startButton");

  //BOTON SIGUIENTE PREGUNTA
  const nextButton = document.getElementById("nextButton");

  // REGISTRO DE LA PREGUNTA
  let questionIndex = 0;

  // Función INFORMACIÓN API y GUARDAR EN LOCALST
  async function getQuestionsApi() {
    try {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      let data = await response.json();
      let objQuestions = data.results;

      let getInfo = objQuestions.map((question) => ({
        question: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
      }));

      // Guarda preguntas en el LocalStorage
      localStorage.setItem("questionsData", JSON.stringify(getInfo));

      // Mostrar la primera pregunta
      showQuestion(getInfo, questionIndex);
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
    }
  }

  // OCULTAR BOTÓN EMPEZAR, TITULO Y MENSAJE BIENVENIDA"
  startButton.addEventListener("click", function () {
    getQuestionsApi();
    // Ocultar el botón de inicio
    startButton.style.display = "none";

    // Ocultar el mensaje de bienvenida
    const welcomeContainer = document.querySelector("#welcomeContainer");
    welcomeContainer.style.display = "none";

    // Mostrar el botón "Siguiente Pregunta"
    nextButton.style.display = "block";
  });

  // FUNCION PARA MOSTAR LAS PREGUNTAS
  nextButton.addEventListener("click", function () {
    // COMPROBAR QUE ALGUNA OPCION HA SIDO SELECCIONADA
    const typeAnswer = document.querySelectorAll('input[type="radio"]');

    let answerSelected = false;
    for (let i = 0; i < typeAnswer.length; i++) {
      if (typeAnswer[i].checked) {
        answerSelected = true;
        break;
      }
    } // UNA VEZ COMPROBADO Y QUE SEA TRUE REALIZA EL SIGUIENTE CONDICIONAL
    if (answerSelected) {
      questionIndex++;

      const questionsData = getQuestionsFromLocalStorage();

      // CONDICIONAL PARA COMPROBAR SI HAY MÁS PREGUNTAS ALMACENADAS
      if (questionsData && questionIndex < questionsData.length) {
        showQuestion(questionsData, questionIndex);
      } else {
        const section = document.getElementById("question_quiz");
        section.innerHTML = "¡HAS TERMINADO LAS PREGUNTAS DE QUIZZYWIZ!";

        // OCULTAMOS BOTÓN NEXT
        nextButton.style.display = "none";
      }
    } else {
      // SI NO HA SIDO SELECCIONADA NINGUNA RESPUESTA
      alert("Tienes que eleguir alguna respuesta");
    }
  });

  // MOSTRAR LAS PREGUNTAS Y RESPUESTAS
  function showQuestion(questions, index) {
    let section = document.getElementById("question_quiz");
    let question = questions[index];

    let arrTemplateString = `
    <h1 class="pregunta">${question.question}</h1>
    <label><input type="radio" value="${question.correctAnswer}" name="res" required>${question.correctAnswer}</label>
    <label><input type="radio" value="${question.incorrectAnswers[0]}" name="res" required>${question.incorrectAnswers[0]}</label>
    <label><input type="radio" value="${question.incorrectAnswers[1]}" name="res" required>${question.incorrectAnswers[1]}</label>
    <label><input type="radio" value="${question.incorrectAnswers[2]}" name="res" required>${question.incorrectAnswers[2]}</label>
  `;
    section.innerHTML = arrTemplateString;
  }

  // Función para obtener preguntas desde el LocalStorage
  function getQuestionsFromLocalStorage() {
    let questionsData = localStorage.getItem("questionsData");
    if (questionsData) {
      return JSON.parse(questionsData);
    }
    return null;
  }
});

// *********    FALTA VERIFICAR LAS RESPUESTAS ************ //

// ***** PENSAR EN COMO QUITAR EL ESPACIO QUE SE VE DONDE VAN LAS PREGUNTAS, RESPUESTAS Y BOTON
//       ANTES DE QUE SE PULSE GO ***** //
