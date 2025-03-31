import {
  relaodNextQuestion,
  nextBtn,
  reloadQuestions,
  answerTags,
  chooseAnswerHandler,
  reloadFromLocalStorage,
  saveToLocalStorage,
  scoreTag,
} from "./utils.js";

const gameMain = document.getElementById("game-main");
const loader = document.getElementById("loader");
const playAgain = document.getElementById("play-again");

const start = () => {
  saveToLocalStorage("score", 0);
  scoreTag.innerText = 0;
  answerTags.forEach((answerTag, index) => {
    answerTag.addEventListener("click", (event) =>
      chooseAnswerHandler(event, index)
    );
  });
  loader.style.display = "none";
  gameMain.style.display = "block";
};

relaodNextQuestion();
start();

nextBtn.addEventListener("click", relaodNextQuestion);
