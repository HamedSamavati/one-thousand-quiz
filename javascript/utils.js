const quantity = 20;
const level = reloadFromLocalStorage("difficulty");
const apiUrl = `https://opentdb.com/api.php?amount=${quantity}&category=18&difficulty=${level}&type=multiple`;
const nameInput = document.getElementById("name-input");
const levelBtns = document.querySelectorAll(".level-btn");
const questionNumberTag = document.querySelector("#question-h span");
const scoreTag = document.querySelector("#score-board span");
const questionTag = document.querySelector("#game-main h2");
const answerTag1 = document.getElementById("answer-1");
const answerTag2 = document.getElementById("answer-2");
const answerTag3 = document.getElementById("answer-3");
const answerTag4 = document.getElementById("answer-4");
const answerTags = [answerTag1, answerTag2, answerTag3, answerTag4];
const nextBtn = document.getElementById("next");
const saveBtn = document.getElementById("saveBtn");
const finalScore = document.querySelector("#final-score");
const gameOver = document.getElementById("game-over");
const gameOverInfo = document.getElementById("game-over-info");

let questionNumber = 1;
var score = 0;

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
  console.log(questionData);
  let formated = questionData.map((item) => {
    const questionObj = { question: item.question };
    let answers = [...item.incorrect_answers];
    const CorrectAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(CorrectAnswerIndex, 0, item.correct_answer);
    questionObj.answers = answers;
    questionObj.correctIndex = CorrectAnswerIndex;
    return questionObj;
  });
  console.log(formated);
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

function chooseAnswerHandler(event) {
  const correctIndex = reloadFromLocalStorage("correctAns");
  if (answerTags[correctIndex] === event.target) {
    score = reloadFromLocalStorage("score");
    score += 10;
    saveToLocalStorage("score", score);
    scoreTag.textContent = score;
  }
  for (let index = 0; index < answerTags.length; index++) {
    index === correctIndex
      ? (answerTags[index].style.background = "#2ec4b6")
      : (answerTags[index].style.background = "#ef233c");
    answerTags[index].disabled = true;
  }
}

function resetAnswerBtns() {
  answerTags.forEach((btn) => {
    btn.style.background = "#ffffff";
    btn.disabled = false;
  });
}

const finishHandler = () => {
  const userScore = reloadFromLocalStorage("score");
  const text = `You score is ${userScore}`;
  gameOverInfo.innerHTML = text;
  gameOver.style.visibility = "visible";
  console.log(gameOver);
};

function showQuestion() {
  const questions = reloadFromLocalStorage("questions");
  questionTag.innerHTML = questions[questionNumber - 1].question;
  let correctAnswerBtnIndex = questions[questionNumber - 1].correctIndex;
  saveToLocalStorage("correctAns", correctAnswerBtnIndex);
  for (let index = 0; index < answerTags.length; index++) {
    answerTags[index].innerHTML = questions[questionNumber - 1].answers[index];
  }
}

function relaodNextQuestion() {
  resetAnswerBtns();
  if (questionNumber === 21) {
    finishHandler();
    return;
  }
  questionNumberTag.textContent = questionNumber;
  score = reloadFromLocalStorage("score");
  scoreTag.textContent = score;
  showQuestion();
  answerTags.forEach((answerTag) => {
    answerTag.addEventListener("click", chooseAnswerHandler);
  });
  questionNumber++;
}

const saveHandler = () => {
  let scoresList = reloadFromLocalStorage("scoresList");
  console.log(scoresList);
  if (scoresList === null) {
    scoresList = [];
    saveToLocalStorage("scoresList", scoresList);
  }
  console.log(scoresList);
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
  levelBtns,
  nextBtn,
  saveBtn,
  finalScore,
};
// export {
//   formatQuestions,
//   chooseLevelHandler,
//   chooseRandomBtn,
//   getQuestions,
//   saveToLocalStorage,
//   reloadFromLocalStorage,
//   reloadQuestions,
//   chooseAnswerHandler,
//   relaodNextQuestion,
//   saveHandler,
//   quantity,
//   level,
//   apiUrl,
//   nameInput,
//   questionNumberTag,
//   scoreTag,
//   levelBtns,
//   questionTag,
//   answerTag1,
//   answerTag2,
//   answerTag3,
//   answerTag4,
//   answerTags,
//   nextBtn,
//   saveBtn,
//   finalScore,
//   questionNumber,
//   score,
// };
