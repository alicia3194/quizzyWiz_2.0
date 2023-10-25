const firebaseConfig = {
  apiKey: "AIzaSyDlsqX9gEU6ToguhB0yuc1kKTtU93kcBMA",
  authDomain: "quizii-84a42.firebaseapp.com",
  projectId: "quizii-84a42",
  storageBucket: "quizii-84a42.appspot.com",
  messagingSenderId: "201517071704",
  appId: "1:201517071704:web:f18386349818ced992f92d",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const nextButton = document.getElementById("nextButton");

  let questionIndex = 0;
  let score = 0;
  let correctResponses = [];

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

      localStorage.setItem("questionsData", JSON.stringify(getInfo));
      showQuestion(getInfo, questionIndex);
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
    }
  }

  startButton.addEventListener("click", function () {
    getQuestionsApi();
    startButton.style.display = "none";
    const welcomeContainer = document.querySelector("#welcomeContainer");
    welcomeContainer.style.display = "none";
    const questionContainer = document.querySelector("#playQuiz");
    questionContainer.style.display = "block";

    nextButton.style.display = "block";
  });

  nextButton.addEventListener("click", async function () {
    const typeAnswer = document.querySelectorAll('input[type="radio"]:checked');

    if (typeAnswer.length === 1) {
      const selectedInput = typeAnswer[0];
      const answer = selectedInput.value;

      const currentQuestion = getQuestionsFromLocalStorage()[questionIndex];
      const totalQuestions = getQuestionsFromLocalStorage().length;

      if (answer === currentQuestion.correctAnswer) {
        selectedInput.parentNode.classList.add("correct");
        score += 1;
        correctResponses.push(answer);
      } else {
        selectedInput.parentNode.classList.add("incorrect");
      }

      questionIndex++;

      if (questionIndex < totalQuestions) {
        showQuestion(getQuestionsFromLocalStorage(), questionIndex);
      } else {
        const section = document.getElementById("question_quiz");
        section.innerHTML = "¡HAS TERMINADO LAS PREGUNTAS DE QUIZZYWIZ!";
        nextButton.style.display = "none";

        if (questionIndex === totalQuestions) {
          const percentage = (score / totalQuestions) * 100;
          const section1 = document.getElementById("results");
          section1.innerHTML = `Has acertado el ${percentage}% de las preguntas`;
          createChart();

          const user = firebase.auth().currentUser;

          const game = {
            user: user.l,
            date: new Date(),
            result: correctResponses.length,
          };
          await saveResults(game);
          await getDataFromFirebase();
        }
      }
    } else {
      alert("Tienes que elegir alguna respuesta");
    }
  });

  function showQuestion(questions, index) {
    let section = document.getElementById("question_quiz");
    let question = questions[index];
    // Respuestas orden aleatorio
    let mixedAnswers = [question.correctAnswer, ...question.incorrectAnswers];
    mixedAnswers.sort(() => Math.random() - 0.5);

    let arrTemplateString = `
                <h3 class="pregunta">${question.question}</h3>
                <label><input type="radio" value="${mixedAnswers[0]}" name="res" required>${mixedAnswers[0]}</label>
                <label><input type="radio" value="${mixedAnswers[1]}" name="res" required>${mixedAnswers[1]}</label>
                <label><input type="radio" value="${mixedAnswers[2]}" name="res" required>${mixedAnswers[2]}</label>
                <label><input type="radio" value="${mixedAnswers[3]}" name="res" required>${mixedAnswers[3]}</label>
            `;
    section.innerHTML = arrTemplateString;
  }

  function getQuestionsFromLocalStorage() {
    let questionsData = localStorage.getItem("questionsData");
    if (questionsData) {
      return JSON.parse(questionsData);
    }
    return null;
  }

  // MIRAR AUTH

  const saveResults = async (result) => {
    console.log("Valores que se van a guardar en Firestore:", result);
    await db
      .collection("quizII")
      .add(result)
      .then((docRef) => console.log("Document written with ID: ", docRef.id))
      .catch((error) => console.error("Error adding document: ", error));
  };
});

