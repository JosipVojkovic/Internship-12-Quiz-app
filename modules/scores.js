const scores = JSON.parse(localStorage.getItem("scores")) || [];
const scoresTable = document.querySelector("#score-table");
const tableBody = document.querySelector("#score-table tbody");
const p = document.querySelector(".no-scores");

const mainMenuBtnEl = document.querySelector(".main-menu-btn");
mainMenuBtnEl.addEventListener("click", () => {
  window.location.href = "index.html";
});

if (scores.length < 1) {
  scoresTable.style.display = "none";
  p.textContent = "There is no scores yet!";
} else {
  p.style.display = "none";

  scores.forEach((s) => {
    const row = document.createElement("tr");

    const scoreCell = document.createElement("td");
    scoreCell.textContent = s.score + "/" + s.questionAmount;

    const difficultyCell = document.createElement("td");
    difficultyCell.textContent = s.difficulty;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = s.category;

    const dateCell = document.createElement("td");
    dateCell.textContent = s.date;

    row.appendChild(scoreCell);
    row.appendChild(difficultyCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);

    tableBody.appendChild(row);
  });
}
