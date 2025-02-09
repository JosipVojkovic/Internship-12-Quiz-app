function getQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions"));
  if (!questions || questions.length === 0) {
    console.error("Nema pitanja u LocalStorage!");
    return [];
  }
  return questions;
}

const questions = getQuestions();
console.log(questions);
let score = 0;
let questionCounter = 0;
let timerInterval = null;
let currentAnswerTimeout = null;

function shuffleAnswers(correctAnswer, incorrectAnswers) {
  const answers = [...incorrectAnswers];
  const randomIndex = Math.floor(Math.random() * (answers.length + 1));
  answers.splice(randomIndex, 0, correctAnswer);
  return answers;
}

function displayQuestion(questionData) {
  if (currentAnswerTimeout) {
    clearTimeout(currentAnswerTimeout);
    currentAnswerTimeout = null;
  }

  let scoreEl = document.querySelector(".score");
  scoreEl.textContent = "Score: " + score + "/" + questionCounter;

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
    const isCorrectEl = document.querySelector(".isCorrect");
    isCorrectEl.style.display = "none";
    document.querySelector(".next-question").style.display = "none";

    const btn = document.createElement("button");
    btn.textContent = a;
    btn.classList.add("answer-button");

    btn.addEventListener("click", (event) => {
      const allBtns = document.querySelectorAll(".answers-container button");
      allBtns.forEach((b) => b.classList.remove("clicked-answer"));

      event.target.classList.add("clicked-answer");

      const clickedButton = event.target;
      const answerText = clickedButton.textContent;

      if (currentAnswerTimeout) clearTimeout(currentAnswerTimeout);

      currentAnswerTimeout = setTimeout(() => {
        const dialogEl = document.querySelector(".confirm-dialog");
        dialogEl.style.display = "flex";
        dialogEl.showModal();
        document.querySelector(
          ".confirm-dialog p"
        ).textContent = `Your answer: ${answerText}`;

        // Obrada odabira (isti kod kao prije, s promjenom na onclick umjesto addEventListener)
        const cancelBtnEl = document.querySelector(".cancel-btn");
        cancelBtnEl.onclick = () => {
          dialogEl.style.display = "none";
          dialogEl.close();
          clickedButton.classList.remove("clicked-answer");
        };

        const confirmBtnEl = document.querySelector(".confirm-btn");
        confirmBtnEl.onclick = () => {
          dialogEl.style.display = "none";
          dialogEl.close();
          clickedButton.classList.remove("clicked-answer");

          allBtns.forEach((b) => {
            b.classList.remove("answer-button");
            b.disabled = true;

            if (b.textContent === questions[questionCounter].correct_answer) {
              b.classList.add("correct-answer");
            } else if (b.textContent === answerText) {
              b.classList.add("incorrect-answer");
            }
          });

          if (answerText === questions[questionCounter].correct_answer) {
            finishedQuestion(true, false);
          } else {
            finishedQuestion(false, false);
          }

          clearInterval(timerInterval);
        };
      }, 2000);
    });
    answersContainerEl.appendChild(btn);
  });
}

function finishedQuestion(correctAnswer, timesUp) {
  const isCorrectEl = document.querySelector(".isCorrect");
  isCorrectEl.style.display = "block";
  document.querySelector(".next-question").style.display = "block";

  if (timesUp) {
    isCorrectEl.textContent = "Time's up!";
    isCorrectEl.style.color = "red"; // Postavljanje boje teksta na crveno
  } else if (correctAnswer) {
    score++;
    isCorrectEl.textContent = "Correct answer!";
    isCorrectEl.style.color = "green";
  } else {
    isCorrectEl.textContent = "Incorrect answer!";
    isCorrectEl.style.color = "red";
  }

  const scoreEl = document.querySelector(".score");
  scoreEl.textContent = `Score: ${score}/${questionCounter + 1}`;

  // Onemogući sve tipke nakon što je odgovor potvrđen ili vrijeme istekne
  const allBtns = document.querySelectorAll(".answers-container button");
  allBtns.forEach((b) => {
    b.disabled = true; // Disable svih tipki
  });
}

