import {
  reloadFromLocalStorage,
} from "./utils.js";

const usersRecords = document.querySelector("#users-records");

let id = 1;
let htmlCode = "";
const recordsList = reloadFromLocalStorage("scoresList");
recordsList.forEach((record) => {
  htmlCode += `
      <div class="user-score">
        <div>
          <p id="user-id" class="user-id">${id}</p>
          <p id="user-name" class="user-name">${record.userName}</p>
        </div>
        <div id="score" class="score">${record.userScore}</div>
      </div>
`;
  id++;
});
usersRecords.innerHTML = htmlCode;
console.log(usersRecords);
