import "./App.css";
import { useState, useEffect } from "react";
import questions from "./Questions";

function App() {
  const [startQuiz, setStartQuiz] = useState(true);
  const [curentQuestionIndex, setCurentQuestionIndex] = useState(0);
  const [endQuiz, setEndQuiz] = useState(false);
  const [time, setTime] = useState(10);

useEffect(() => {
  if (startQuiz || endQuiz) return;

  const timer = setInterval(() => {
    setTime((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timer);
        setEndQuiz(true);
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [startQuiz, endQuiz]);


  function start_quiz() {
    if (startQuiz) {
      setStartQuiz(false);
    }
    setTime(10)
  }

  function load_Question() {
    if (curentQuestionIndex < questions.length - 1) {
      setCurentQuestionIndex(curentQuestionIndex + 1);
    } else {
      setEndQuiz(true);
    }
  }

  if (endQuiz) {
    setStartQuiz(true);
  }

  return (
    <>
      <header className="app-header">
        <p className="time">Time:{time}</p>
        <div className="logo">🧠</div>
        <h1>BrainBoost Quiz</h1>
        <p>Warning: Side effects may include sudden genius.</p>
        
        
      </header>

      <main className="container">
        <div className="question">
          {startQuiz && (
            <button onClick={start_quiz} className="start-quiz">
              start quiz
            </button>
          )}

          {!startQuiz && <p className="score">Score: 0</p>}

          {endQuiz ? (
            <>
              <p className="end-quiz">Quiz Ended</p>
              <p className="comment">
                {score < 3 ? (
                  <span>Try harder next time!</span>
                ) : score >= 3 && score < 5 ? (
                  <span>Good job!</span>
                ) : (
                  <span>Excellent work!</span>
                )}
              </p>
            </>
          ) : (
            <>
              <div>
                <span className="question-number">
                  Question {curentQuestionIndex + 1}
                </span>
              </div>
              <p className="question-text">
                {questions[curentQuestionIndex].question}
              </p>
              <div className="options">
                {questions[curentQuestionIndex].answers.map((choice, index) => (
                  <>
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="country"
                      value={`option${index}`}
                    />
                    <label htmlFor={`option${index}`}>{choice.text}</label>
                    <br />
                  </>
                ))}
              </div>
            </>
          )}

          {!startQuiz && (
            <button
              onClick={!startQuiz && load_Question}
              className="next-btn"
              type="submit"
            >
              Next
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
