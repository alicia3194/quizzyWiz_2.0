//Función para cuando se presione el botón de EMPEZAR salga las preguntas
// Función para traer información desde la API y almacenar en localStorage

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");

  async function getQuestionsAndBegin() {
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

      localStorage.setItem("questionsData", JSON.stringify(getInfo));
      showQuestion(getInfo, 0);
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
    }
  }

  //Llamar a la funcionalidad de click, esconderse una vez pulsado
  startButton.addEventListener("click", function () {
    getQuestionsAndBegin();
    startButton.style.display = "none";
    // METER ALGO PARA QUE EL TEXTO DE BIENVENIDA SE QUITE TAMBIÉN
  });

  function showQuestion(questions, index) {
    let section = document.querySelector("#question_quiz");
    let question = questions[index];
    if (question) {
      let arrTemplateString = `
        <h1 class="pregunta">${question.question}</h1>
        <label><input type="radio" value="${question.correctAnswer}" name="res">${question.correctAnswer}</label>
        <label><input type="radio" value="${question.incorrectAnswers[0]}" name="res">${question.incorrectAnswers[0]}</label>
        <label><input type="radio" value="${question.incorrectAnswers[1]}" name="res">${question.incorrectAnswers[1]}</label>
        <label><input type="radio" value="${question.incorrectAnswers[2]}" name="res">${question.incorrectAnswers[2]}</label>
      `;
      section.innerHTML = arrTemplateString;
    } else {
      section.innerHTML = "No hay más preguntas.";
    }
  }
});
