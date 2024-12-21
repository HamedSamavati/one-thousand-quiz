import {
  reloadFromLocalStorage,
  saveHandler,
  saveBtn,
  finalScore,
} from "./utils.js";

saveBtn.addEventListener("click", saveHandler);
let userScore = reloadFromLocalStorage("score");
finalScore.textContent = userScore;
