const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const header = document.getElementById('heading')
const right = document.getElementById('correct')
const wrong = document.getElementById('incorrect')
const startingMinutes = 2;
const countdownEl = document.getElementById('countdown')
let time = startingMinutes * 60;
let allQuestions, currentQuestionIndex
setInterval(countdowns, 1000)

startButton.addEventListener('click', startGame)

// This is the homescreen with the start button and the heading.
function homeScreen() {
    startButton.classList.remove('hide')
    startButton.addEventListener('click', startGame)
    header.classList.remove('hide')
    questionContainerElement.classList.add('hide')
}

// This is the timer.
var countdowns = function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
}

// This function will hide the heading and start button and begin the quiz. It also starts the timer.
function startGame() {
  startButton.classList.add('hide')
  header.classList.add('hide')
  allQuestions = questions
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  countdowns()
  setNextQuestion()
}

// This function will proceed with the questions
function setNextQuestion() {
  // resetState()
  clearStatusClass()
  showQuestion(allQuestions[currentQuestionIndex])
}

// This function will pull the next question and add buttons for the answers
function showQuestion(question) {
  questionElement.innerText = question.question
  answerButtonsElement.innerHTML = ""
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    console.log(button)
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)

  })
}

// This function will reset the answers for the next question in the quiz
function resetState() {
  clearStatusClass(document.body)
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// This function will take the selected answer and determine if correct or not. It will then move on with the quiz or reset it.
function selectAnswer(e) {
  console.log('select-answer')
  const selectedButton = e.target
  console.log("AAAAAAAAAAAA",selectedButton)
  const correct = selectedButton.dataset.correct
  console.log(correct)
  setStatusClass(correct)
  // Array.from(answerButtonsElement.children).forEach(button => {
  //   setStatusClass(button, button.dataset.correct)
  // })
  if (allQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++
        // setNextQuestion()
        setTimeout(setNextQuestion, 500);
  } else {
    homeScreen()
  }
}

function setStatusClass(correct) {
  if (correct) {
    right.classList.remove('hide')
      
  } else {
    wrong.classList.remove('hide')
  }
  //  clearStatusClass()
   
}

function clearStatusClass() {
  console.log("hello")

  right.classList.add('hide')
  wrong.classList.add('hide')
}

// These are the questions for the quiz which are pulled above.
const questions = [
  {
    question: 'The condition in an if / else statement is enclosed within ____.',
    answers: [
      { text: 'Quotes', correct: false },
      { text: 'Curly Brackets', correct: true },
      { text: 'Parentheses', correct: false },
      { text: 'Square Brackets', correct: false }
    ]
  },
  {
    question: 'Arrays in Javascript can be used to store _____.?',
    answers: [
      { text: 'Numbers and Strings', correct: false },
      { text: 'Other Arrays', correct: false },
      { text: 'Booleans', correct: false },
      { text: 'All the above', correct: true }
    ]
  },
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    answers: [
      { text: 'Commas', correct: false },
      { text: 'Curly Brackets', correct: false },
      { text: 'Quotes', correct: true },
      { text: 'Parentheses', correct: false }
    ]
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
      { text: 'Javascript', correct: false },
      { text: 'Terminal/Bash', correct: false },
      { text: 'For Loops', correct: false },
      { text: 'Console Log', correct: true }
    ]
  }
]