const createUser = (user) => {
  db.collection("quizII")
    .add(user)
    .then((docRef) => console.log("Document written with ID: ", docRef.id))
    .catch((error) => console.error("Error adding document: ", error));
};

const readAllUsers = (born) => {
  db.collection("quizII")
    .where("first", "==", born)
    .get(user)
    .then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        console.log(user.data());
      });
    });
};

const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      alert(`Se ha registrado ${user.email} en el sistema`);
      createUser(game);
    })
    .catch((error) => {
      console.log("Error en el sistema" + error.message);
    });
};

const signInUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      alert(`Se ha logueado correctamente ${user.email}`);
      console.log("USER", user);
      window.location.href = "./quiz.html";
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(`Error en usuario o contraseña`);
    });
};
document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();

  if (
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      event.target.elements.email.value
    )
  ) {
    var email = event.target.elements.email.value;
  } else {
    alert("prueba con otra dirección email,formato no válido");
  }

  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(
      event.target.elements.pass.value
    )
  ) {
    var pass = event.target.elements.pass.value;
    //contraseña Caracola1!
  } else {
    alert("prueba con otra contraseña,formato no válido");
  }

  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(
      event.target.elements.pass2.value
    )
  ) {
    var pass2 = event.target.elements.pass2.value;
  }

  pass === pass2
    ? signUpUser(email, pass)
    : alert("Las contraseñas no coinciden");
});

document.getElementById("form2").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email, pass);
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(`Está en el sistema:${user.email} ${user.uid}`);
  } else {
    console.log("No hay usuarios en el sistema");
  }
});

const signOut = () => {
  let user = firebase.auth().currentUser;

  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sale del sistema: " + user.email);
    })
    .catch((error) => {
      console.log("Hubo un error: " + error);
    });
};

const firebaseDataCollection = db.collection("quizII");
async function getDataFromFirebase() {
  try {
    const data = [];
    const querySnapshot = await firebaseDataCollection.get();

    querySnapshot.forEach((doc) => {
      const gameData = doc.data();
      if (typeof gameData.date === "string") {
        gameData.date = new Date(gameData.date);
      }

      if (gameData.date instanceof Date) {
        data.push({
          date: gameData.date,
          result: gameData.result || 0,
        });
      }
    });

    if (data.length > 0) {
      createChart(data);
    } else {
      console.log("No se encontraron datos válidos para crear el gráfico.");
    }
  } catch (error) {
    console.log("Error al obtener datos de Firebase: ", error);
  }
}

function createChart(data) {
  const validData = data.filter((game) => game.date instanceof Date);
  const dates = validData.map((game) => game.date.toDate());
  const scores = validData.map((game) => game.score);

  var chartData = {
    labels: dates,
    series: [scores],
  };

  var chartOptions = {
    width: "100%",
    height: 800,
    high: Math.max(...scores),
    low: 0,
    axisY: {
      onlyInteger: true,
      offset: 20,
    },
    chartPadding: {
      top: 50,
      right: 100,
      bottom: 1,
      left: 100,
    },
  };

  var responsiveOptions = [
    [
      "screen and (min-width: 641px)and (max-width: 1024px)",
      {
        showPoint: false,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value.slice(0, 10);
          },
        },
        chartPadding: {
          top: 50,
          right: 100,
          bottom: 1,
          left: 100,
        },
      },
    ],
    [
      "screen and (max-width: 640px)",
      {
        showLine: false,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value.slice(0, 10);
          },
        },
        chartPadding: {
          top: 50,
          right: 10,
          bottom: 10,
          left: 10,
        },
      },
    ],
  ];

  const chartContainer = document.getElementById("chart2");

  if (data && data.length > 0) {
    new Chartist.Line(chartContainer, chartData, chartOptions);
  } else {
    chartContainer.innerHTML =
      "No hay datos disponibles para crear el gráfico.";
  }
}

getFirebaseData().then((data) => {
  createChart(data);
});
