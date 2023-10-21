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
