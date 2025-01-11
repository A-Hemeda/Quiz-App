import { questions, questionsContainer, currentQuiz } from "./index.js";

export default class Questions {
  // !What a class has?
  // !What a class can do??
  constructor(index) {
    // question, correct,incorrect, answer??
    this.index = index;
    this.question = questions[index].question;
    this.correct = questions[index].correct_answer;
    this.incorrect = questions[index].incorrect_answers;
    this.category = questions[index].category;
    this.allAnswer = this.shuffleAnswer();
    this.answered = false;
  }
  shuffleAnswer() {
    // [z,a,c,y] => [a,c,y,z]
    return this.incorrect.concat(this.correct).sort();
  }
  displayQuestion() {
    let questionMarkUP = `
    <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions"> ${this.index + 1} of ${
      questions.length
    } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allAnswer.map((choise) => `<li>${choise}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold">
        <i class="bi bi-emoji-laughing"></i> 
        Score: ${currentQuiz.score}
      </h2>        
    </div>
`;
    questionsContainer.innerHTML = questionMarkUP;

    const allChoise = document.querySelectorAll(".choices");
    allChoise.forEach((choise) => {
      choise.addEventListener("click", (eventInfo) => {
        this.checkAnswer(eventInfo);
      });
    });
  }
  checkAnswer(eventInfo) {
    if (!this.answered) {
      this.answered = true;
      if (this.correct === eventInfo.target.innerHTML) {
        eventInfo.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        currentQuiz.score++;
      } else {
        eventInfo.target.classList.add(
          "wrong",
          "animate__animated",
          "animate__shakeX"
        );
      }
      this.animatedQuestion(eventInfo.target)
    }
  }

  getNextQuestion(){
    this.index++;
    if (this.index < questions.length) {
        const nextQuestions = new Questions(this.index)
        nextQuestions.displayQuestion()
        return;
    }
    // console.log('end Questions');
    questionsContainer.innerHTML = currentQuiz.endQuiz();
    const tryAgain = document.querySelector('.again')
    tryAgain.addEventListener('click', function(){
        window.location.reload()
    })
  }

  animatedQuestion(elemet){
    setTimeout(()=>{
        elemet.closest('.question').classList.add('animate__animated', 'animate__bounceOutLeft')
        setTimeout(()=> {this.getNextQuestion()}, 1000)
    },500)
  }


}
