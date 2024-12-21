import {
  saveToLocalStorage,
  reloadFromLocalStorage,
  reloadQuestions,
} from "./utils.js";

let score = reloadFromLocalStorage("score");
if (score === null || score !== 0) {
  saveToLocalStorage("score", 0);
  score = reloadFromLocalStorage("score");
}

let difficulty = reloadFromLocalStorage("difficulty");
if (difficulty === null) {
  saveToLocalStorage("difficulty", "medium");
  console.log(reloadFromLocalStorage("difficulty"));
}
reloadQuestions();

saveToLocalStorage("score", score);
reloadQuestions();
// let questions = reloadFromLocalStorage("questions");
