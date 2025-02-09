const scores = JSON.parse(localStorage.getItem("scores")) || [];
const tableBody = document.querySelector("#score-table tbody");
console.log(scores);

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}${month}${year}`;
}

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
  });
}
