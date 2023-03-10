const startButton = document.getElementById('start')
var endTime;
const timeSpan = document.getElementById('time-remaining');
var timeInterval;
var highScores = [];
const quizName= document.getElementById('quizName');
const quizRules= document.getElementById('quizRules');


var questions = [
    {
        question: "What is the capital of France?",
        options: [
            "Paris",
            "London",
            "Berlin",
            "Madrid"
        ],
        answer: "Paris"
    },
    {
        question: "What is the capital of Germany?",
        options: [
            "Paris",
            "London",
            "Berlin",
            "Madrid"
        ],
        answer: "Berlin"

    },
    {
        question: "What is the capital of Spain?",
        options: [
            "Paris",
            "London",
            "Berlin",
            "Madrid"
        ],
        answer: "Madrid"
    },
    {
        question: "What is the capital of England?",
        options: [
            "Paris",
            "London",
            "Berlin",
            "Madrid"
        ],
        answer: "London"
    }
]
var questionIndex = -1;

startButton.addEventListener('click', () => {
    // Start the timer
    let lengthOfQuiz = 60;
    endTime = new Date(new Date().getTime() + lengthOfQuiz * 1000);
    timeInterval = setInterval(function () {
        var now = new Date();
        var timeDiff = endTime - now;
        timeDiff /= 1000;
        var seconds = Math.round(timeDiff);
        timeSpan.textContent = seconds;
        if (seconds <= 0) {
            showFinishScreen();
        }
    }, 250);
    // Hide the start button
    startButton.style.display = "none";
    // set current question to 0
    showNextQuestion();
    // Show the first question

    //hide questions until clicked
    option1El.style.display ="";
    option2El.style.display ="";
    option3El.style.display ="";
    option4El.style.display ="";
    quizName.style.display = "none";
quizRules.style.display = "none";
// hide starting info
});


const questionEl = document.getElementById('question');
const option1El = document.getElementById('option1');
const option2El = document.getElementById('option2');
const option3El = document.getElementById('option3');
const option4El = document.getElementById('option4');

option1El.addEventListener('click', (e) => {
    submitAnswer(e.target.textContent);
});
option2El.addEventListener('click', (e) => {
    submitAnswer(e.target.textContent);
});
option3El.addEventListener('click', (e) => {
    submitAnswer(e.target.textContent);
});
option4El.addEventListener('click', (e) => {
    submitAnswer(e.target.textContent);
});

function showNextQuestion() {
    // Show the next question
    questionIndex++;
    if (questionIndex >= questions.length) {
        showFinishScreen();
        return;
    }

    let currentQuestion = questions[questionIndex];
    console.log({ currentQuestion });
    questionEl.textContent = currentQuestion.question;
    option1El.textContent = currentQuestion.options[0];
    option2El.textContent = currentQuestion.options[1];
    option3El.textContent = currentQuestion.options[2];
    option4El.textContent = currentQuestion.options[3];
    



}


function submitAnswer(answer) {
    console.log({ answer });
    let currentQuestion = questions[questionIndex];
    if (answer !== currentQuestion.answer) {
        console.log("Incorrect!");
        endTime= new Date (endTime.getTime() - 10000)
        
    }

    showNextQuestion();

}


const highScoreEnd = document.getElementById('high-score');
const finishScreen = document.getElementById('finish-screen');
const submitBtn = document.getElementById('submit');
const initialInput = document.getElementById('initials');



function hideQuestions() {
    questionEl.style.display = "none";
    option1El.style.display = "none";
    option2El.style.display = "none";
    option3El.style.display = "none";
    option4El.style.display = "none";
    clearInterval(timeInterval);


}
function showFinishScreen() {
    hideQuestions();
    finishScreen.style.display = "";
}

submitBtn.addEventListener("click", function () {
    highScores.push({
        initials: initialInput.value,
        score: timeSpan.textContent || "0"

    }
    );
    showHighScore();
    saveHighScores();
    console.log("working", highScores);
});

const highScoreBtn= document.getElementById('high-score-btn');
highScoreBtn.addEventListener("click", showHighScore);

function showHighScore() {
    hideQuestions();
    finishScreen.style.display = "none";
    highScoreEnd.style.display = "";
    startButton.style.display= "none";
    highScoreEnd.innerHTML = "";
    highScores.forEach((item) => {
var container = document.createElement("div");
container.textContent= item.initials + ":" + item.score;
highScoreEnd.appendChild(container);
quizName.style.display = "none";
quizRules.style.display = "none";
// hide starting info
    })
}

function loadHighScores (){
    var scores = localStorage.getItem("High Scores");
    if (scores != null){
        highScores=JSON.parse(scores)
    } 
    console.log("high scores", highScores);
}

function saveHighScores (){
    localStorage.setItem("High Scores", JSON.stringify(highScores));

}

loadHighScores();