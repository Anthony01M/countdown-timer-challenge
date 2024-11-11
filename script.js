document.addEventListener('DOMContentLoaded', () => {
    const mathProblemElement = document.getElementById('math-problem');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const timerElement = document.getElementById('time');
    const resultElement = document.getElementById('result');

    let timeLeft = 30;
    let timer;
    let correctAnswer;

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                checkAnswer();
            }
        }, 1000);
    }

    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const num3 = Math.floor(Math.random() * 10) + 1;
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        let problem;
        switch (operation) {
            case '+':
                problem = `${num1} + ${num2}`;
                correctAnswer = num1 + num2;
                break;
            case '-':
                problem = `${num1} - ${num2}`;
                correctAnswer = num1 - num2;
                break;
            case '*':
                problem = `${num1} * ${num2}`;
                correctAnswer = num1 * num2;
                break;
            case '/':
                if (num1 % num2 === 0) {
                    problem = `${num1} / ${num2}`;
                    correctAnswer = num1 / num2;
                } else {
                    return generateMathProblem();
                }
                break;
            default:
                problem = `${num1} + ${num2}`;
                correctAnswer = num1 + num2;
        }

        if (Math.random() > 0.5) {
            problem = `${num1} + (${num2} * ${num3})`;
            correctAnswer = num1 + (num2 * num3);
        } else if (Math.random() > 0.5) {
            problem = `${num1} * (${num2} - ${num3})`;
            correctAnswer = num1 * (num2 - num3);
        }

        mathProblemElement.textContent = `${problem} = ?`;
        return correctAnswer;
    }

    function resetChallenge() {
        clearInterval(timer);
        timeLeft = 30;
        timerElement.textContent = timeLeft;
        answerInput.value = '';
        resultElement.textContent = '';
        resultElement.classList.remove('wrong');
        correctAnswer = generateMathProblem();
        startTimer();
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        if (userAnswer === correctAnswer) {
            resultElement.textContent = 'Correct!';
            resultElement.classList.remove('wrong');
        } else {
            resultElement.textContent = 'Wrong! Time is up!';
            resultElement.classList.add('wrong');
        }
        setTimeout(resetChallenge, 2000);
    }

    submitButton.addEventListener('click', () => {
        clearInterval(timer);
        checkAnswer();
    });

    correctAnswer = generateMathProblem();
    startTimer();
});