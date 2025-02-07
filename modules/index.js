import { fetchData } from "./api.js";

const quizFormEl = document.querySelector(".quiz-form");

quizFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { results } = await fetchData();
  localStorage.setItem("questions", JSON.stringify(results));

  window.location.href = "game.html";
});
