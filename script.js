let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
let questionDisplay = document.getElementById("question");
let timeDisplay = document.getElementById("timeDisplay");
let leaderBoard = document.getElementById("leaderBoard");
let quiz = document.getElementById("quiz");
let submitScore = document.getElementById("submitScore");
let submitScoreBtn = document.getElementById("submitScoreBtn");
let scoresDisplay = document.getElementById("scores");
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts",
      },
      {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: "parenthesis",
      },
      {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above",
      },
      {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correct: "quotes",
      },
      {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log",
      },
]
let question;
let timer;
let timeLeft = 75; 

function startQuiz() {
    document.getElementById("startButton").style.display = "none";
    document.querySelector(".answers").style.display = "block";
    timeDisplay.textContent = "Time:" + timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        timeDisplay.textContent = "Time:" + timeLeft;
        if (timeLeft <= 0) {
            showScore();
        }
    }, 1000);
    displayQuestion();
}

function displayQuestion() {
    question = questions[Math.floor(Math.random() * questions.length)];
    questionDisplay.textContent = question.question;

    for (let i = 0; i < question.answers.length; i++) {
        let btn = document.getElementById("btn" + (i + 1));
        btn.textContent = question.answers[i];
        btn.addEventListener("click", checkAnswer);
    }
}

function checkAnswer() {
    correctDisplay.style.display = "none";
    wrongDisplay.style.display = "none";
    if (question.correct === this.textContent) {
        correctDisplay.style.display = "block";
    } else {
        wrongDisplay.style.display = "block";
        timeLeft -= 10; 
    }
    // remove question from array
    questions.splice(questions.indexOf(question), 1);
    if (questions.length === 0) {
        // quiz is over if no more questions left
        showScore();
    }
    // displays a new question
    displayQuestion();
}

function showScore() {
    clearInterval(timer);
    document.querySelector("#userScore").innerHTML = "Your final score is " + timeLeft;
    submitScore.style.display = "flex";
    quiz.style.display = "none";
}

function showLeaderBoard() {
    clearInterval(timer);
    quiz.style.display = "none";
    submitScore.style.display = "none";
    leaderBoard.style.display = "flex";
    let scores = JSON.parse(localStorage.getItem("scores"));
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    scoresDisplay.innerHTML = "";
    for (let score of scores) {
        let li = document.createElement("li");
        li.textContent = score.initials + " : " + score.score;
        scoresDisplay.appendChild(li);
    }
}

function startScreen () {
    window.location.reload();
}

function resetLeaderBoard() {
    localStorage.removeItem("scores");
    scoresDisplay.innerHTML = "";
}

submitScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let score = {
        score: timeLeft,
        initials: document.getElementById("initials").value
    }
    let scores = JSON.parse(localStorage.getItem("scores"));
    if (scores === null) {
        scores = [];
    }
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
    showLeaderBoard();
});