// Exam State
let examState = {
    questions: [], // Selected 100 questions for current exam
    allQuestions: [], // All available questions from JSON
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: 45 * 60, // 45 minutes in seconds
    timerInterval: null,
    examStarted: false,
    examEnded: false
};

// Load questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        examState.allQuestions = data.questions || data; // Store all questions
        selectRandomQuestions(); // Select 100 random questions
        initializeExam();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Error loading questions. Please make sure questions.json file exists.');
    }
}

// Select 100 random questions from all available questions
function selectRandomQuestions() {
    const allQuestions = [...examState.allQuestions]; // Create a copy
    const numberOfQuestions = 100;
    const availableQuestions = allQuestions.length;
    
    // If we have fewer than 100 questions, use all available
    const questionsToSelect = Math.min(numberOfQuestions, availableQuestions);
    
    // Shuffle array using Fisher-Yates algorithm
    for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    
    // Select first 100 questions (or all if less than 100)
    examState.questions = allQuestions.slice(0, questionsToSelect);
}

// Initialize exam
function initializeExam() {
    displayAllQuestions();
    updateProgress();
}

// Start exam
function startExam() {
    examState.examStarted = true;
    document.getElementById('start-modal').style.display = 'none';
    startTimer();
}

// Timer functionality
function startTimer() {
    examState.timerInterval = setInterval(() => {
        examState.timeRemaining--;
        updateTimer();
        
        if (examState.timeRemaining <= 0) {
            endExam();
        }
    }, 1000);
    updateTimer();
}

function updateTimer() {
    const minutes = Math.floor(examState.timeRemaining / 60);
    const seconds = examState.timeRemaining % 60;
    const timerElement = document.getElementById('timer');
    
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Add warning classes
    timerElement.classList.remove('warning', 'danger');
    if (examState.timeRemaining <= 5 * 60) { // 5 minutes
        timerElement.classList.add('danger');
    } else if (examState.timeRemaining <= 15 * 60) { // 15 minutes
        timerElement.classList.add('warning');
    }
}

// Display all questions on the page
function displayAllQuestions() {
    if (examState.questions.length === 0) return;
    
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    
    examState.questions.forEach((question, questionIndex) => {
        const questionSection = document.createElement('div');
        questionSection.className = 'question-section';
        questionSection.id = `question-${questionIndex}`;
        
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = `Question ${questionIndex + 1}`;
        
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = question.question;
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // Create radio button options
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('label');
            optionElement.className = 'option';
            
            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = `question-${questionIndex}`;
            radioButton.value = optionIndex;
            radioButton.id = `q${questionIndex}-opt${optionIndex}`;
            
            if (examState.answers[questionIndex] === optionIndex) {
                radioButton.checked = true;
                optionElement.classList.add('selected');
            }
            
            radioButton.addEventListener('change', () => {
                selectAnswer(questionIndex, optionIndex);
            });
            
            optionElement.innerHTML = `
                <span class="option-label">${String.fromCharCode(65 + optionIndex)}.</span>
                <span class="option-text">${option}</span>
            `;
            
            optionElement.insertBefore(radioButton, optionElement.firstChild);
            optionsContainer.appendChild(optionElement);
        });
        
        questionSection.appendChild(questionNumber);
        questionSection.appendChild(questionText);
        questionSection.appendChild(optionsContainer);
        questionsContainer.appendChild(questionSection);
    });
}

// Select answer
function selectAnswer(questionIndex, optionIndex) {
    examState.answers[questionIndex] = optionIndex;
    updateQuestionAnswer(questionIndex);
    updateProgress();
}

// Update a specific question's answer display
function updateQuestionAnswer(questionIndex) {
    const questionSection = document.getElementById(`question-${questionIndex}`);
    if (!questionSection) return;
    
    const options = questionSection.querySelectorAll('.option');
    const radioButtons = questionSection.querySelectorAll('input[type="radio"]');
    
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (examState.answers[questionIndex] === index) {
            option.classList.add('selected');
            radioButtons[index].checked = true;
        } else {
            radioButtons[index].checked = false;
        }
    });
}

// Scroll to question
function scrollToQuestion(index) {
    const questionElement = document.getElementById(`question-${index}`);
    if (questionElement) {
        questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight briefly
        questionElement.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        setTimeout(() => {
            questionElement.style.boxShadow = '';
        }, 1000);
    }
}

// Update progress
function updateProgress() {
    document.getElementById('total-questions').textContent = examState.questions.length;
    document.getElementById('answered-count').textContent = Object.keys(examState.answers).length;
}

// Submit exam
function submitExam() {
    if (confirm('Are you sure you want to submit the exam? You will not be able to change your answers.')) {
        endExam();
    }
}

