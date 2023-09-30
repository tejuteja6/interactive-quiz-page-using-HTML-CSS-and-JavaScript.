const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Mars", "Earth"],
        correctAnswer: 0
    }
    // Add more questions following the same structure
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="answer" value="${index}">
            ${option}
        `;
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement('br'));
    });
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
        alert('Please select an answer.');
        return;
    }

    const answerIndex = parseInt(selectedAnswer.value);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.innerText = 'Quiz completed!';
    optionsElement.innerHTML = '';
    scoreElement.innerText = `Final Score: ${score} out of ${questions.length}`;
    nextButton.style.display = 'none';
    restartButton.style.display = 'block';
}

function nextQuestion() {
    checkAnswer();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    nextButton.style.display = 'block';
    restartButton.style.display = 'none';
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

loadQuestion();
