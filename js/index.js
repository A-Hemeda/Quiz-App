// https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multipl

import Questions from "./question.module.js";
import Quiz from "./quiz.module.js";

// ?===============> HTML Elemnts
 const categoryMenu = document.getElementById("categoryMenu"),
  difficultyOptions = document.getElementById("difficultyOptions"),
  questionsNumber = document.getElementById("questionsNumber"),
  startQuizBtn = document.getElementById("startQuiz"),
  quizOptions = document.getElementById("quizOptions");


export const questionsContainer = document.querySelector('.questions-container')
// console.log(categoryMenu,difficultyOptions,questionsNumber,startQuiz);
// *=======================> variable
export let questions = [];
export let currentQuiz = {}
// ~==================> Events
startQuizBtn.addEventListener("click", async function () {
  let category = categoryMenu.value,
    difficulty = difficultyOptions.value,
    amount = questionsNumber.value;

  console.log(category, difficulty, amount);
  currentQuiz = new Quiz(amount, category, difficulty);
  questions = await currentQuiz.getQuestions();
  console.log(questions);

  quizOptions.classList.replace("d-flex", "d-none");
  let firstQuestion = new Questions(0);
  firstQuestion.displayQuestion()
  console.log(firstQuestion);
});
