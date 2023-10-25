// const firebaseConfig = {
//   apiKey: "AIzaSyDlsqX9gEU6ToguhB0yuc1kKTtU93kcBMA",
//   authDomain: "quizii-84a42.firebaseapp.com",
//   projectId: "quizii-84a42",
//   storageBucket: "quizii-84a42.appspot.com",
//   messagingSenderId: "201517071704",
//   appId: "1:201517071704:web:f18386349818ced992f92d",
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

// document.addEventListener("DOMContentLoaded", function () {
//   // BOTON EMPEZAR
//   const startButton = document.getElementById("startButton");

//   // BOTON SIGUIENTE PREGUNTA
//   const nextButton = document.getElementById("nextButton");

//   // REGISTRO DE LA PREGUNTA
//   let questionIndex = 0;
//   let score = 0;

//   // Función INFORMACIÓN API y GUARDAR EN LOCALST
//   async function getQuestionsApi() {
//     try {
//       let response = await fetch(
//         "https://opentdb.com/api.php?amount=10&type=multiple"
//       );
//       let data = await response.json();
//       let objQuestions = data.results;

//       let getInfo = objQuestions.map((question) => ({
//         question: question.question,
//         correctAnswer: question.correct_answer,
//         incorrectAnswers: question.incorrect_answers,
//       }));

//       // Guarda preguntas en el LocalStorage
//       localStorage.setItem("questionsData", JSON.stringify(getInfo));
//       localStorage.setItem(
//         "answerCorrect",
//         JSON.stringify(getInfo.correctAnswer)
//       );
//       localStorage.setItem(
//         "answerFalse",
//         JSON.stringify(getInfo.incorrectAnswers)
//       );

//       // Mostrar la primera pregunta
//       showQuestion(getInfo, questionIndex);
//     } catch (error) {
//       console.log(`Hubo un error: ${error}`);
//     }
//   }

//   // OCULTAR BOTÓN EMPEZAR, TITULO Y MENSAJE BIENVENIDA"
//   startButton.addEventListener("click", function () {
//     getQuestionsApi();
//     // Ocultar botón start game
//     startButton.style.display = "none";

//     // OCULTAR MENSAJE BIENVENIDA
//     const welcomeContainer = document.querySelector("#welcomeContainer");
//     welcomeContainer.style.display = "none";

//     // MOSTRAR preguntas y respuestas
//     const questionContainer = document.querySelector("#playQuiz");
//     questionContainer.style.display = "block";

//     // MOSTRAR BOTÓN NEXT
//     nextButton.style.display = "block";
//   });

//   // VALIDACIÓN
//   nextButton.addEventListener("click", async function () {
//     const typeAnswer = document.querySelectorAll('input[type="radio"]:checked');
//     let correctResponses = [];
//     let incorrectResponses = [];
//     const questionsData = getQuestionsFromLocalStorage();
//     let points = [];

//     if (typeAnswer.length === 1) {
//       const selectedInput = typeAnswer[0];
//       const answer = selectedInput.value;

//       const currentQuestion = questionsData[questionIndex];

//       if (answer === currentQuestion.correctAnswer) {
//         selectedInput.parentNode.classList.add("correct");
//         correctResponses.push(answer);
//         score += 1;
//         // typeAnswer.style.backgroundColor;
//       } else {
//         selectedInput.parentNode.classList.add("incorrect");
//         incorrectResponses.push(answer);
//         correctResponses.push(currentQuestion);
//       }

//       console.log(score);

//       questionIndex++;

//       if (questionIndex < questionsData.length) {
//         showQuestion(questionsData, questionIndex);
//       } else {
//         const section = document.getElementById("question_quiz");
//         section.innerHTML = "¡HAS TERMINADO LAS PREGUNTAS DE QUIZZYWIZ!";
//         // OCULTAR BOTÓN NEXT
//         nextButton.style.display = "none";

//         //Imprimir resultado en pantalla

//         if (questionIndex === questionsData.length) {
//           const totalQuestions = questionsData.length;
//           const percentage = (score / totalQuestions) * 100;
//           const section1 = document.getElementById("results");
//           section1.innerHTML = `Has acertado el ${percentage}% de las preguntas`;
//         }
//         const game = {
//           // email local
//           user: "anonimo",
//           date: new Date(),
//           score: [],
//           result: correctResponses.length,
//         };
//         await saveResults(game);
//         db.collection("results")
//           .get()
//           .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//               console.log(doc.id, doc.data());
//               let data = doc.data();
//               // if(doc.user == ){
//               //   points = doc.score
//               // }
//             });
//           })
//           .catch((error) => {
//             console.log("Error getting documents: ", error);
//           });

//         //GRÁFICA

//         new Chartist.Bar("#chart2", {
//           labels: [...user],
//           series: [score],
//         });
//       }
//     } else {
//       // SI NO HA SIDO SELECCIONADA NINGUNA RESPUESTA
//       alert("Tienes que elegir alguna respuesta");
//     }
//     if (questionIndex === questionsData.length) {
//       // NOTA RESULTADO
//       const totalQuestions = questionsData.length;
//       const percentage = (correctResponses.length / totalQuestions) * 100;
//       return percentage;
//     }
//   });
// });

