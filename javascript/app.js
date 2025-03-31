import {
  saveToLocalStorage,
  reloadFromLocalStorage,
  reloadQuestions,
} from "./utils.js";

function startHome() {
  let score = reloadFromLocalStorage("score");
  if (score) {
    saveToLocalStorage("score", 0);
    score = reloadFromLocalStorage("score");
  }
  let difficulty = reloadFromLocalStorage("difficulty");
  saveToLocalStorage("difficulty", difficulty || "medium");
  reloadQuestions();
}
startHome();