function startTimer(callback) {
  let stoppageTime = 20;
  const stoppageTimeEl = document.querySelector(".stoppage-time");

  // Resetiraj boje i stilove prije nego što pokreneš novi timer
  stoppageTimeEl.style.backgroundColor = "green";
  stoppageTimeEl.style.color = "black";
  stoppageTimeEl.classList.remove("timerAnimation");

  stoppageTimeEl.textContent = stoppageTime;

  // Očisti prethodni interval prije početka novog
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    stoppageTime--;
    stoppageTimeEl.textContent = stoppageTime;

    if (stoppageTime === 0) {
      clearInterval(timerInterval);
      console.log("Vrijeme isteklo!");

      // Zatvori dijalog ako je otvoren
      const dialogEl = document.querySelector(".confirm-dialog");
      if (dialogEl.style.display === "flex") {
        dialogEl.style.display = "none";
        dialogEl.close();
      }

      // Očisti pending timeout za odgovor
      if (currentAnswerTimeout) {
        clearTimeout(currentAnswerTimeout);
        currentAnswerTimeout = null;
      }

      // Onemogući sve odgovore ako je vrijeme isteklo
      const allBtns = document.querySelectorAll(".answers-container button");
      allBtns.forEach((b) => {
        b.disabled = true; // Disable svih tipki
      });

      callback(true); // Callback označava da je vrijeme isteklo
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

function displayFinalScore() {
  const finalScoreContainerEl = document.querySelector(
    ".final-score-container"
  );
  const gameContainerEl = document.querySelector(".game-container");
  const finalScoreEl = document.querySelector(".feedback h2");
  const finalScoreMessageEl = document.querySelector(".score-message");
  const backToMainMenuEl = document.querySelector(
    ".final-score-container button"
  );

  finalScoreContainerEl.style.display = "flex";
  gameContainerEl.style.display = "none";
  finalScoreEl.textContent =
    finalScoreEl.textContent + " " + score + "/" + questionCounter;

  if (score === 1) {
    finalScoreMessageEl.textContent =
      "Unfortunately, this wasn't a good performance. We recommend reviewing the material and trying again. Don't worry, learning is a process!";
  } else if (score === 2) {
    finalScoreMessageEl.textContent =
      "You're close, but there's still room for improvement. We recommend focusing on the areas you missed and trying again. Keep going!";
  } else if (score === 3) {
    finalScoreMessageEl.textContent =
      "Good start! You’ve passed, but there’s still room to improve. Think about the areas you can work on, and next time you’ll do even better!";
  } else if (score === 4) {
    finalScoreMessageEl.textContent =
      "Great job! You're getting closer to perfection. Congratulations on a job well done. Try again and you might achieve a perfect score!";
  } else {
    finalScoreMessageEl.textContent =
      "Excellent! You’ve achieved a perfect score! Congratulations on your outstanding performance. Keep up the great work!";
  }

  backToMainMenuEl.addEventListener("click", backToMainMenu);
}

function backToMainMenu() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({
    score,
    questionAmount: questions.length,
    difficulty: questions[0].difficulty,
    category: questions[0].category,
    date: new Date().toLocaleDateString("en-GB"),
  });

  localStorage.setItem("scores", JSON.stringify(scores));

  window.location.href = "index.html";
}

function loadQuestion(isTimesUp = false) {
  if (questionCounter >= questions.length) {
    console.log("Kviz je završen!");
    displayFinalScore();
    return;
  }

  // Ako je vrijeme isteklo, označi pitanje kao netočno
  if (isTimesUp) {
    finishedQuestion(false, true);
  }

  displayQuestion(questions[questionCounter]);
  startTimer((timesUp) => {
    if (timesUp) {
      finishedQuestion(false, true); // Ako je vrijeme isteklo, označi netočno
    }
  });
}

document.querySelector(".next-question").addEventListener("click", () => {
  questionCounter++;
  loadQuestion(); // Učitaj sljedeće pitanje
});

// Pokreni prvo pitanje
loadQuestion();
