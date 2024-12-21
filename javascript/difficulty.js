import { chooseLevelHandler, levelBtns } from "./utils.js";

levelBtns.forEach((levelBtn) =>
  levelBtn.addEventListener("click", chooseLevelHandler)
);