// End exam and show results
function endExam() {
    if (examState.examEnded) return;
    
    examState.examEnded = true;
    clearInterval(examState.timerInterval);
    
    // Calculate results
    const totalQuestions = examState.questions.length;
    const answered = Object.keys(examState.answers).length;
    let correct = 0;
    
    examState.questions.forEach((question, index) => {
        if (examState.answers[index] !== undefined) {
            if (examState.answers[index] === question.correctAnswer) {
                correct++;
            }
        }
    });
    
    const incorrect = answered - correct;
    const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
    
    // Display results
    document.getElementById('result-total').textContent = totalQuestions;
    document.getElementById('result-answered').textContent = answered;
    document.getElementById('result-correct').textContent = correct;
    document.getElementById('result-incorrect').textContent = incorrect;
    document.getElementById('result-score').textContent = `${score}%`;
    
    // Hide answers review initially
    document.getElementById('answers-review').style.display = 'none';
    
    document.getElementById('results-modal').style.display = 'flex';
}

// Display answers review
function showAnswersReview() {
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    examState.questions.forEach((question, index) => {
        const userAnswer = examState.answers[index];
        const correctAnswer = question.correctAnswer;
        const isAnswered = userAnswer !== undefined;
        const isCorrect = isAnswered && userAnswer === correctAnswer;
        
        // Determine status
        let statusClass = 'unanswered';
        let statusText = 'Unanswered';
        
        if (isAnswered) {
            statusClass = isCorrect ? 'correct' : 'incorrect';
            statusText = isCorrect ? 'Correct' : 'Incorrect';
        }
        
        // Create answer item
        const answerItem = document.createElement('div');
        answerItem.className = `answer-item ${statusClass}`;
        
        // Question header
        const questionHeader = document.createElement('div');
        questionHeader.className = 'answer-question-header';
        
        const questionNumber = document.createElement('div');
        questionNumber.className = 'answer-question-number';
        questionNumber.textContent = `Question ${index + 1}`;
        
        const statusBadge = document.createElement('div');
        statusBadge.className = `answer-status ${statusClass}`;
        statusBadge.textContent = statusText;
        
        questionHeader.appendChild(questionNumber);
        questionHeader.appendChild(statusBadge);
        
        // Question text
        const questionText = document.createElement('div');
        questionText.className = 'answer-question-text';
        questionText.textContent = question.question;
        
        // Options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'answer-options';
        
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            
            const optionLabel = document.createElement('span');
            optionLabel.className = 'answer-label';
            optionLabel.textContent = `${String.fromCharCode(65 + optionIndex)}.`;
            
            const optionText = document.createElement('span');
            optionText.textContent = option;
            
            optionDiv.appendChild(optionLabel);
            optionDiv.appendChild(optionText);
            
            // Highlight user's answer
            if (isAnswered && userAnswer === optionIndex) {
                optionDiv.classList.add('user-answer');
                if (isCorrect) {
                    optionDiv.classList.add('correct');
                } else {
                    optionDiv.classList.add('incorrect');
                }
            }
            
            // Highlight correct answer
            if (optionIndex === correctAnswer) {
                optionDiv.classList.add('correct-answer');
            }
            
            optionsContainer.appendChild(optionDiv);
        });
        
        // Append elements to answer item
        answerItem.appendChild(questionHeader);
        answerItem.appendChild(questionText);
        answerItem.appendChild(optionsContainer);
        
        // Add explanation if available
        if (question.explanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'answer-explanation';
            explanationDiv.innerHTML = `<strong>Explanation:</strong> ${question.explanation}`;
            answerItem.appendChild(explanationDiv);
        }
        
        answersContainer.appendChild(answerItem);
    });
    
    // Show answers review
    document.getElementById('answers-review').style.display = 'block';
    
    // Scroll to top of answers review
    document.getElementById('answers-review').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide answers review
function hideAnswersReview() {
    document.getElementById('answers-review').style.display = 'none';
}

// Restart exam
function restartExam() {
    examState.answers = {};
    examState.timeRemaining = 45 * 60;
    examState.examStarted = false;
    examState.examEnded = false;
    examState.currentQuestionIndex = 0;
    
    clearInterval(examState.timerInterval);
    
    // Select new random 100 questions for restart
    selectRandomQuestions();
    
    document.getElementById('results-modal').style.display = 'none';
    document.getElementById('start-modal').style.display = 'flex';
    
    initializeExam();
    
    // Scroll to top
    const questionsContainer = document.getElementById('questions-container');
    if (questionsContainer) {
        questionsContainer.scrollTop = 0;
    }
}

// Event Listeners
document.getElementById('start-exam-btn').addEventListener('click', startExam);
document.getElementById('submit-btn').addEventListener('click', submitExam);
document.getElementById('restart-exam-btn').addEventListener('click', restartExam);
document.getElementById('view-answers-btn').addEventListener('click', showAnswersReview);
document.getElementById('close-answers-btn').addEventListener('click', hideAnswersReview);

// Load questions when page loads
loadQuestions();

