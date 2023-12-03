const jsonP = fetch("https://the-trivia-api.com/v2/questions")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);

        const triviaData = data.map((questionData) => {
            const shuffledAnswers = shuffleArray([...questionData.incorrectAnswers, questionData.correctAnswer]);

            return {
                question: questionData.question.text,
                answers: shuffledAnswers,
                correctAnswer: questionData.correctAnswer
            };
        });
        console.log(triviaData);

        let currentQuestionIndex = 0;
        let score = 0;

        const questionContainer = document.getElementById("question-container");
        const questionText = document.getElementById("question");
        const answersContainer = document.getElementById("answers");
        const scoreText = document.getElementById("score");

        function displayQuestion() {
            if (currentQuestionIndex < triviaData.length) {
                const currentQuestion = triviaData[currentQuestionIndex];
                questionText.textContent = currentQuestion.question;
                answersContainer.innerHTML = "";

                currentQuestion.answers.forEach((answer) => {
                    const answerButton = document.createElement("button");
                    answerButton.textContent = answer;
                    answerButton.addEventListener("click", () => checkAnswer(answer, currentQuestion.correctAnswer, answerButton));
                    answersContainer.appendChild(answerButton);
                    // styles for buttons
                    answerButton.style.backgroundColor = "#112066";
                    answerButton.style.color = "#ffc634";
                    answerButton.style.fontFamily = "Impact, sans-serif";
                    answerButton.style.fontSize = "22px";
                    answerButton.style.margin = "5px";
                    answerButton.addEventListener("mouseover", () => {
                        answerButton.style.cursor = "pointer";
                        answerButton.style.backgroundColor = "#1e269f";
                        answerButton.style.color = "white";
                    });
                    answerButton.addEventListener("mouseout", () => {
                        answerButton.style.cursor = "pointer";
                        answerButton.style.backgroundColor = "#112066";
                        answerButton.style.color = "#ffc634";
                    });
                });
            } else {
                console.log("No more questions to display.");
                questionContainer.innerHTML = "<p style='color: white; font-size: 20px;'>Game over! You scored: " + score + " correct out of 10 questions</p>";
            }
        }

        function checkAnswer(selectedAnswer, correctAnswer, answerButton) {
            if (selectedAnswer === correctAnswer) {
                score++;
                scoreText.textContent = score;
                answerButton.style.backgroundColor = "green";
            } else {
                answerButton.style.backgroundColor = "red";
                answersContainer.childNodes.forEach((button) => {
                    if (button.textContent === correctAnswer) {
                        button.style.backgroundColor = "green";
                    }
                });
            }

      
            answersContainer.childNodes.forEach((button) => {
                button.disabled = true;
            });

        
            setTimeout(() => {
                currentQuestionIndex++;
                displayQuestion();
            }, 1000);
        }


        function shuffleArray(array) {
            const shuffledArray = array.slice();
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
        }

        displayQuestion();
    });
