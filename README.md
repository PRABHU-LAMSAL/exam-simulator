# Nepal Medical License Examination Simulator

A comprehensive web-based exam simulator application for the Nepal Medical License Examination. Features 100 randomly selected questions from a pool of 160+ medical MCQs with a 45-minute timer and detailed answer review.

![Exam Simulator](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **100 Random Questions**: Each exam displays 100 randomly selected questions from the question pool
- **Randomized on Restart**: Questions are reshuffled every time you restart the exam
- **45-Minute Timer**: Countdown timer with visual warnings (yellow at 15 min, red at 5 min)
- **Exam-Style Interface**: Clean, professional design with radio button answer selection
- **Real-Time Progress Tracking**: See how many questions you've answered
- **Detailed Results**: View your score and performance statistics
- **Answer Review**: After submission, review all questions with:
  - Your selected answers
  - Correct answers highlighted
  - Detailed explanations
  - Visual indicators (correct/incorrect/unanswered)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no frameworks required

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── README.md               # This file
├── LICENSE                 # MIT License
├── .gitignore             # Git ignore rules
├── css/
│   └── styles.css         # All styling and layout
├── js/
│   └── script.js          # Application logic and functionality
└── data/
    └── questions.json     # Question database (160+ questions)
```

## 🎯 Getting Started

### Option 1: GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings → Pages in your GitHub repository
3. Select the main branch as the source
4. Your app will be available at `https://yourusername.github.io/repository-name`

### Option 2: Local Development

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No server or build process required!

```bash
git clone https://github.com/yourusername/nepal-medical-exam-simulator.git
cd nepal-medical-exam-simulator
# Open index.html in your browser
```

## 📖 How to Use

1. **Start the Exam**: Click "Start Exam" button
2. **Answer Questions**: Select your answers using radio buttons (A, B, C, D)
3. **Track Progress**: Monitor the timer and answered questions counter
4. **Submit**: Click "Submit Exam" when finished (or wait for timer to expire)
5. **Review Results**: View your score and statistics
6. **See Answers**: Click "View Answers" to review all questions with explanations
7. **Restart**: Click "Restart Exam" to take a new exam with different questions

## 📊 Question Format

Each question follows this JSON structure:

```json
{
  "question": "Your question text?",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correctAnswer": 0,
  "explanation": "Explanation for the correct answer"
}
```

- `correctAnswer`: 0-indexed (0 = A, 1 = B, 2 = C, 3 = D)
- Each question must have exactly 4 options
- Explanations are optional but recommended

## 🔧 Customization

### Adding More Questions

Edit `data/questions.json` and add questions following the format above. The app will automatically randomize and select 100 questions each time.

### Changing the Timer

Edit `js/script.js` and modify:
```javascript
timeRemaining: 45 * 60, // Change 45 to your desired minutes
```

### Styling

All styles are in `css/styles.css`. Customize colors, fonts, and layout as needed.

## 🌐 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Features Explained

### Random Question Selection
- Each exam randomly selects 100 questions from the entire question pool
- Questions are shuffled using Fisher-Yates algorithm
- Different questions every time you restart

### Answer Review
- Color-coded results:
  - 🟢 Green: Correct answers
  - 🔴 Red: Incorrect answers
  - ⚪ Gray: Unanswered questions
- See both your answer and the correct answer
- Read explanations for better understanding

### Timer System
- 45-minute countdown
- Visual warnings at critical time points
- Auto-submission when time expires

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Medical question content compiled from various sources
- Designed for Nepal Medical License Examination preparation
- Built with pure web technologies for maximum compatibility

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the code comments for implementation details

## 🎓 Educational Use

This simulator is designed for educational purposes to help medical students prepare for licensing examinations. Always verify information with official medical textbooks and guidelines.

---

**Note**: This is an educational tool. For official exam preparation, please refer to authorized study materials and official examination guidelines.
