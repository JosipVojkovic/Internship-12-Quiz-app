const scores = JSON.parse(localStorage.getItem("scores")) || [];
const tableBody = document.querySelector("#score-table tbody");
console.log(scores);

if (scores.length < 1) {
  scoresList.style.display = "none";
  const p = document.createElement("p");
  p.textContent = "There is no scores yet!";

  document.querySelector(".scores-container").appendChild(p);
} else {
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

    const mainMenuBtnEl = document.querySelector(".main-menu-btn");
    mainMenuBtnEl.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });
}
