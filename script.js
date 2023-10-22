document.addEventListener("DOMContentLoaded", function () {
  // BOTON EMPEZAR
  const startButton = document.getElementById("startButton");

  // BOTON SIGUIENTE PREGUNTA
  const nextButton = document.getElementById("nextButton");

  // REGISTRO DE LA PREGUNTA
  let questionIndex = 0;
  let score = 0;

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
    // Ocultar botón start game
    startButton.style.display = "none";

    // OCULTAR MENSAJE BIENVENIDA
    const welcomeContainer = document.querySelector("#welcomeContainer");
    welcomeContainer.style.display = "none";

    // MOSTRAR preguntas y respuestas
    const questionContainer = document.querySelector("#playQuiz");
    questionContainer.style.display = "block";

    // MOSTRAR BOTÓN NEXT
    nextButton.style.display = "block";
  });

  // FUNCION PARA MOSTRAR LAS PREGUNTAS
  nextButton.addEventListener("click", function () {
    // COMPROBAR QUE ALGUNA OPCION HA SIDO SELECCIONADA
    const typeAnswer = document.querySelectorAll('input[type="radio"]');

    let answerSelected = false;
    for (let i = 0; i < typeAnswer.length; i++) {
      if (typeAnswer[i].checked) {
        answerSelected = true;
        break;
      }
    }

    // UNA VEZ COMPROBADO Y QUE SEA TRUE REALIZA EL SIGUIENTE CONDICIONAL
    if (answerSelected) {
      questionIndex++;

      const questionsData = getQuestionsFromLocalStorage();

      // CONDICIONAL PARA COMPROBAR SI HAY MÁS PREGUNTAS ALMACENADAS
      if (questionsData && questionIndex < questionsData.length) {
        showQuestion(questionsData, questionIndex);
      } else {
        const section = document.getElementById("question_quiz");
        section.innerHTML = "¡HAS TERMINADO LAS PREGUNTAS DE QUIZZYWIZ!";

        // OCULTAR BOTÓN NEXT
        nextButton.style.display = "none";
      }
    } else {
      // SI NO HA SIDO SELECCIONADA NINGUNA RESPUESTA
      alert("Tienes que elegir alguna respuesta");
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
});

function getQuestionsFromLocalStorage() {
  let questionsData = localStorage.getItem("questionsData");
  if (questionsData) {
    return JSON.parse(questionsData);
  }
  return null;
}

// ***** CONSEGUIR DEJAR SELECIONADA UNA RESPUESTA CON EL COLOR ****** //

// *********    FALTA VERIFICAR LAS RESPUESTAS ************ //

// Función para obtener las respuestas seleccionadas por el usuario y las respuestas correctas
// function getSelectedAnswers() {
//   const selectedAnswers = [];
//   const inputs = document.querySelectorAll('input[type="radio"]:checked');

//   for (let i = 0; i < inputs.length; i++) {
//     const input = inputs[i];
//     const questionIndex = parseInt(input.getAttribute("name").split("_")[1]);
//     const answer = input.value;

//     selectedAnswers.push({
//       questionIndex: questionIndex,
//       answer: answer,
//     });
//   }

//   return selectedAnswers;
// }

// function showResult() {
//   let resultsSection = document.querySelector(".results");
//   let scoresData = JSON.parse(localStorage.getItem("questionsData"));

//   if (scoresData && scoresData.length > 0) {
//     let lastScore = scoresData[scoresData.length - 1];
//     let resultTemplate = `<p class='printResult'>${lastScore.score}</p>`;
//     resultsSection.innerHTML = resultTemplate;
//   }
// }
// ***** CONSEGUIR DEJAR SELECIONADA UNA RESPUESTA CON EL COLOR ****** //

// *********    FALTA VERIFICAR LAS RESPUESTAS ************ //
