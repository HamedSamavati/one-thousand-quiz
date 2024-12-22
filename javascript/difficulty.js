import { chooseLevelHandler, levelBtns } from "./utils.js";

const addEventToLevelBtns = () => {
  levelBtns.forEach((levelBtn) =>
    levelBtn.addEventListener("click", chooseLevelHandler)
  );
};

addEventToLevelBtns();
