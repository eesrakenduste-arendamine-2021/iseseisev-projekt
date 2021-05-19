let timer = 90;
let runningTimer;
let easyTimer = 90;
let hardTimer = 45;
let score = 0;
let username = "";
let qNumber;
let finalScore;
const MAX_HIGH_SCORES = 10;

const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const selectedLevel = document.getElementById("selectedLevel");
const highScoresButton = document.getElementById("showScoresButton");
const easy = document.getElementById("easy");
const hard = document.getElementById("hard");


let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);
hard.addEventListener("click", startHardClock);
easy.addEventListener("click", startEasyClock);

function startGame() {
  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  selectedLevel.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  selectedLevel.innerHTML = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}

//küsimuste näitamine
function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

//timeri käivitamine
function startHardClock(){
  selectedLevel.classList.remove("hide");
  selectedLevel.innerHTML = 'Valitud on raske level';
  countdown.innerHTML = "Aega on jäänud: " + hardTimer + "s";
  if (hardTimer <= 0){
    gameOver();
  } else {
    hardTimer -= 1;
    runningTimer = setTimeout(startHardClock, 1000);
  }
}

function startEasyClock() {
  selectedLevel.classList.remove("hide");
  selectedLevel.innerHTML = 'Valitud on lihtne level';
  countdown.innerHTML = "Aega jäänud: " + easyTimer + "s";
  if (easyTimer <= 0) {
    gameOver();
  } else {
    easyTimer -= 1;
    runningTimer = setTimeout(startEasyClock, 1000);
  }
}

//vastuste collectimine
function selectAnswer(e) {
  const selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timer = timer - 10;
    console.log(timer);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}

function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//mäng läbi
function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Mängu lõpp!";
  clearQuestion();
  showResults();
  startButton.innerText = "Mängi uuesti";
  startButton.classList.remove("hide");
  easyTimer = 90;
  hardTimer = 45;
  score = 0;
}

function showResults() {
  finalScore = timer;
  if (finalScore < 0) {
    finalScore = 0;
  }
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `Sinu tulemus on ${finalScore}!<div id="init">Nimi: <input type="text" name="initials" id="initials" placeholder="Sisesta oma nimi"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Salvesta</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
}

//tulemuste submittimine
function submitScores(e) {
  const score = {
    score: finalScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}

//tulemuste näitamine edetabelis
function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h2>Edetabel top10</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Kustuta edetabel</button>`;
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="scoresList">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}

//edetabeli kustutamine
function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3>Edetabel on edukalt kustutatud!</h3>";
  document.getElementById("clearScores").classList.add("hide");
}


const questions = [
  {
    question: "Mitu õppekava on Tallinna Ülikoolis?",
    answers: [
      { text: "100", correct: false },
      { text: "116", correct: true },
      { text: "90", correct: false },
      { text: "77", correct: false }
    ]
  },
  {
    question: "Mida tähistab lühend TLÜ?",
    answers: [
      { text: "Tartu Ülikool", correct: false },
      { text: "Tallinna Tehnikakõrgkool", correct: false },
      { text: "Tallinna Tehnikaülikool", correct: false },
      { text: "Tallinna Üliool", correct: true }
    ]
  },
  {
    question: "Kas Tallina Ülikooli linnakus on olemas jalgrattaparklad?",
    answers: [
      { text: "Ei", correct: false },
      { text: "Jah", correct: true }
    ]
  },
  {
    question: 'Tallinna Üikool on suuruselt ... avalik-õiguslik ülikool Eestis',
    answers: [
      { text: 'teine', correct: false },
      { text: 'neljas', correct: false },
      { text: 'kuues', correct: false },
      { text: 'kolmas', correct: true }
    ]
  },
  {
    question: "Kus kohas asub Tallinna Ülikooli ainuke kolledž?",
    answers: [
      { text: "Haapsalus", correct: true },
      { text: "Pärnus", correct: false },
      { text: "Paides", correct: false },
      { text: "Tartus", correct: false }
    ]
  },
  {
    question: 'Milline neist ei ole Tallinna Ülikooli linnakus olev hoone nimi?',
    answers: [
      { text: "Mare", correct: false },
      { text: "Astra", correct: false },
      { text: "Mastra", correct: true },
      { text: "Nova", correct: false }
    ]
  },
  {
    question: "Milline neist on Terra maja aadress?",
    answers: [
      { text: "Narva mnt 25", correct: true },
      { text: "Uus-sadama 5", correct: false },
      { text: "Narva mnt 27", correct: false },
      { text: "Uud-sadama 8", correct: false }
    ]
  },
  {
    question: "Mida tähendab ladina keeles 'Mare'?",
    answers: [
      { text: "elu", correct: false },
      { text: "päike-soojus", correct: false },
      { text: "armastus-soojus", correct: false },
      { text: "meri-avastus", correct: true }
    ]
  },
  {
    question: "Milline neist on Tallinna Ülikooli postiaadress?",
    answers: [
      { text: "tallinn@ülikool.ee", correct: false },
      { text: "tallinna.ulikool@gmail.com", correct: false },
      { text: "tlu@tlu.ee", correct: true },
      { text: "info@tlu.ee", correct: false }
    ]
  }
];