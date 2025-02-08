const questions = JSON.parse(localStorage.getItem("questions"));

if (!questions) {
  console.error("Nema pitanja u LocalStorage!");
} else {
  console.log(questions);
}

let questionCounter = 0;
const correctAnswer = questions[questionCounter].correct_answer;
const inccorectAnswers = questions[questionCounter].incorrect_answers;
const answers = [...inccorectAnswers];
const randomIndex = Math.floor(Math.random() * (answers.length + 1));
answers.splice(randomIndex, 0, correctAnswer);

console.log(answers);

document.querySelector(".question").textContent =
  questions[questionCounter].question;

const answersContainerEl = document.querySelector(".answers-container");

answers.forEach((a) => {
  const btn = document.createElement("button");
  btn.textContent = a;
  answersContainerEl.appendChild(btn);
});

let stoppageTime = 20;
const stoppageTimeEl = document.querySelector(".stoppage-time");
stoppageTimeEl.textContent = stoppageTime;
function startTimer() {
  const interval = setInterval(() => {
    stoppageTime--;
    stoppageTimeEl.textContent = stoppageTime;

    if (stoppageTime === 0) {
      clearInterval(interval);
      console.log("Vrijeme isteklo!");
    } else if (stoppageTime <= 5) {
      stoppageTimeEl.style.backgroundColor = "red";
      stoppageTimeEl.classList.add("timerAnimation");
    } else if (stoppageTime <= 10) {
      stoppageTimeEl.style.backgroundColor = "orange";
      stoppageTimeEl.style.color = "white";
    } else if (stoppageTime <= 15) {
      stoppageTimeEl.style.backgroundColor = "yellow";
      stoppageTimeEl.style.color = "black";
    }
  }, 1000);
}

startTimer();
