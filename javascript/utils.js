const quantity = 20;
// const level = localStorage.getItem("difficulty");
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
    if (levelBtn.classList.contains("active") && levelBtn !== event.target) {
      levelBtn.classList.toggle("active");
    }
  });
  if (!event.target.classList.contains("active"))
    event.target.classList.toggle("active");
  saveToLocalStorage("difficulty", `${targetText.toLowerCase()}`);
  reloadQuestions();
}

const chooseRandomBtn = () => {
  const randomDigit = (Math.random() * 10) % 4;
  return Math.floor(randomDigit);
};

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

async function reloadQuestions() {
  try {
    const questions = await getQuestions();
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
    if (index === correctIndex) {
      answerTags[index].style.background = "green";
    } else {
      answerTags[index].style.background = "red";
    }
    answerTags[index].disabled = true;
  }
}

function resetAnswerbtns() {
  answerTags.forEach((btn) => {
    btn.style.background = "white";
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

function relaodNextQuestion() {
  const questions = reloadFromLocalStorage("questions");
  resetAnswerbtns();
  if (questionNumber === 21) {
    finishHandler();
    return;
  }
  questionNumberTag.textContent = questionNumber;
  score = reloadFromLocalStorage("score");
  scoreTag.textContent = score;
  questionTag.innerHTML = questions[questionNumber - 1].question;
  let correctAnswerBtnIndex = chooseRandomBtn();
  saveToLocalStorage("correctAns", correctAnswerBtnIndex);
  let incorrectIndex = 0;
  for (let index = 0; index < answerTags.length; index++) {
    if (index === correctAnswerBtnIndex) {
      answerTags[index].innerHTML =
        questions[questionNumber - 1].correct_answer;
    } else {
      answerTags[index].innerHTML =
        questions[questionNumber - 1].incorrect_answers[incorrectIndex++];
    }
  }
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
};

export {
  chooseLevelHandler,
  chooseRandomBtn,
  getQuestions,
  saveToLocalStorage,
  reloadFromLocalStorage,
  reloadQuestions,
  chooseAnswerHandler,
  resetAnswerbtns,
  relaodNextQuestion,
  saveHandler,
  quantity,
  level,
  apiUrl,
  nameInput,
  questionNumberTag,
  scoreTag,
  levelBtns,
  questionTag,
  answerTag1,
  answerTag2,
  answerTag3,
  answerTag4,
  answerTags,
  nextBtn,
  saveBtn,
  finalScore,
  questionNumber,
  score,
};
