import { relaodNextQuestion, nextBtn } from "./utils.js";

relaodNextQuestion();
nextBtn.addEventListener("click", relaodNextQuestion);