// // MOSTRAR LAS PREGUNTAS Y RESPUESTAS
// function showQuestion(questions, index) {
//   let section = document.getElementById("question_quiz");
//   let question = questions[index];
//   //Respuestas orden aleatorio
//   let mixedAnswers = [question.correctAnswer, ...question.incorrectAnswers];
//   mixedAnswers.sort(() => Math.random() - 0.5);

//   let arrTemplateString = `
//     <h3 class="pregunta">${question.question}</h3>
//     <label><input type="radio" value="${mixedAnswers[0]}" name="res" required>${mixedAnswers[0]}</label>
//     <label><input type="radio" value="${mixedAnswers[1]}" name="res" required>${mixedAnswers[1]}</label>
//     <label><input type="radio" value="${mixedAnswers[2]}" name="res" required>${mixedAnswers[2]}</label>
//     <label><input type="radio" value="${mixedAnswers[3]}" name="res" required>${mixedAnswers[3]}</label>
//   `;
//   section.innerHTML = arrTemplateString;
// }

// function getQuestionsFromLocalStorage() {
//   let questionsData = localStorage.getItem("questionsData");
//   if (questionsData) {
//     return JSON.parse(questionsData);
//   }
//   return null;
// }

// // ***** CONSEGUIR DEJAR SELECIONADA UNA RESPUESTA CON EL COLOR ****** //

// // ***** CONSEGUIR DEJAR SELECIONADA UNA RESPUESTA CON EL COLOR ****** //

// function answersFromLocalStorage() {
//   let answerFal = localStorage.getItem("answerFalse");
//   if (answerFal) {
//     return JSON.parse(answerFal);
//   }
//   return null;
// }
// // *********    FALTA VERIFICAR LAS RESPUESTAS ************ //

// // ***** CONSEGUIR DEJAR SELECIONADA UNA RESPUESTA CON EL COLOR ****** //

// // FUNCIONALIDAD LOGINimport { getDatabase, ref, onValue } from "firebase/database";

// // var username = (snapshot.val() && snapshot.val().username) || "Anonymous";
// // ...

// const saveResults = async (result) => {
//   await db
//     .collection("results")
//     .add(result)
//     .then((docRef) => console.log("Document written with ID: ", docRef.id))
//     .catch((error) => console.error("Error adding document: ", error));
// };

// const createUser = async (user) => {
//   await db
//     .collection("quizII")
//     .add(user)
//     .then((docRef) => console.log("Document written with ID: ", docRef.id))
//     .catch((error) => console.error("Error adding document: ", error));
// };

// const readAllUsers = (born) => {
//   db.collection("quizII")
//     .where("first", "==", born)
//     .get(user)
//     .then((querySnapshot) => {
//       querySnapshot.forEach((user) => {
//         console.log(user.data());
//       });
//     });
// };

// const signUpUser = (email, password) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       let user = userCredential.user;
//       alert(`Se ha registrado ${user.email} en el sistema`);
//       createUser({
//         id: user.uid,
//         email: user.email,
//         message: "hola!",
//       });
//     })
//     .catch((error) => {
//       console.log("Error en el sistema" + error.message);
//     });
// };

// const signInUser = (email, password) => {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       let user = userCredential.user;
//       alert(`Se ha logueado correctamente ${user.email}`);
//       console.log("USER", user);
//       window.location.href = "./quiz.html";
//     })
//     .catch((error) => {
//       let errorCode = error.code;
//       let errorMessage = error.message;
//       console.log(errorCode);
//       console.log(errorMessage);
//       alert(`Error en usuario o contraseña`);
//     });
// };

// // document.getElementById("form1").addEventListener("submit", function (event) {
// //   event.preventDefault();
// //   let email = event.target.elements.email.value;
// //   let pass = event.target.elements.pass.value;
// //   let pass2 = event.target.elements.pass2.value;

// //   pass === pass2
// //     ? signUpUser(email, pass)
// //     : alert("Las contraseñas no coinciden");
// // });

// // const signOut = () => {
// //   let user = firebase.auth().currentUser;

// //   firebase
// //     .auth()
// //     .signOut()
// //     .then(() => {
// //       console.log("Sale del sistema: " + user.email);
// //     })
// //     .catch((error) => {
// //       console.log("Hubo un error: " + error);
// //     });
// // };

// // document.getElementById("form2").addEventListener("submit", function (event) {
// //   event.preventDefault();
// //   let email = event.target.elements.email2.value;
// //   let pass = event.target.elements.pass3.value;
// //   signInUser(email, pass);
// // });

// // firebase.auth().onAuthStateChanged(function (user) {
// //   if (user) {
// //     console.log(`Está en el sistema:${user.email} ${user.uid}`);
// //   } else {
// //     console.log("No hay usuarios en el sistema");
// //   }
// // });

// cambiar crea el documento del usuario en la base datos, cuando te registras, score vacio
// cuando se hace login guardar el email en localoStorage.
// cuando termina el quiz actualizar el documento del usuario con el score---mirar si se puede en firebase-- metodo para actualizar un objeto en concreto.
// tenemos el score para grafica
