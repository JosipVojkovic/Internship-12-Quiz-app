const questions = JSON.parse(localStorage.getItem("questions"));

if (!questions) {
  console.error("Nema pitanja u LocalStorage!");
} else {
  console.log(questions);
}

const correctAnswer = questions[0].correct_answer;
const inccorectAnswers = questions[0].incorrect_answers;
const answers = [...inccorectAnswers];
const randomIndex = Math.floor(Math.random() * (answers.length + 1));
answers.splice(randomIndex, 0, correctAnswer);

console.log(answers);
