import { relaodNextQuestion, nextBtn, reloadQuestions } from "./utils.js";
const gameMain = document.getElementById("game-main");
const loader = document.getElementById("loader");

const start = () => {
  loader.style.display = "none";
  gameMain.style.display = "block";
};

reloadQuestions();
relaodNextQuestion();
start();

nextBtn.addEventListener("click", relaodNextQuestion);
