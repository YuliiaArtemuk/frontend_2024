document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question');
    const answerContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result');
    const restartButton = document.getElementById('restart-btn');
    
    let currentQuestion = 0;
    let score = 0;
    const userAnswers = [];
    const correctAnswers = [];
    
    const quizData = [
        {
            question: "Хто зіграв роль Тоні Старка у фільмі 'Залізна людина'?",
            answers: [
                { answer: "Роберт Дауні молодший", isCorrect: true },
                { answer: "Кріс Хемсворт", isCorrect: false },
                { answer: "Кріс Еванс", isCorrect: false },
                { answer: "Марк Руффало", isCorrect: false }
            ]
        },
        {
            question: "Хто зіграв роль Джеймса Бонда у фільмі 'Казино Рояль'?",
            answers: [
                { answer: "Пірс Броснан", isCorrect: false },
                { answer: "Деніел Крейг", isCorrect: true },
                { answer: "Кріс Еванс", isCorrect: false },
                { answer: "Роджер Мур", isCorrect: false }
            ]
        },
        {
            question: "Хто зіграв головну роль у фільмі 'Форрест Гамп'?",
            answers: [
                { answer: "Том Хенкс", isCorrect: true },
                { answer: "Леонардо Ді Капріо", isCorrect: false },
                { answer: "Бред Пітт", isCorrect: false },
                { answer: "Джоні Депп", isCorrect: false }
            ]
        },
        {
            question: "Хто зіграв роль Рейчел у фільмі 'Друзі'?",
            answers: [
                { answer: "Дженіфер Еністон", isCorrect: true },
                { answer: "Кортні Кокс", isCorrect: false },
                { answer: "Ліза Кудроу", isCorrect: false },
                { answer: "Сандра Булок", isCorrect: false }
            ]
        },
        {
            question: "Хто зіграв головну роль у фільмі 'Леон'?",
            answers: [
                { answer: "Роберт Де Ніро", isCorrect: false },
                { answer: "Жан Рено", isCorrect: true },
                { answer: "Брюс Уілліс", isCorrect: false },
                { answer: "Марк Руффало", isCorrect: false }
            ]
        }
    ];

    quizData.forEach(question => {
        correctAnswers.push({
            question: question.question,
            answer: question.answers.find(answer => answer.isCorrect).answer
        });
    });

    function showQuestion() {
        const currentQuizData = quizData[currentQuestion];
        questionContainer.innerText = currentQuizData.question;
        answerContainer.innerHTML = '';
        currentQuizData.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.answer; 
            button.classList.add('answer-btn');
            button.addEventListener('click', selectAnswer);
            answerContainer.appendChild(button);
        });
    }
    
    function selectAnswer(e) {
        const selectedAnswer = e.target.innerText;
        const isCorrect = quizData[currentQuestion].answers.find(answer => answer.answer === selectedAnswer).isCorrect;
        userAnswers.push({ question: quizData[currentQuestion].question, answer: selectedAnswer, correct: isCorrect });
        if (isCorrect) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
    
    function showResult() {
        resultContainer.innerHTML = '';
        const table = document.createElement('table');
        table.classList.add('result-table');
        const headerRow = table.insertRow();
        headerRow.innerHTML = `<th>Питання</th><th>Ваша відповідь</th><th>Правильна відповідь</th>`;
    
       for (let i = 0; i < quizData.length; i++) {
            const userAnswer = userAnswers[i];
            const correctAnswer = correctAnswers[i];
        
            const row = table.insertRow();
        
            const questionCell = row.insertCell();
            questionCell.innerText = userAnswer.question;
        
            const userAnswerCell = row.insertCell();
            userAnswerCell.innerText = userAnswer.answer;
            if (userAnswer.correct) {
                userAnswerCell.classList.add('correct-answer');
            } else {
                userAnswerCell.classList.add('incorrect-answer');
            }
        
            const correctAnswerCell = row.insertCell();
            correctAnswerCell.innerText = correctAnswer.answer;
            correctAnswerCell.classList.add('correct-answer');
        }
    
        resultContainer.appendChild(table);
        const scoreInfo = document.createElement('div');
        scoreInfo.innerHTML = `<h3>Загальний результат:</h3>
                               <p>Ваш результат: ${score} з ${quizData.length} правильних відповідей.</p>`;
        resultContainer.appendChild(scoreInfo);
        restartButton.style.display = 'block';
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers.length = 0;
        resultContainer.innerHTML = '';
        restartButton.style.display = 'none';
        showQuestion();
    }

    restartButton.addEventListener('click', restartQuiz);
    showQuestion();
});
