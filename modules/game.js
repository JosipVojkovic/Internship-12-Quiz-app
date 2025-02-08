function getQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions"));
  if (!questions || questions.length === 0) {
    console.error("Nema pitanja u LocalStorage!");
    return [];
  }
  return questions;
}

const questions = getQuestions();
let questionCounter = 0;

function shuffleAnswers(correctAnswer, incorrectAnswers) {
  const answers = [...incorrectAnswers];
  const randomIndex = Math.floor(Math.random() * (answers.length + 1));
  answers.splice(randomIndex, 0, correctAnswer);
  return answers;
}

function displayQuestion(questionData) {
  document.querySelector(".question").textContent = questionData.question;
  document.querySelector(".question-container h3").textContent = `Question: ${
    questionCounter + 1
  }`;
  const answersContainerEl = document.querySelector(".answers-container");
  answersContainerEl.innerHTML = "";

  const answers = shuffleAnswers(
    questionData.correct_answer,
    questionData.incorrect_answers
  );

  answers.forEach((a) => {
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.addEventListener("click", (event) => {
      document
        .querySelectorAll(".answers-container button")
        .forEach((b) => b.classList.remove("clicked-answer"));
      event.target.classList.add("clicked-answer");
      const dialogEl = document.querySelector(".confirm-dialog");
      dialogEl.style.display = "flex";
      document.querySelector(
        ".confirm-dialog p"
      ).textContent = `Your answer: ${event.target.textContent}`;
    });
    answersContainerEl.appendChild(btn);
  });
}

function startTimer(callback) {
  let stoppageTime = 20;
  const stoppageTimeEl = document.querySelector(".stoppage-time");
  stoppageTimeEl.textContent = stoppageTime;

  const interval = setInterval(() => {
    stoppageTime--;
    stoppageTimeEl.textContent = stoppageTime;

    if (stoppageTime === 0) {
      clearInterval(interval);
      console.log("Vrijeme isteklo!");
      callback();
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

function loadQuestion() {
  if (questionCounter >= questions.length) {
    console.log("Kviz je završen!");
    return;
  }

  displayQuestion(questions[questionCounter]);

  startTimer(() => {
    questionCounter++;
  });
}

loadQuestion();
