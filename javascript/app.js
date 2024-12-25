import {
  saveToLocalStorage,
  reloadFromLocalStorage,
  reloadQuestions,
} from "./utils.js";

function startHome() {
  let score = reloadFromLocalStorage("score");
  if (score === null || score !== 0) {
    saveToLocalStorage("score", 0);
    score = reloadFromLocalStorage("score");
  }
  let difficulty = reloadFromLocalStorage("difficulty");
  if (difficulty === null) {
    saveToLocalStorage("difficulty", "medium");
  }
  reloadQuestions();
}
startHome();
