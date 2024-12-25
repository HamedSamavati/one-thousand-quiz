const quantity = 20;
const level = reloadFromLocalStorage("difficulty");
const apiUrl = `https://opentdb.com/api.php?amount=${quantity}&category=9&difficulty=${level}&type=multiple`;
const nameInput = document.getElementById("name-input");
const levelBtns = document.querySelectorAll(".level-btn");
const questionNumberTag = document.querySelector("#question-h span");
const scoreTag = document.querySelector("#score-board span");
const questionTag = document.querySelector("#game-main h2");
const answerTags = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next");
const saveBtn = document.getElementById("saveBtn");
const finalScore = document.querySelector("#final-score");
const gameOver = document.getElementById("game-over");
const gameOverInfo = document.getElementById("game-over-info");
const BONUS = 10;

let questionNumber = 1;
let score = 0;

function chooseLevelHandler(event) {
  const targetText = event.target.textContent;
  levelBtns.forEach((levelBtn) => {
    if (levelBtn.classList.contains("active") && levelBtn !== event.target)
      levelBtn.classList.toggle("active");
  });
  if (!event.target.classList.contains("active"))
    event.target.classList.toggle("active");
  saveToLocalStorage("difficulty", `${targetText.toLowerCase()}`);
}

function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log("data saved on the local storage successfully!");
  } catch (error) {
    console.error("Error saving to local storage! ", error);
  }
}

function reloadFromLocalStorage(key) {
  try {
    let data = localStorage.getItem(key);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.error("Error reloading from local storage", error);
  }
}

async function getQuestions() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    const question = await result.results;
    return question;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const formatQuestions = (questionData) => {
  let formated = questionData.map((item) => {
    const questionObj = { question: item.question };
    let answers = [...item.incorrect_answers];
    const CorrectAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(CorrectAnswerIndex, 0, item.correct_answer);
    questionObj.answers = answers;
    questionObj.correctIndex = CorrectAnswerIndex;
    return questionObj;
  });
  return formated;
};

async function reloadQuestions() {
  try {
    let questions = await getQuestions();
    questions = formatQuestions(questions);
    saveToLocalStorage("questions", questions);
  } catch (error) {
    console.error("Failed to fetch data from the server: ", error);
  }
}

function chooseAnswerHandler(event, index) {
  const correctIndex = reloadFromLocalStorage("correctAns");
  const isCorrect = index === correctIndex ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score = reloadFromLocalStorage("score");
    score += BONUS;
    saveToLocalStorage("score", score);
    scoreTag.textContent = score;
  } else {
    event.target.classList.add("incorrect");
    answerTags[correctIndex].classList.add("correct");
  }
  answerTags.forEach((btn) => (btn.disabled = true));
}

function resetAnswerBtns() {
  answerTags.forEach((btn) => {
    if (btn.classList.contains("correct")) {
      btn.classList.toggle("correct");
    } else if (btn.classList.contains("incorrect")) {
      btn.classList.toggle("incorrect");
    }
    btn.disabled = false;
  });
}

const finishHandler = () => {
  const userScore = reloadFromLocalStorage("score");
  const text = `You score is ${userScore}`;
  gameOverInfo.innerHTML = text;
  gameOver.style.visibility = "visible";
};

function showQuestion() {
  const questions = reloadFromLocalStorage("questions");
  const { question, answers, correctIndex } = questions[questionNumber - 1];
  saveToLocalStorage("correctAns", correctIndex);
  questionTag.innerHTML = question;
  answerTags.forEach((answerTag, index) => {
    answerTag.innerHTML = answers[index];
  });
}

function relaodNextQuestion() {
  resetAnswerBtns();
  const questions = reloadFromLocalStorage("questions");
  if (questionNumber > questions.length) {
    finishHandler();
    return;
  }
  questionNumberTag.textContent = questionNumber;
  score = reloadFromLocalStorage("score");
  scoreTag.textContent = score;
  showQuestion();
  questionNumber++;
}

const saveHandler = () => {
  let scoresList = reloadFromLocalStorage("scoresList");
  if (scoresList === null) {
    scoresList = [];
    saveToLocalStorage("scoresList", scoresList);
  }
  let newScore = {};
  const name = nameInput.value;
  nameInput.value = "";
  score = reloadFromLocalStorage("score");
  saveToLocalStorage("score", 0);
  if (name === null) {
    alert("please Enter a name to save your score!");
  } else {
    newScore = {
      userName: name,
      userScore: score,
    };
    const scoresList = reloadFromLocalStorage("scoresList");
    scoresList.push(newScore);
    saveToLocalStorage("scoresList", scoresList);
  }
  window.location.href = "scores.html";
};

export {
  chooseLevelHandler,
  saveToLocalStorage,
  reloadFromLocalStorage,
  reloadQuestions,
  relaodNextQuestion,
  saveHandler,
  chooseAnswerHandler,
  levelBtns,
  nextBtn,
  saveBtn,
  scoreTag,
  finalScore,
  answerTags,
};
