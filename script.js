// Variables
var timeRemaining = 75; // Set this to the starting time
var currentQuestionIndex = 0;
var startButton = document.getElementById('startButton');
var questions = [
  // Add your questions here. Still needs correct answers
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "strings"
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "quotes"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "curly brackets"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"
  },
];

// Function to start the quiz
function startQuiz() {
  // Start the timer
  var timer = setInterval(function() {
    timeRemaining--;
    // Update the timer in the UI
    if (timeRemaining <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  // Present the first question
  presentQuestion();
}

// Function to present a question
function presentQuestion() {
  // Get the current question
  var currentQuestion = questions[currentQuestionIndex];

  // Present the current question to the user
  // This will depend on your HTML structure

  // When a question is answered, present the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    presentQuestion();
  } else {
    // End the quiz if there are no more questions
    clearInterval(timer);
    endGame();
  }
}

// Function to handle answer selection
function selectAnswer(answer) {
  // Check if the selected answer is correct
  var currentQuestion = questions[currentQuestionIndex];
  if (answer !== currentQuestion.correctAnswer) {
    // If the answer is incorrect, subtract time
    timeRemaining -= 10;
  }
}

// Function to end the game
function endGame() {
  // Allow the user to save their initials and score
  // This will depend on your HTML structure
}

// Add an event listener to the start button
startButton.addEventListener('click', startQuiz);