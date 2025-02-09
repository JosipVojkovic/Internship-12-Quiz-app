import { fetchData } from "./api.js";

const quizFormEl = document.querySelector(".quiz-form");
const scoresEl = document.querySelector(".scores");

quizFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { results } = await fetchData();
  localStorage.setItem("questions", JSON.stringify(results));
  localStorage.setItem("scores", JSON.stringify([]));

  window.location.href = "game.html";
});

scoresEl.addEventListener("click", () => {
  window.location.href = "scores.html";
});
